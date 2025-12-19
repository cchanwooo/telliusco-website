import { NextResponse } from 'next/server';

export async function POST(request) {
    const webhookUrl = process.env.GOOGLE_SHEET_WEBHOOK;

    if (!webhookUrl) {
        return NextResponse.json({ success: false, error: 'Config missing' }, { status: 500 });
    }

    try {
        const body = await request.json();
        const type = body.type;
        const data = body.data || body;

        let payload = {
            type: type || 'unknown',
            lang: (body.lang || 'EN').toUpperCase(),
            ...data
        };

        const response = await fetch(webhookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...payload, notificationEmails: "brian@telliusco.com,grace@telliusco.com,simon@telliusco.com" }),
        });

        const result = await response.json();
        return NextResponse.json(result);

    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
