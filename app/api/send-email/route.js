import { NextResponse } from 'next/server';

export async function POST(request) {
    // 💡 최신 활성화된 구글 앱스 스크립트 배포 URL
    const webhookUrl = "https://script.google.com/macros/s/AKfycbz106w2aFwAilBnBo7M3fedm3JC_B0Tmg6zG2F4oiY_b_0wuMy281SBxrfS2pMV1RWf/exec";

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
