// import { NextResponse } from "next/server";
// import { PrismaClient } from "@prisma/client";
// import bcryptjs from 'bcryptjs'

// const prisma = new PrismaClient();

// export async function POST(request){
//     const reqbody = await request.json();
//     const {email,password} = reqbody;
//     if(!email || !password){
//         return NextResponse.json({
//             error: "Input field can't be empty"
//         },{status:500})
//     }
//     const userCheck = await prisma.user.findOne({email});
//     if(!userCheck){
//         return NextResponse.json({
//             error: "User does not exist"
//         },{status: 400})
//     }
//     const passValidate = await bcryptjs.compare(password,userCheck.hashedPassword);

// }