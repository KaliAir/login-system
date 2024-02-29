import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcryptjs from "bcryptjs"
import { isPasswordValid } from "@/validateFormPassword/validateformpassword";


const prisma = new PrismaClient();

export async function POST(request){
    try {
        const reqbody = await request.json();
        const {name,lastname,email,password} = reqbody;
        const userCheck = await prisma.user.findUnique({
            where:{
                email,
            }
        });
        if(!name || !lastname || !email || !password){
            return NextResponse.json({
                error: "Input fields cannot be empty"
            },{status: 400})
        }
        if(userCheck){
            return NextResponse.json({
                error: "Email already exists"
            },{status: 400})
        }
        const {status,message} = isPasswordValid(password);
        if(status === false){
            return NextResponse.json({
                error: message
            },{status: 400})
        }

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password,salt);
        const saveUser = await prisma.user.create({
            data:{
                name,
                lastname,
                email,
                hashedPassword
            }
        });
        
        return NextResponse.json({
            message: "User successfully created",
            success: true,
            saveUser
        },{status: 200})

    } catch (error) {
        return NextResponse.json({
            error: error.message
        },{status:500})
    }
}