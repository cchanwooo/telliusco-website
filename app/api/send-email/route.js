import { NextResponse } from 'next/server';

export async function POST(request) {
    // 💡 Hire/Apply 분할 및 상세 이메일 기능이 포함된 최신 URL
    const webhookUrl = "https://script.google.com/macros/s/AKfycbRj2v4ALeeIeMlJ9vWIsYhVRmAEdlZr5-OtJSUHD55v0FEJUzHz2ejYIcGryW_QDLb/exec";

    if (!webhookUrl) {
        console.error('GOOGLE_SHEET_WEBHOOK is missing in environment variables');
        return NextResponse.json({ success: false, error: 'Server configuration error' }, { status: 500 });
    }

    try {
        const body = await request.json();
        const notificationEmails = "brian@telliusco.com,grace@telliusco.com,simon@telliusco.com";

        const response = await fetch(webhookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...body, notificationEmails }),
        });

        if (!response.ok) {
            const errorText = await response.text();
            return NextResponse.json({ success: false, error: 'GAS error: ' + errorText }, { status: 500 });
        }

        const result = await response.json();
        return NextResponse.json(result);

    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
