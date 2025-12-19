import { NextResponse } from 'next/server';

export async function POST(request) {
    try {
        // 1. 요청 데이터를 변수에 저장
        const payload = await request.json();

        // 2. 위에서 확인한 정확한 Apps Script URL로 전송
        const response = await fetch('https://script.google.com/macros/s/AKfycbwaw22nvNnjiUz8v3G3wGvkUiJNlShi-Tv2FWzCjPGV4BzfQ_-2nFVCds521BeRVCFB/exec', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            // ⚠️ 객체를 문자열로 변환하여 전송 (데이터 유실 방지 핵심)
            body: JSON.stringify(payload)
        });

        const result = await response.json();
        return NextResponse.json(result);

    } catch (error) {
        console.error("API Route Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}