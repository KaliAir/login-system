import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { isEmailValid } from "@/validateFormEmail/validateformemail";
import bcryptjs from "bcryptjs";

const prisma = new PrismaClient();

export async function POST(request){
    try {
        const reqbody = await request.json();
        const {email,password} = reqbody;

        if(!email || !password){
            return NextResponse.json({
                error:"Input fields cannot be empty"
            })
        }
        const validEmail = isEmailValid(email)
        if(!validEmail){
            return NextResponse.json({
                error: "Invalid Email"
            },{status:400})
        }

        const checkUserVerified = await prisma.user.findFirst({
            where:{
                email
            }
        });
        if(!checkUserVerified){
            return NextResponse.json({
                error: "Email does not exist"
            });
        }
        const passValidate = await bcryptjs.compare(password,checkUserVerified.hashedPassword);
        if(!passValidate){
            return NextResponse.json({
                error:"Credentials doesn't match"
            })
        }

        return NextResponse.json({
            verified: checkUserVerified.verified,
            password: passValidate
        })

    } catch (error) {
        return NextResponse.json({
            error: error.message
        })
    }
}