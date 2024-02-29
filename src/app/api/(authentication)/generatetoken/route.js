import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";
import { isEmailValid } from "@/validateFormEmail/validateformemail";

const prisma = new PrismaClient()

export async function POST(request){
    try {
        const reqbody = await request.json();
        const {email} = reqbody;

        if(!email){
            return NextResponse.json({
                error: "Can't generate no email"
            })
        }
        const isEmailFormat = isEmailValid(email);
        if(!isEmailFormat){
            return NextResponse.json({
                error: "Can't generate please relog"
            })
        }
        const token = uuidv4();
        const expires = new Date(new Date().getTime() + 3600 * 1000);
        const verifyEmail = await prisma.verificationToken.findFirst({
            where:{
                email
            }
        })
        if(verifyEmail){
            await prisma.verificationToken.delete({
                where:{
                    id: verifyEmail.id
                }
            })
        }
        const verificationToken = await prisma.verificationToken.create({
            data:{
                email,
                token,
                expires
            }
        });
        return NextResponse.json({
            message:"TokenGenerated",
            success: true,
            isEmailFormat,
            verificationToken
        })


    } catch (error) {
        return NextResponse.json({
            error: error.message
        },{status: 500})
    }
}