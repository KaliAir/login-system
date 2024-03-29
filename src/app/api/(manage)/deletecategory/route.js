import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient;

export async function POST(request){
    try {
        const reqBody = await request.json()
        const {catId, userId} = reqBody
        const deleteCategory = await prisma.category.delete({
            where:{
                id: catId,
                userId
            }
        })
        if(!deleteCategory){
            return NextResponse.json({
                error:"Category already deleted"
            })
        }

        return NextResponse.json({
            message: "Category Successfully deleted",
            success: true
        })
        
    } catch (error) {
        return NextResponse.json({
            error: error.message
        })
    }
}