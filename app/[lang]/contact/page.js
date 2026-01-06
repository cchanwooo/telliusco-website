import Link from 'next/link'
import styles from './page.module.css'
import { getDictionary } from '../../../get-dictionary'
import ContactForm from '../../../components/ContactForm'

export const metadata = {
    title: 'Contact Us | Telliusco Staffing',
    description: 'Get in touch with our team for staffing solutions or job inquiries.'
}

export default async function Contact(props) {
    const params = await props.params;
    const { lang } = params;
    const dictionary = await getDictionary(lang)
    const t = dictionary.contact

    return (
        <div className="container">
            <section className={styles.section}>
                <h1>{t.title}</h1>
                <p className={styles.subtitle}>{t.subtitle}</p>

                <div style={{ maxWidth: '800px', margin: '3rem auto', textAlign: 'left' }}>

                    {/* Urgent Banner */}
                    <div style={{ padding: '2rem', border: '2px solid #FFB81C', borderRadius: '8px', marginBottom: '3rem', textAlign: 'center', background: '#fffbeb' }}>
                        <h3 style={{ color: '#d32f2f', marginBottom: '0.5rem' }}>🔥 {t.urgent}</h3>
                        <a href={`tel:${dictionary.contactInfo.phone}`} style={{ fontSize: '1.8rem', fontWeight: 'bold', display: 'block', color: '#00205B', textDecoration: 'none' }}>
                            {dictionary.contactInfo.phone}
                        </a>
                        <span style={{ fontSize: '0.9rem', color: '#666' }}>Click to Call</span>
                    </div>

                    <p style={{ marginBottom: '2rem', textAlign: 'center', lineHeight: '1.6' }}>{t.instructions}</p>

                    <div style={{ background: '#f8fafc', padding: '2.5rem', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
                        <h2 style={{ textAlign: 'center', marginBottom: '2rem', color: '#00205B' }}>Send us a message</h2>
                        <ContactForm t={t} lang={lang} />
                    </div>
                </div>
            </section>
        </div>
    )
}
