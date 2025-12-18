'use client';

import { useState } from 'react';
import styles from './Form.module.css';

export default function HireForm({ t, lang }) {
    const [status, setStatus] = useState('idle');

    async function handleSubmit(e) {
        e.preventDefault();
        setStatus('submitting');

        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());

        // ✅ Flatten payload (NO nested "data" object)
        // ✅ Map location -> cityState so Sheets column matches
        const payload = {
            type: 'hire',
            lang: lang || 'EN',
            source: 'Hire Talent',

            company: data.company || '',
            contact: data.contact || '',
            email: data.email || '',
            phone: data.phone || '',
            cityState: data.location || data.cityState || '',
            roleNeeded: data.roleNeeded || '',

            headcount: data.headcount || '',
            shift: data.shift || '',
            startDate: data.startDate || '',
            message: data.message || '',
        };

        try {
            const res = await fetch('/api/send-email', {
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
            console.error(err);
            setStatus('error');
        }
    }

    if (status === 'success') {
        return (
            <div className={styles.success}>
                <h3>{t.success || 'Thank you — we’ll contact you shortly.'}</h3>
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
                    Send another request
                </button>
            </div>
        );
    }

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.group}>
                <label className={styles.label} htmlFor="company">
                    {t.company || 'Company Name'} *
                </label>
                <input className={styles.input} type="text" id="company" name="company" required />
            </div>

            <div className={styles.group}>
                <label className={styles.label} htmlFor="contact">
                    {t.contact || 'Contact Person'} *
                </label>
                <input className={styles.input} type="text" id="contact" name="contact" required />
            </div>

            <div className={styles.group}>
                <label className={styles.label} htmlFor="email">
                    {t.email || 'Email Address'} *
                </label>
                <input className={styles.input} type="email" id="email" name="email" required />
            </div>

            <div className={styles.group}>
                <label className={styles.label} htmlFor="phone">
                    {t.phone || 'Phone Number'} *
                </label>
                <input className={styles.input} type="tel" id="phone" name="phone" required />
            </div>

            {/* Keep UI label same, but we will map "location" -> cityState in payload */}
            <div className={styles.group}>
                <label className={styles.label} htmlFor="location">
                    {t.location || 'City & State'} *
                </label>
                <input className={styles.input} type="text" id="location" name="location" required />
            </div>

            <div className={styles.group}>
                <label className={styles.label} htmlFor="roleNeeded">
                    {t.roleNeeded || 'Role Needed'} *
                </label>
                <input className={styles.input} type="text" id="roleNeeded" name="roleNeeded" required />
            </div>

            <div className={styles.group}>
                <label className={styles.label} htmlFor="headcount">
                    {t.headcount || 'Number of Workers Needed'}
                </label>
                <input className={styles.input} type="number" id="headcount" name="headcount" />
            </div>

            <div className={styles.group}>
                <label className={styles.label} htmlFor="shift">
                    {t.shift || 'Shift'}
                </label>
                <input className={styles.input} type="text" id="shift" name="shift" />
            </div>

            <div className={styles.group}>
                <label className={styles.label} htmlFor="startDate">
                    {t.startDate || 'Start Date'}
                </label>
                <input className={styles.input} type="date" id="startDate" name="startDate" />
            </div>

            <div className={styles.group}>
                <label className={styles.label} htmlFor="message">
                    {t.message || 'Additional Message'}
                </label>
                <textarea className={styles.textarea} id="message" name="message"></textarea>
            </div>

            {status === 'error' && <div className={styles.error}>{t.error || 'Something went wrong…'}</div>}

            <button className={styles.button} type="submit" disabled={status === 'submitting'}>
                {status === 'submitting' ? (t.sending || 'Sending...') : (t.submitHire || 'Submit Request')}
            </button>
        </form>
    );
}
