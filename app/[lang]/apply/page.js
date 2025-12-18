import Link from 'next/link'
import styles from './page.module.css'
import { getDictionary } from '../../../get-dictionary'
import ApplyForm from '../../../components/ApplyForm'

export default async function Apply(props) {
    const params = await props.params;
    const { lang } = params;
    const dictionary = await getDictionary(lang)
    const t = dictionary.apply

    return (
        <div className="container">
            <section className={styles.section}>
                <h1>{t.title}</h1>
                <p className={styles.subtitle}>{t.subtitle}</p>

                <div style={{ maxWidth: '800px', margin: '3rem auto', textAlign: 'left' }}>
                    <p className={styles.intro}>{t.intro}</p>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', margin: '3rem 0' }}>
                        <div className={styles.card}>
                            <h3>{t.checklistTitle}</h3>
                            <ul style={{ paddingLeft: '1.2rem', marginTop: '1rem' }}>
                                {t.checklist.map((item, i) => (
                                    <li key={i} style={{ marginBottom: '0.5rem' }}>{item}</li>
                                ))}
                            </ul>
                        </div>
                        <div className={styles.card}>
                            <h3>{t.timelineTitle}</h3>
                            <ul style={{ listStyle: 'none', padding: 0, marginTop: '1rem' }}>
                                {t.timeline.map((step, i) => (
                                    <li key={i} style={{ marginBottom: '0.8rem', paddingLeft: '1rem', borderLeft: '3px solid #FFB81C' }}>
                                        {step}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div style={{ marginTop: '3rem', padding: '2rem', background: '#f5f5f5', borderRadius: '8px' }}>
                        <ApplyForm t={dictionary.forms} lang={lang} />
                    </div>

                    <p style={{ marginTop: '2rem', fontSize: '0.9rem', color: '#666', textAlign: 'center' }}>
                        {t.trust}
                    </p>
                </div>
            </section>
        </div>
    )
}
