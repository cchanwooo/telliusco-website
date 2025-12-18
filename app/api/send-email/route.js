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

        // Handle both flattened body (from updated HireForm) and nested data (from ApplyForm)
        const type = body.type;
        const lang = (body.lang || 'EN').toUpperCase();
        const data = body.data || body; // Fallback to body if data is not present

        let payload = {};

        if (type === 'apply') {
            payload = {
                type: "apply",
                fullName: data.fullName || "",
                email: data.email || "",
                phone: data.phone || "",
                cityState: data.location || data.cityState || "",
                desiredRole: data.role || data.desiredRole || "",
                availability: data.availability || "",
                message: data.message || "",
                source: "Apply Page",
                lang: lang
            };
        } else if (type === 'hire') {
            // Updated to match exactly what Google Sheets (Apps Script) expects based on the screenshot/headers
            // Using PascalCase keys for "Company", "Contact", "RoleNeeded" to fix missing fields issue
            payload = {
                type: "hire",
                Company: data.company || data.companyName || "",
                Contact: data.contact || data.contactName || "",
                Email: data.email || "",
                Phone: data.phone || "",
                CityState: data.cityState || data.location || "",
                RoleNeeded: data.roleNeeded || data.role || "",
                Headcount: data.headcount || "",
                Shift: data.shift || "",
                StartDate: data.startDate || "",
                Message: data.message || "",
                Source: "Hire Talent",
                Lang: lang
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
