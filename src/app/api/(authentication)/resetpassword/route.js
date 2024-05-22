import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { isPasswordValid } from "@/validateFormPassword/validateformpassword";
import bcryptjs from "bcryptjs"

const prisma = new PrismaClient();

export async function POST(request){
    try {
        // const url = new URL(request.url);
        // const token = url.searchParams.get("token")
        const reqbody = await request.json();
        const {password, retype, token} = reqbody
        if(!password || !retype || !token){
            return NextResponse.json({
                error: "Input field can't be empty"
            })   
        }
        if(password !== retype){
            return NextResponse.json({
                error: "New password does not match"
            },{status:400})
        }
        const {status, message} = isPasswordValid(password)
        if(!status){
            return NextResponse.json({
                error:message
            },{status:400})
        }

        function isValidUUIDv4(uuid) {
            const uuidv4Regex =
              /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
            return uuidv4Regex.test(uuid);
        }
        if(!isValidUUIDv4(token)){
            return NextResponse.json({
                error:"Invalid token"
            },{status:400})
        }
        
        const checkUserToken = await prisma.verificationToken.findUnique({
            where:{
                token
            }
        });
        if(!checkUserToken){
            return NextResponse.json({
                error: "token is expired please resend"
            });
        }

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password,salt);
        
        const updateUserPassword = await prisma.user.update({
            where:{
                email: checkUserToken.email
            },
            data:{
                hashedPassword
            }
        }) 
        if(updateUserPassword){
            const removeToken = await prisma.verificationToken.delete({
                where:{
                    token: checkUserToken.token
                }
            });
            if(removeToken){
                return NextResponse.json({
                    message: "Password successfully change",
                    success: true,
                    updateUserPassword,
                });
            }
        }

    } catch (error) {
        return NextResponse.json({
            error: error.message
        })
    }finally{
        await prisma.$disconnect()
    }
}