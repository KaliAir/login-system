
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { isPasswordValid } from "@/validateFormPassword/validateformpassword";
import bcryptjs from "bcryptjs"

const prisma = new PrismaClient();

export async function POST(request){
    const reqbody = await request.json();
    const {password,repassword,token} = reqbody;
    if(!password || !repassword){
        return NextResponse.json({
            error: "Input fields can't be empty"
        })
    }
    if(password !== repassword){
        return NextResponse.json({
            error: "Password doesn't  match"
        })
    }
    const {status,message} = isPasswordValid(password);
    if(!status){
        return NextResponse.json({
            error: message
        })
    }
    const checkToken = await prisma.verificationToken.findUnique({
        where:{
            token
        }
    })
    if(!checkToken){
        return NextResponse.json({
            error: "Token Expired"
        })
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password,salt);

    const updatePassword = await prisma.user.update({
        where:{
            email: checkToken.email
        },
        data:{
            hashedPassword
        }
    })

    return NextResponse.json({
        message: "Password successfully reseted",
        success: true,
        updatePassword
    })

}