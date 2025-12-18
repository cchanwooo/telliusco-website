import styles from './page.module.css'
import { getDictionary } from '../../../get-dictionary'
import HireForm from '../../../components/HireForm'

export default async function Hire(props) {
    const params = await props.params;
    const { lang } = params;
    const dictionary = await getDictionary(lang)
    const t = dictionary.hire

    return (
        <div className="container">
            <section className={styles.section}>
                <h1>{t.title}</h1>
                <p className={styles.subtitle}>{t.subtitle}</p>

                <div style={{ maxWidth: '900px', margin: '3rem auto', textAlign: 'left' }}>
                    <p className={styles.intro} style={{ fontSize: '1.2rem', textAlign: 'center', marginBottom: '3rem' }}>
                        {t.intro}
                    </p>

                    <div style={{ marginBottom: '4rem', padding: '2rem', background: '#f5f5f5', borderRadius: '8px' }}>
                        <HireForm t={dictionary.forms} lang={lang} />
                    </div>

                    <div style={{ marginBottom: '4rem' }}>
                        <h2 style={{ textAlign: 'center', marginBottom: '2rem', color: '#00205B' }}>{t.rolesTitle}</h2>
                        {/* Reusing visual style for simplicity */}
                        <div style={{ textAlign: 'center', padding: '2rem', background: '#eff6ff', borderRadius: '8px' }}>
                            <p style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>Manufacturing • Warehouse • Office • Construction</p>
                        </div>
                    </div>

                    <div style={{ marginBottom: '4rem' }}>
                        <h2 style={{ textAlign: 'center', marginBottom: '2rem', color: '#00205B' }}>{t.processTitle}</h2>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
                            {t.processSteps.map((step, i) => (
                                <div key={i} style={{ padding: '1.5rem', background: 'white', border: '1px solid #ddd', borderRadius: '8px', textAlign: 'center' }}>
                                    <strong>{step}</strong>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div style={{ marginBottom: '4rem' }}>
                        <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>{t.proofTitle}</h2>
                        <ul style={{ display: 'flex', justifyContent: 'center', gap: '2rem', listStyle: 'none', flexWrap: 'wrap' }}>
                            {t.proofPoints.map((point, i) => (
                                <li key={i} style={{ padding: '1rem 2rem', background: '#FFB81C', color: '#00205B', borderRadius: '50px', fontWeight: 'bold' }}>
                                    {point}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>{t.faqTitle}</h2>
                        <div className={styles.faqGrid}>
                            {t.faq.map((item, i) => (
                                <details key={i} style={{ background: '#fff', padding: '1rem', marginBottom: '0.5rem', borderRadius: '4px', border: '1px solid #eee' }}>
                                    <summary style={{ cursor: 'pointer', fontWeight: 'bold', color: '#00205B' }}>{item.q}</summary>
                                    <p style={{ marginTop: '0.5rem', color: '#555' }}>{item.a}</p>
                                </details>
                            ))}
                        </div>
                    </div>

                </div>
            </section>
        </div>
    )
}
