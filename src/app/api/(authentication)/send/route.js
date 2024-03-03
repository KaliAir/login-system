import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

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
    console.log(data)

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error });
  }
}
