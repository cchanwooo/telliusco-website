'use client';

import { useState } from 'react';
import styles from './Form.module.css';

export default function ContactForm({ t, lang }) {
    const [status, setStatus] = useState('idle');

    async function handleSubmit(e) {
        e.preventDefault();
        setStatus('submitting');
        const formData = new FormData(e.target);

        const payload = {
            type: 'contact', // Generic contact
            lang: lang || 'EN',
            source: 'Contact Page',
            fullName: formData.get('fullName'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            message: formData.get('message')
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
            setStatus('error');
        }
    }

    if (status === 'success') {
        return (
            <div className={styles.success}>
                <h3>Thank you for contacting us.</h3>
                <p>We will get back to you shortly.</p>
                <button onClick={() => setStatus('idle')} className={styles.linkButton} style={{ marginTop: '1rem' }}>Send another message</button>
            </div>
        );
    }

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.group}>
                <label className={styles.label} htmlFor="fullName">Name *</label>
                <input className={styles.input} type="text" id="fullName" name="fullName" required />
            </div>

            <div className={styles.group}>
                <label className={styles.label} htmlFor="email">Email *</label>
                <input className={styles.input} type="email" id="email" name="email" required />
            </div>

            <div className={styles.group}>
                <label className={styles.label} htmlFor="phone">Phone</label>
                <input className={styles.input} type="tel" id="phone" name="phone" />
            </div>

            <div className={styles.group}>
                <label className={styles.label} htmlFor="message">Message *</label>
                <textarea className={styles.textarea} id="message" name="message" required></textarea>
            </div>

            <button className={styles.button} type="submit" disabled={status === 'submitting'}>
                {status === 'submitting' ? 'Sending...' : 'Send Message'}
            </button>
        </form>
    );
}
