import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request){
    try {
        const reqBody = await request.json();
        const {catValue, userId} = reqBody;
        if(!catValue || !userId){
            return NextResponse.json({
                error:"Please Insert Categories"
            },{status:400})
        }
        const categoryExist = await prisma.category.findFirst({
            where:{
                category: catValue
            }
        })
        if(categoryExist){
            return NextResponse.json({
                error:`${categoryExist.category} is already exists for this user`
            },{status:400})
        }
        const saveCategory = await prisma.category.create({
            data:{
                category: catValue,
                userId: userId
            }
        })
        return NextResponse.json({
            message:"Category successfully created",
            success: true,
            saveCategory
        })
    } catch (error) {
        return NextResponse.json({
            error: error.message
        },{status: 500})
    } finally{
        await prisma.$disconnect();
    }
}