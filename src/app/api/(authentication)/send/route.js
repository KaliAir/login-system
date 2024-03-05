import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
//This email provider is resend.com you can change this if you want 
export async function POST(request) {
  try {
    const reqbody = await request.json();
    const {email,token} = reqbody;
    const emailString = String(email);
    const data = await resend.emails.send({
      from: 'JJM Inventory System <onboarding@resend.dev>',
      to: [emailString],
      subject: "Confirm your email",
      html: `<p style="background-color: #35374B;text-align: center;display: grid;place-content:center; padding: 10px;border-radius: 15px;font-size: 16px; color: #2D9596; font-family: 'Arial', sans-serif;">Copy The Verifaction Token :  <span style="font-size:20px;font-weight:600px;">${token}</span></p>`
    });
    
    //Make sure that this Response is and object that have key/value pair of { error:null } the logic is when error is equal to null it means success, if not means fail.
    return NextResponse.json(data);

  } catch (error) {
    return NextResponse.json({ error });
  }
}
