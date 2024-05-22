import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client";
import { isEmailValid } from "@/validateFormEmail/validateformemail";

const prisma = new PrismaClient();

export async function POST(request){
    try {
        const reqbody = await request.json()
        const {email} =  reqbody;
        if(!email){
            return NextResponse.json({
                error:"Email Empty"
            },{status:400})
        }
        const validEmail = isEmailValid(email);
        if(!validEmail){
            return NextResponse.json({
                error:"Invalid Email"
            })
        }
        const findVerifactionEmail= await prisma.verificationToken.findFirst({
            where:{
                email
            }
        });
        
        if(!findVerifactionEmail){
            return NextResponse.json({
                error: "No verification token generated"
            },{status: 403})
        }

        return NextResponse.json({
            email: findVerifactionEmail.email,
            token: findVerifactionEmail.token,
        })

    } catch (error) {
        return NextResponse.json({
            error: error.message
        })
    }
}