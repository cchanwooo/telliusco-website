import { NextResponse } from 'next/server';

export async function POST(request) {
    const webhookUrl = process.env.GOOGLE_SHEET_WEBHOOK;

    if (!webhookUrl) {
        console.error('GOOGLE_SHEET_WEBHOOK is missing from environment variables');
        return NextResponse.json({
            success: false,
            error: 'Server configuration error: GOOGLE_SHEET_WEBHOOK missing'
        }, { status: 500 });
    }

    try {
        const body = await request.json();
        const { type, data, lang = 'EN' } = body;

        let payload = {};

        if (type === 'apply') {
            payload = {
                type: "apply",
                fullName: data.fullName || "",
                email: data.email || "",
                phone: data.phone || "",
                cityState: data.location || "",
                desiredRole: data.role || "",
                availability: data.availability || "",
                message: data.message || "",
                source: "Apply Page",
                lang: lang.toUpperCase()
            };
        } else if (type === 'hire') {
            // Forward hire form data as well to maintain functionality
            payload = {
                type: "hire",
                companyName: data.companyName || "",
                contactName: data.contactName || "",
                email: data.email || "",
                phone: data.phone || "",
                cityState: data.location || "",
                desiredRole: data.role || "",
                headcount: data.headcount || "",
                shift: data.shift || "",
                startDate: data.startDate || "",
                message: data.message || "",
                source: "Hire Talent",
                lang: lang.toUpperCase()
            };
        } else {
            console.warn('Unknown submission type:', type);
            return NextResponse.json({
                success: false,
                error: 'Invalid submission type'
            }, { status: 400 });
        }

        console.log(`Forwarding ${type} submission to Google Sheet Webhook`);

        const response = await fetch(webhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Apps Script Webhook Error Status:', response.status);
            console.error('Apps Script Webhook Error Body:', errorText);
            return NextResponse.json({
                success: false,
                error: `Apps Script Webhook failed with status ${response.status}`
            }, { status: 500 });
        }

        return NextResponse.json({ success: true });

    } catch (error) {
        console.error('Server side error in /api/send-email:', error);
        return NextResponse.json({
            success: false,
            error: error.message || 'Internal Server Error'
        }, { status: 500 });
    }
}
