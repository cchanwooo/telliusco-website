import { NextResponse } from 'next/server';

export async function POST(request) {
    const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwaw22nvNnjiUz8v3G3wGvkUiJNlShi-Tv2FWzCjPGV4BzfQ_-2nFVCds521BeRVCFB/exec';

    try {
        const body = await request.json();
        const { type, lang, source, data } = body;

        // 💡 핵심: 앱스 스크립트가 인식하기 쉽게 모든 필드를 최상위로 끌어올림 (Flattening)
        const finalPayload = {
            type,
            lang,
            source,
            ...data, // fullName, email, phone, resume 등이 최상위로 감
        };

        console.log(`Forwarding to Apps Script. Resume present: ${!!finalPayload.resume}`);

        const response = await fetch(APPS_SCRIPT_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(finalPayload), // 순수 JSON 문자열로 전송
        });

        const resultText = await response.text();
        return new NextResponse(resultText, {
            status: response.status,
            headers: { 'Content-Type': 'application/json' }
        });

    } catch (error) {
        console.error('API Route Error:', error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}