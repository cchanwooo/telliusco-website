import { NextResponse } from 'next/server';

export async function POST(request) {
    const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwaw22nvNnjiUz8v3G3wGvkUiJNlShi-Tv2FWzCjPGV4BzfQ_-2nFVCds521BeRVCFB/exec';

    try {
        const body = await request.json();

        // 데이터 평면화 (Flattening)
        const finalPayload = {
            type: body.type,
            lang: body.lang,
            source: body.source,
            ...body.data // 이 부분이 fullName, email 등을 최상위로 올립니다.
        };

        console.log('Forwarding lead (flat):', finalPayload.fullName);

        const response = await fetch(APPS_SCRIPT_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(finalPayload),
        });

        const text = await response.text();
        return new NextResponse(text, { status: 200 });

    } catch (error) {
        console.error('Route error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}