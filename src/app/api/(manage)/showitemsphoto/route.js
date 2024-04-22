import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req){
    try {
        const url = new URL(req.url)
        const catId = url.searchParams.get("catId")
        const checkId = await prisma.item.findMany({
            where:{
                categoryId: catId
            }
        })
        if(!checkId){
            return NextResponse.json({
                error:"No Photos Created"
            },{status:400})
        }
        return NextResponse.json({
            success:true,
            checkId
        })
    } catch (error) {
        return NextResponse.json({
            error:error.message
        })
    }finally{
        await prisma.$disconnect()
    }
}