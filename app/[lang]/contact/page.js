import Link from 'next/link'
import styles from './page.module.css'
import { getDictionary } from '../../../get-dictionary'

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
                    <p style={{ marginBottom: '2rem', textAlign: 'center' }}>{t.instructions}</p>

                    <div style={{ padding: '2rem', border: '2px solid #FFB81C', borderRadius: '8px', marginBottom: '3rem', textAlign: 'center' }}>
                        <h3 style={{ color: '#d32f2f' }}>🔥 {t.urgent}</h3>
                        <p style={{ fontSize: '1.5rem', fontWeight: 'bold', marginTop: '1rem' }}>{dictionary.contactInfo.phone}</p>
                    </div>

                    <div style={{ background: '#f5f5f5', padding: '2rem', borderRadius: '8px' }}>
                        <p style={{ marginBottom: '1rem', fontWeight: 'bold' }}>{t.infoNeeded}</p>
                        <div style={{ height: '200px', background: '#fff', border: '1px solid #ccc', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#999' }}>
                            {t.formPlaceholder}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
