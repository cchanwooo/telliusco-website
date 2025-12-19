import { NextResponse } from 'next/server';

export async function POST(request) {
    const webhookUrl = process.env.GOOGLE_SHEET_WEBHOOK;

    if (!webhookUrl) {
        console.error('GOOGLE_SHEET_WEBHOOK is missing');
        return NextResponse.json({ success: false, error: 'Config missing' }, { status: 500 });
    }

    try {
        const payload = await request.json();

        console.log(`Forwarding lead to Google Sheet (${payload.type}):`, {
            ...payload,
            data: {
                ...payload.data,
                resume: payload.data?.resume ? {
                    filename: payload.data.resume.filename,
                    base64Length: payload.data.resume.base64.length
                } : null
            }
        });

        const response = await fetch(webhookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Apps Script Error:', response.status, errorText);
            return NextResponse.json({ success: false, error: 'Webhook failed' }, { status: 500 });
        }

        return NextResponse.json({ success: true });

    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
