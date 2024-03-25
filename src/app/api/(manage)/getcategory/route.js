import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request){
    try {
        const url = new URL(request.url);
        const userId = url.searchParams.get("userId")
        const checkUserCategory = await prisma.category.findMany({
            where:{
                userId,
            }
        })
        if(!checkUserCategory){
            return NextResponse.json({
                error: "No category created"
            },{status: 201})
        }
        return NextResponse.json(checkUserCategory)
    } catch (error) {
        return NextResponse.json({
            error: error.message
        },{status:500})
    }finally{
        await prisma.$disconnect();
    }
}