'use client';

import { useState } from 'react';
import styles from './Form.module.css';

export default function ApplyForm({ t, lang }) {
    const [status, setStatus] = useState('idle');

    async function handleSubmit(e) {
        // ⚠️ 무조건 이벤트 전파 방지 (HTML 기본 전송 막기)
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }

        console.log('--- SUBMISSION TRIGGERED ---');

        const form = e.currentTarget;
        const formData = new FormData(form);
        const resumeFile = form.resume?.files?.[0];

        setStatus('submitting');

        try {
            // 이력서 파일 처리
            let resumeData = null;
            if (resumeFile && resumeFile.size > 0) {
                const reader = new FileReader();
                resumeData = await new Promise((resolve, reject) => {
                    reader.onload = () => resolve({
                        base64: reader.result.split(',')[1],
                        filename: resumeFile.name,
                        mimeType: resumeFile.type
                    });
                    reader.onerror = reject;
                    reader.readAsDataURL(resumeFile);
                });
            }

            const payload = {
                type: 'apply',
                lang: lang || 'EN',
                source: 'Apply Page',
                fullName: formData.get('fullName') || '',
                email: formData.get('email') || '',
                phone: formData.get('phone') || '',
                cityState: formData.get('location') || '',
                desiredRole: formData.get('role') || '',
                availability: formData.get('availability') || '',
                message: formData.get('message') || '',
                resume: resumeData
            };

            console.log('📡 Fetching /api/send-email with payload:', payload.fullName);

            const res = await fetch('/api/send-email', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            const result = await res.json();
            console.log('🏁 Server Result:', res.status, result);

            if (res.ok && result.success !== false) {
                setStatus('success');
                form.reset();
            } else {
                throw new Error(result.error || 'Submission failed');
            }
        } catch (err) {
            console.error('❌ Error in ApplyForm:', err.message);
            alert('Submission Error: ' + err.message);
            setStatus('error');
        }
    }

    if (status === 'success') {
        return (
            <div className={styles.success}>
                <h3 id="success-msg">{t.success}</h3>
                <button onClick={() => setStatus('idle')} className={styles.linkButton}>
                    Submit another
                </button>
            </div>
        );
    }

    return (
        <form className={styles.form} onSubmit={handleSubmit} noValidate>
            <div className={styles.group}>
                <label className={styles.label} htmlFor="fullName">{t.fullName} *</label>
                <input className={styles.input} type="text" id="fullName" name="fullName" required />
            </div>
            <div className={styles.group}>
                <label className={styles.label} htmlFor="email">{t.email} *</label>
                <input className={styles.input} type="email" id="email" name="email" required />
            </div>
            <div className={styles.group}>
                <label className={styles.label} htmlFor="phone">{t.phone} *</label>
                <input className={styles.input} type="tel" id="phone" name="phone" required />
            </div>
            <div className={styles.group}>
                <label className={styles.label} htmlFor="location">{t.location} *</label>
                <input className={styles.input} type="text" id="location" name="location" required />
            </div>
            <div className={styles.group}>
                <label className={styles.label} htmlFor="role">{t.role} *</label>
                <select className={styles.select} id="role" name="role" required>
                    <option value="">-- Select --</option>
                    <option value="Manufacturing">Manufacturing</option>
                    <option value="Warehouse">Warehouse</option>
                    <option value="Office">Office/Clerical</option>
                    <option value="Construction">Construction Support</option>
                    <option value="Other">Other</option>
                </select>
            </div>
            <div className={styles.group}>
                <label className={styles.label} htmlFor="availability">{t.availability}</label>
                <input className={styles.input} type="text" id="availability" name="availability" />
            </div>
            <div className={styles.group}>
                <label className={styles.label} htmlFor="resume">{t.uploadResume || 'Upload Resume'}</label>
                <input className={styles.input} type="file" id="resume" name="resume" accept=".pdf,.doc,.docx" />
            </div>
            <div className={styles.group}>
                <label className={styles.label} htmlFor="message">{t.message}</label>
                <textarea className={styles.textarea} id="message" name="message"></textarea>
            </div>
            {status === 'error' && <div className={styles.error} style={{ color: 'red' }}>Error sending. Check console.</div>}
            <button className={styles.button} type="submit" disabled={status === 'submitting'}>
                {status === 'submitting' ? t.sending : t.submit}
            </button>
        </form>
    );
}