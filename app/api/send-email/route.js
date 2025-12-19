import { NextResponse } from 'next/server';

export async function POST(request) {
    // 💡 최신 구글 앱스 스크립트 URL로 업데이트됨
    const webhookUrl = "https://script.google.com/macros/s/AKfycbzw5eGyK6EgUVFhVRaR4uIQQtkU4inwTVh9sOX59Wov8ZQ4_5MhFj3ccXDbZJDxk7b1/exec";

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
