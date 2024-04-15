import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req){
    try {
        const reqBody = await req.json();
        const {catId, userId, newCat} = reqBody;
        if(!catId || !userId){
            return NextResponse.json({
                error: "Category data can't be empty"
            },{status:400})
        }
        const checkCategoryExists = await prisma.category.findFirst({
            where:{
                userId: userId,
                category: newCat
            }
        })
        if(checkCategoryExists){
            return NextResponse.json({
                error:"Category already exists",
                success:false
            },{status:400})
        }
        const updateCategory = await prisma.category.update({
            where:{
                id: catId,
                userId: userId
            },
            data:{
                category: newCat
            }
        })

        return NextResponse.json({
            updateCategory,
            success: true,
            message: "Category successfully updated"
        })


    } catch (error) {
        return NextResponse.json({
            error: error.message
        },{status: 500})
    }finally{
        await prisma.$disconnect();
    }
}