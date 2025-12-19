'use client';

import { useState } from 'react';
import styles from './Form.module.css';

export default function ApplyForm({ t, lang }) {
    const [status, setStatus] = useState('idle'); // idle, submitting, success, error

    async function handleSubmit(e) {
        e.preventDefault();
        setStatus('submitting');

        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());

        // Handle File Upload
        const resumeFile = formData.get('resume');
        let resumeData = null;

        if (resumeFile && resumeFile.size > 0) {
            try {
                resumeData = await new Promise((resolve, reject) => {
                    const reader = new FileReader();
                    reader.onload = () => resolve({
                        base64: reader.result.split(',')[1],
                        filename: resumeFile.name,
                        mimeType: resumeFile.type
                    });
                    reader.onerror = reject;
                    reader.readAsDataURL(resumeFile);
                });
            } catch (err) {
                console.error("File reading error:", err);
            }
        }

        try {
            const res = await fetch('/api/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    type: 'apply',
                    data: { ...data, resume: resumeData },
                    lang
                }),
            });

            if (res.ok) {
                setStatus('success');
                e.target.reset();
            } else {
                setStatus('error');
            }
        } catch (err) {
            console.error(err);
            setStatus('error');
        }
    }

    if (status === 'success') {
        return (
            <div className={styles.success}>
                <h3>{t.success}</h3>
                <button onClick={() => setStatus('idle')} style={{ marginTop: '1rem', background: 'transparent', border: 'none', textDecoration: 'underline', cursor: 'pointer' }}>
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
                <input className={styles.input} type="file" id="resume" name="resume" accept=".pdf,.doc,.docx" />
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
