import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request){
    try {
        const reqbody = await request.json();
        const {token} = reqbody
        const forgotToken = await prisma.verificationToken.findUnique({
            where:{
                token
            }
        })

        if(!forgotToken){
            return NextResponse.json({
                error:"Token does not exists"
            })
        }
        const tokenEmailCompare = await prisma.user.findFirst({
            where:{
                email: forgotToken.email
            }
        })
        if(!tokenEmailCompare){
            return NextResponse.json({
                error:"Token not rigesterd"
            })
        }
    
        return NextResponse.json({
            message: "User token is valid",
            success: true
        })


    } catch (error) {
        return NextResponse.json({
            error: error.message
        })
    }
}