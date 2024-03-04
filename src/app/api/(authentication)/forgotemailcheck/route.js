import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { isEmailValid } from "@/validateFormEmail/validateformemail";

const prisma = new PrismaClient();

export async function POST(request){
    try {
        const reqbody = await request.json();
        const {email} = reqbody;

        if(!email){
            return NextResponse.json({
                error: "Input field cannot be empty"
            })
        }

        const validEmailFormat = isEmailValid(email);
        if(!validEmailFormat){
            return NextResponse.json({
                error:"Not valid email"
            })
        }

        const checkUserVerified = await prisma.user.findFirst({
            where:{
                email
            }
        });
        if(!checkUserVerified){
            return NextResponse.json({
                error: "Email does not exists"
            });
        }

        return NextResponse.json({
            verified: checkUserVerified.verified,
        })

    } catch (error) {
        return NextResponse.json({
            error: error.message
        })
    }
}