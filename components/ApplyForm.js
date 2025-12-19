'use client';

import { useState } from 'react';
import styles from './Form.module.css';

export default function ApplyForm({ t, lang }) {
    const [status, setStatus] = useState('idle');

    const fileToBase64 = (file) =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                const base64 = reader.result.split(',')[1];
                resolve({
                    base64,
                    filename: file.name,
                    mimeType: file.type || 'application/octet-stream',
                });
            };
            reader.onerror = (error) => reject(error);
        });

    async function handleSubmit(e) {
        e.preventDefault();
        const form = e.currentTarget;
        const formData = new FormData(form);
        const resumeFile = form.resume?.files?.[0];

        // 1. 파일 검사 (에러 시 경고창 띄우고 중단)
        if (resumeFile && resumeFile.size > 0) {
            if (resumeFile.size > 2 * 1024 * 1024) {
                alert('File is too large! (Limit 2MB)');
                return;
            }
        }

        setStatus('submitting');
        console.log('--- Submission Started ---');

        try {
            let resumeData = null;
            if (resumeFile && resumeFile.size > 0) {
                resumeData = await fileToBase64(resumeFile);
                console.log('✅ Resume encoded:', resumeData.filename);
            }

            // 앱스 스크립트가 바로 읽을 수 있는 구조로 정리
            const payload = {
                type: 'apply',
                lang: lang || 'EN',
                source: 'Apply Page',
                data: {
                    fullName: formData.get('fullName'),
                    email: formData.get('email'),
                    phone: formData.get('phone'),
                    cityState: formData.get('location'),
                    desiredRole: formData.get('role'),
                    availability: formData.get('availability'),
                    message: formData.get('message'),
                    resume: resumeData
                }
            };

            console.log('📡 Sending to /api/leads...');
            const res = await fetch('/api/leads', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            if (res.ok) {
                console.log('✅ Server responded 200 OK');
                setStatus('success');
                form.reset();
            } else {
                throw new Error(await res.text());
            }
        } catch (err) {
            console.error('❌ Final Error:', err);
            alert('Something went wrong. Please check console.');
            setStatus('error');
        }
    }

    // ... (본문 렌더링 코드는 기존과 동일)
}