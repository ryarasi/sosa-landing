import { NextRequest, NextResponse } from 'next/server';
import Airtable from 'airtable';
import { Resend } from 'resend';

// Initialize Airtable
const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY! }).base(
  process.env.AIRTABLE_BASE_ID!
);

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY!);

// Rate limiting map (in production, use Redis or similar)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

// Helper function to get client IP
function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const ip = forwarded ? forwarded.split(',')[0] : 'unknown';
  return ip;
}

// Rate limiting function
function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const limit = rateLimitMap.get(ip);

  if (!limit || now > limit.resetTime) {
    rateLimitMap.set(ip, {
      count: 1,
      resetTime: now + 60 * 60 * 1000, // 1 hour
    });
    return true;
  }

  if (limit.count >= 5) {
    return false;
  }

  limit.count++;
  return true;
}

export async function POST(request: NextRequest) {
  try {
    // Check rate limit
    const ip = getClientIp(request);
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    // Parse request body
    const body = await request.json();
    const { name, email, country, reason } = body;

    // Validate input
    if (!name || name.length < 2) {
      return NextResponse.json(
        { error: 'Name must be at least 2 characters long.' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please provide a valid email address.' },
        { status: 400 }
      );
    }

    if (!country) {
      return NextResponse.json(
        { error: 'Please select your country.' },
        { status: 400 }
      );
    }

    if (!reason || reason.length < 50) {
      return NextResponse.json(
        { error: 'Please provide at least 50 characters explaining your interest.' },
        { status: 400 }
      );
    }

    // Check for duplicate email
    try {
      const existingRecords = await base(process.env.AIRTABLE_TABLE_NAME!)
        .select({
          filterByFormula: `{Email} = '${email}'`,
          maxRecords: 1,
        })
        .firstPage();

      if (existingRecords.length > 0) {
        return NextResponse.json(
          { error: 'This email address is already on the waitlist.' },
          { status: 400 }
        );
      }
    } catch (error) {
      console.error('Error checking for duplicate:', error);
      // Continue anyway - better to have duplicates than to fail
    }

    // Save to Airtable
    const record = await base(process.env.AIRTABLE_TABLE_NAME!).create({
      Name: name,
      Email: email,
      Country: country,
      Reason: reason,
      Status: 'Pending',
      'Submitted At': new Date().toISOString(),
    });

    // Send confirmation email
    try {
      await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL!,
        to: email,
        subject: 'Welcome to SOSA - Your Application is Received',
        html: `
          <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #0A0A0A; font-size: 24px; margin-bottom: 20px;">Welcome to SOSA</h1>
            <p style="color: #333; font-size: 16px; line-height: 1.6;">Hi ${name},</p>
            <p style="color: #333; font-size: 16px; line-height: 1.6;">
              Thank you for your interest in the Society of Societal Architects. We've received your application
              and are excited to have you join our movement for incorruptible research through decentralized governance.
            </p>
            <p style="color: #333; font-size: 16px; line-height: 1.6;">
              Our team will review your application and send you an invitation to our community soon.
              In the meantime, you can learn more about our mission and principles at 
              <a href="https://sosa.live" style="color: #0066cc;">sosa.live</a>.
            </p>
            <p style="color: #333; font-size: 16px; line-height: 1.6;">
              Best regards,<br>
              The SOSA Team
            </p>
            <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
            <p style="color: #999; font-size: 14px;">
              This email was sent because you signed up for the SOSA waitlist. 
              If you didn't sign up, please ignore this email.
            </p>
          </div>
        `,
      });
    } catch (emailError) {
      console.error('Error sending email:', emailError);
      // Don't fail the whole request if email fails
    }

    return NextResponse.json({
      success: true,
      message: 'Thank you for your interest! Check your email for confirmation.',
    });
  } catch (error) {
    console.error('Error processing waitlist submission:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again later.' },
      { status: 500 }
    );
  }
}