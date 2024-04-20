import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req){
    try {
        const reqBody = await req.json();
        const {
            photo,
            subcategory,
            itemName,
            description,
            brand,
            supplier,
            stock,
            unit,
            salePrice,
            netPrice,
            vat,
            categoryId
        } = reqBody;

        const sPrice = parseInt(salePrice);
        const nPrice = parseInt(netPrice);
        const v = parseInt(vat);
        const stockQty = parseInt(stock);

        if(!itemName || !salePrice || !netPrice){
            return NextResponse.json({
                error: {
                    itemNameInput:itemName,
                    salePriceInput:salePrice,
                    netPriceInput:netPrice
                }
            },{status:400})
        }
        const checkItemExists = await prisma.item.findFirst({
            where:{
                itemName,
                categoryId
            }
        });
        if(checkItemExists){
            return NextResponse.json({
                error:{itemNameInput:""},
            },{status:400})
        }
        const saveItem = await prisma.item.create({
            data:{
                photo,
                subcategory,
                itemName,
                description,
                brand,
                supplier,
                stock: stockQty,
                unit,
                salePrice: sPrice,
                netPrice: nPrice,
                vat: v,
                categoryId
            }
        });
        return NextResponse.json({
            message:"Item Created Successfully",
            success: true,
            saveItem,
        })
    } catch (error) {
        return NextResponse.json({
            error: error.message
        },{status:500})
    }finally {
        await prisma.$disconnect();
    }
}