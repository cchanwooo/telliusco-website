import { NextResponse } from 'next/server';

export async function POST(request) {
    const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyCzwyMPexRbGfYof6FjOoCSyrgxoKq4aG39s2eOHZyK83p-hWptINzXMSmUJ3FP4gZ/exec';
    try {
        const body = await request.json();

        // 데이터 평면화 (Flattening)
        const finalPayload = {
            type: body.type,
            lang: body.lang,
            source: body.source,
            ...body.data
        };

        const response = await fetch(APPS_SCRIPT_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(finalPayload),
        });

        const result = await response.json();

        // 앱스 스크립트 내부에서 실패한 경우 처리
        if (result.success === false) {
            console.error('Apps Script Internal Error:', result.error);
            return NextResponse.json(result, { status: 500 });
        }

        return NextResponse.json(result, { status: 200 });

    } catch (error) {
        console.error('Route error:', error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}