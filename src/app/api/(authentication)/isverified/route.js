import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request){
    try {
        const reqbody = await request.json();
        const {email} = reqbody;
        
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

        return NextResponse.json({
            verified: checkUserVerified.verified,
        })

    } catch (error) {
        return NextResponse.json({
            error: error.message
        })
    }
}