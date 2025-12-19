import { NextResponse } from 'next/server';

const APPS_SCRIPT_URL =
    'https://script.google.com/macros/s/AKfycbwaw22nvNnjiUz8v3G3wGvkUiJNlShi-Tv2FWzCjPGV4BzfQ_-2nFVCds521BeRVCFB/exec';

export async function POST(request) {
    try {
        const payload = await request.json();

        const response = await fetch(APPS_SCRIPT_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
            // ⚠️ Apps Script 쪽 응답이 느릴 수 있으면 아래 timeout은 프론트/배포 환경에 따라 별도 처리 필요
        });

        const text = await response.text();

        // Apps Script가 JSON으로 정상 반환하면 JSON으로 파싱, 아니면 그대로 리턴
        try {
            const json = JSON.parse(text);
            return NextResponse.json(json, { status: response.status });
        } catch {
            return NextResponse.json(
                { success: response.ok, raw: text },
                { status: response.status }
            );
        }
    } catch (error) {
        console.error('API Route Error:', error);
        return NextResponse.json(
            { success: false, error: error?.message || String(error) },
            { status: 500 }
        );
    }
}
