import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request){
    try {
        const reqbody = await request.json();
        const {email} = reqbody;
        
        const checkResetState = await prisma.verificationToken.findFirst({
            where:{
                email
            }
        })

        if(!checkResetState){
            return NextResponse.json({
                error: "Email not found"
            })
        }
        if(checkResetState.reset === false){
            return NextResponse.json({
                error: "Reset status not valid"
            })
        }

        return NextResponse.json({
            message: "Reset successfully confirm",
            success: true,
            token: checkResetState.token
        })
        
    } catch (error) {
        return NextResponse.json({
            error:error.message
        })
    }
}