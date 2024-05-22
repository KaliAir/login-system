import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request) {
  try {
    const { token } = await request.json();

    function isValidUUIDv4(uuid) {
      const uuidv4Regex =
        /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
      return uuidv4Regex.test(uuid);
    }
    if(!isValidUUIDv4(token)){
        return NextResponse.json({
            error:"Invalid token format"
        },{status:400})
    }
    const checkTokenExists = await prisma.verificationToken.findUnique({
        where:{
            token
        }
    })
    if(!checkTokenExists){
        return NextResponse.json({
            error:"token doesn't exists"
        },{status: 400})
    }
    return NextResponse.json({
        message:"token exists",
        success:true
    })
  } catch (error) {
  } finally {
    await prisma.$disconnect();
  }
}
