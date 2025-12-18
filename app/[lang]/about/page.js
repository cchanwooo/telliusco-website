import Link from 'next/link'
import styles from './page.module.css'
import { getDictionary } from '../../../get-dictionary'

export default async function About(props) {
    const params = await props.params;
    const { lang } = params;
    const dictionary = await getDictionary(lang)
    const t = dictionary.about

    return (
        <div className="container">
            <section className={styles.section}>
                <h1>{t.title}</h1>

                <div style={{ maxWidth: '800px', margin: '3rem auto', textAlign: 'left' }}>
                    <div style={{ marginBottom: '3rem' }}>
                        <h2 style={{ color: '#00205B' }}>{t.mission}</h2>
                        <p style={{ fontSize: '1.2rem', lineHeight: '1.6' }}>{t.missionText}</p>
                    </div>

                    <div style={{ marginBottom: '3rem' }}>
                        <h2 style={{ color: '#00205B' }}>{t.valuesTitle}</h2>
                        <ul style={{ listStyle: 'none', padding: 0 }}>
                            {t.values.map((val, i) => (
                                <li key={i} style={{ padding: '1rem', background: '#f9f9f9', marginBottom: '0.5rem', borderRadius: '4px' }}>
                                    <strong>{val.split(':')[0]}:</strong> {val.split(':')[1]}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div style={{ padding: '2rem', background: '#eef2f6', borderRadius: '8px', textAlign: 'center' }}>
                        <p>{t.eeo}</p>
                    </div>
                </div>
            </section>
        </div>
    )
}
