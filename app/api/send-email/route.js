import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const apiKey = process.env.RESEND_API_KEY;
const resend = apiKey ? new Resend(apiKey) : null;

export async function POST(request) {
    if (!resend) {
        console.error('RESEND_API_KEY is missing');
        return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }

    try {
        const body = await request.json();
        const { type, data } = body;

        // type: 'apply' | 'hire'
        // data: form fields

        let subject = '';
        let htmlContent = '';
        let toEmail = '';

        if (type === 'apply') {
            toEmail = process.env.JOBS_TO_EMAIL || 'brian@telliusco.com';
            subject = `New Job Application: ${data.fullName} - ${data.role}`;
            htmlContent = `
            <h1>New Job Application</h1>
            <p><strong>Name:</strong> ${data.fullName}</p>
            <p><strong>Email:</strong> ${data.email}</p>
            <p><strong>Phone:</strong> ${data.phone}</p>
            <p><strong>City/State:</strong> ${data.location}</p>
            <p><strong>Role:</strong> ${data.role}</p>
            <p><strong>Availability:</strong> ${data.availability}</p>
            <p><strong>Message:</strong> ${data.message}</p>
        `;
        } else if (type === 'hire') {
            toEmail = process.env.SALES_TO_EMAIL || 'brian@telliusco.com';
            subject = `New Talent Request: ${data.companyName}`;
            htmlContent = `
            <h1>New Talent Request</h1>
            <p><strong>Company:</strong> ${data.companyName}</p>
            <p><strong>Contact:</strong> ${data.contactName}</p>
            <p><strong>Email:</strong> ${data.email}</p>
            <p><strong>Phone:</strong> ${data.phone}</p>
            <p><strong>Location:</strong> ${data.location}</p>
            <p><strong>Role Needed:</strong> ${data.role}</p>
            <p><strong>Headcount:</strong> ${data.headcount}</p>
            <p><strong>Start Date:</strong> ${data.startDate}</p>
            <p><strong>Shift:</strong> ${data.shift}</p>
            <p><strong>Message:</strong> ${data.message}</p>
        `;
        } else {
            return NextResponse.json({ error: 'Invalid submission type' }, { status: 400 });
        }

        const { data: emailData, error } = await resend.emails.send({
            from: 'Telliusco Web <onboarding@resend.dev>', // Update this to a verified domain in prod setup
            to: [toEmail],
            subject: subject,
            html: htmlContent,
        });

        if (error) {
            console.error('Resend Error:', error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ success: true, id: emailData.id });
    } catch (error) {
        console.error('Server Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
