'use client';

import { useState } from 'react';
import styles from './Form.module.css';

export default function ApplyForm({ t, lang }) {
    const [status, setStatus] = useState('idle'); // idle, submitting, success, error

    const fileToBase64 = (file) =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                const result = reader.result || '';
                const base64 = String(result).split(',')[1] || '';
                resolve({
                    base64,
                    filename: file.name,
                    mimeType: file.type || 'application/octet-stream',
                });
            };
            reader.onerror = reject;
        });

    async function handleSubmit(e) {
        e.preventDefault();

        const formData = new FormData(e.target);
        const resumeFile = formData.get('resume'); // File object

        // Validate resume (optional)
        if (resumeFile && resumeFile instanceof File && resumeFile.size > 0) {
            const allowedTypes = [
                'application/pdf',
                'application/msword',
                'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            ];
            if (!allowedTypes.includes(resumeFile.type)) {
                alert('Only PDF, DOC, and DOCX files are allowed.');
                return;
            }
            if (resumeFile.size > 2 * 1024 * 1024) {
                alert('File size must be 2MB or less.');
                return;
            }
        }

        setStatus('submitting');

        try {
            let resumeData = null;

            if (resumeFile && resumeFile instanceof File && resumeFile.size > 0) {
                resumeData = await fileToBase64(resumeFile);
                console.log(
                    `✅ Resume detected: ${resumeData.filename}, base64 length: ${resumeData.base64.length}`
                );

                // Safety: base64 empty면 업로드 실패로 처리
                if (!resumeData.base64) {
                    throw new Error('Resume base64 conversion failed (empty base64).');
                }
            } else {
                console.log('ℹ️ No resume uploaded');
            }

            const payload = {
                type: 'apply',                 // ✅ 오타 방지 (applyy 금지)
                lang: (lang || 'EN'),
                source: 'Apply Page',
                data: {
                    fullName: formData.get('fullName') || '',
                    email: formData.get('email') || '',
                    phone: formData.get('phone') || '',
                    cityState: formData.get('location') || '',
                    desiredRole: formData.get('role') || '',
                    availability: formData.get('availability') || '',
                    message: formData.get('message') || '',
                    resume: resumeData,          // ✅ 여기로 들어가야 함 (null 가능)
                },
            };

            console.log('📦 Sending payload keys:', Object.keys(payload.data));

            const res = await fetch('/api/leads', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            const text = await res.text();
            console.log('🧾 /api/leads response:', res.status, text);

            if (res.ok) {
                setStatus('success');
                e.target.reset();
            } else {
                setStatus('error');
            }
        } catch (err) {
            console.error('❌ Submission error:', err);
            setStatus('error');
        }
    }

    if (status === 'success') {
        return (
            <div className={styles.success}>
                <h3>{t.success}</h3>
                <button
                    onClick={() => setStatus('idle')}
                    style={{
                        marginTop: '1rem',
                        background: 'transparent',
                        border: 'none',
                        textDecoration: 'underline',
                        cursor: 'pointer',
                    }}
                >
                    Submit another
                </button>
            </div>
        );
    }

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
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
                <label className={styles.label} htmlFor="resume">{t.uploadResume || 'Upload Resume (optional)'}</label>
                <input
                    className={styles.input}
                    type="file"
                    id="resume"
                    name="resume"
                    accept=".pdf,.doc,.docx"
                />
            </div>

            <div className={styles.group}>
                <label className={styles.label} htmlFor="message">{t.message}</label>
                <textarea className={styles.textarea} id="message" name="message"></textarea>
            </div>

            {status === 'error' && <div className={styles.error}>{t.error}</div>}

            <button className={styles.button} type="submit" disabled={status === 'submitting'}>
                {status === 'submitting' ? t.sending : t.submit}
            </button>
        </form>
    );
}
