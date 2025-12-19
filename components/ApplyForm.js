'use client';

import { useState } from 'react';
import styles from './Form.module.css';

export default function ApplyForm({ t, lang }) {
    const [status, setStatus] = useState('idle'); // idle, submitting, success, error

    // Helper function to convert file to base64
    const fileToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve({
                base64: reader.result.split(',')[1],
                filename: file.name,
                mimeType: file.type
            });
            reader.onerror = (error) => reject(error);
        });
    };

    async function handleSubmit(e) {
        e.preventDefault();

        const formData = new FormData(e.target);
        const resumeFile = formData.get('resume');

        // 1. Validation: File Type & Size (2MB Limit)
        if (resumeFile && resumeFile.size > 0) {
            const allowedTypes = [
                'application/pdf',
                'application/msword',
                'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
            ];
            if (!allowedTypes.includes(resumeFile.type)) {
                alert('Only PDF, DOC, and DOCX files are allowed.');
                return;
            }
            if (resumeFile.size > 2 * 1024 * 1024) { // 2MB
                alert('File size must be 2MB or less.');
                return;
            }
        }

        setStatus('submitting');

        try {
            // Convert resume if exists
            let resumeData = null;
            if (resumeFile && resumeFile.size > 0) {
                resumeData = await fileToBase64(resumeFile);
                console.log(`Resume detected: ${resumeData.filename}, Base64 length: ${resumeData.base64.length}`);
            } else {
                console.log('No resume uploaded');
            }

            // Final JSON Payload
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

            const res = await fetch('/api/leads', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            if (res.ok) {
                setStatus('success');
                e.target.reset();
            } else {
                setStatus('error');
            }
        } catch (err) {
            console.error('Submission error:', err);
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
