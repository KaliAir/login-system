import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export async function GET(req){
    try {
        const url = new URL(req.url);
        const itemParam = url.searchParams.get("catId");
        const checkItemsExists = await prisma.item.findMany({
            where:{
                categoryId: itemParam
            }
        });
        if(!checkItemsExists){
            return NextResponse.json({
                error:"Category doesn't have items"
            },{status:400})
        }
        return NextResponse.json(checkItemsExists)
    } catch (error) {
        return NextResponse.json({
            error: error.message
        },{status:500})
    }
}