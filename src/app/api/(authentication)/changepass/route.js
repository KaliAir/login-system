import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  try {
    const reqbody = await request.json();
    const { email, token } = reqbody;
    const emailString = String(email);
    const data = await resend.emails.send({
      from: 'JJM Inventory System <onboarding@resend.dev>',
      to: [emailString],
      subject: "Reset Your Password",
      html: `
        <div style="background-color: #f4f4f4; padding: 20px; font-family: Arial, sans-serif;">
          <div style="max-width: 600px; margin: auto; background: #fff; border-radius: 10px; overflow: hidden; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
            <div style="background-color: #35374B; padding: 20px; text-align: center; color: #ffffff;">
              <h1 style="margin: 0; font-size: 24px;">JJM Inventory System</h1>
            </div>
            <div style="padding: 30px; text-align: center;">
              <h2 style="font-size: 20px; color: #333;">Reset Your Password</h2>
              <p style="font-size: 16px; color: #666;">You have requested to reset your password. Click the button below to set a new password:</p>
              <a href="http://localhost:3000/login/forgot/${email}/${token}" style="display: inline-block; padding: 10px 20px; font-size: 16px; color: #fff; background-color: #2D9596; border-radius: 5px; text-decoration: none;">Reset Password</a>
            </div>
            <div style="background-color: #f9f9f9; padding: 20px; text-align: center; color: #888;">
              <p style="margin: 0; font-size: 14px;">If you did not request a password reset, please ignore this email.</p>
            </div>
          </div>
        </div>`
    });
    
    return NextResponse.json(data);

  } catch (error) {
    return NextResponse.json({ error });
  }
}
