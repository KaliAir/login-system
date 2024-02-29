import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request){
    try {
        // const url = new URL(request.url);
        // const token = url.searchParams.get("token")
        const reqbody = await request.json();
        const {token} = reqbody
        if(!token){
            return NextResponse.json({
                error: "Input field can't be empty"
            })   
        }
        const checkUserToken = await prisma.verificationToken.findUnique({
            where:{
                token
            }
        });
        if(!checkUserToken){
            return NextResponse.json({
                error: "token is expired please resend"
            });
        }
        const checkAccout = await prisma.user.findFirst({
            where:{
                email: checkUserToken.email
            }
        });

        if(!checkAccout){
            return NextResponse.json({
                error: "No account found by this token"
            });
        }

    
        return NextResponse.json({
            message: "Account verified",
            success: true,
        })


    } catch (error) {
        return NextResponse.json({
            error: error.message
        })
    }
}