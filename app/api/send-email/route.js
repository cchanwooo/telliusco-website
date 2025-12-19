// Final deployment trigger for send-email API
import { NextResponse } from 'next/server';

export async function POST(request) {
    const webhookUrl = process.env.GOOGLE_SHEET_WEBHOOK;

    if (!webhookUrl) {
        console.error('GOOGLE_SHEET_WEBHOOK is missing');
        return NextResponse.json({ success: false, error: 'Config missing' }, { status: 500 });
    }

    try {
        const body = await request.json();
        const type = body.type;
        const lang = (body.lang || 'EN').toUpperCase();

        // Handle both flattened and nested data
        const data = body.data || body;

        let payload = {
            type: type,
            lang: lang,
        };

        if (type === 'apply') {
            payload = {
                ...payload,
                fullName: data.fullName || "",
                email: data.email || "",
                phone: data.phone || "",
                cityState: data.location || data.cityState || "",
                desiredRole: data.role || data.desiredRole || "",
                availability: data.availability || "",
                message: data.message || "",
                resume: data.resume || null,
                source: "Apply Page"
            };
        } else if (type === 'hire') {
            // BACK TO LOWERCASE KEYS: Row 8 showed lowercase keys map correctly to capitalized headers.
            // Row 9 (PascalCase) FAILED.
            payload = {
                ...payload,
                company: data.company || data.companyName || "",
                contact: data.contact || data.contactName || "",
                email: data.email || "",
                phone: data.phone || "",
                cityState: data.cityState || data.location || "",
                roleNeeded: data.roleNeeded || data.role || "",
                headcount: data.headcount || "",
                shift: data.shift || "",
                startDate: data.startDate || "",
                message: data.message || "",
                source: "Hire Talent"
            };
        }

        console.log(`Forwarding ${type} to Google Sheet:`, payload);

        const notificationEmails = ["brian@telliusco.com", "grace@telliusco.com", "simon@telliusco.com"];

        const response = await fetch(webhookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...payload, notificationEmails: notificationEmails.join(',') }),
        });

        const result = await response.json();

        if (response.ok && result.success !== false) {
            return NextResponse.json({ success: true });
        } else {
            console.error('Apps Script Error Response:', result);
            return NextResponse.json({ success: false, error: result.error || 'Webhook failed' }, { status: 500 });
        }

    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
