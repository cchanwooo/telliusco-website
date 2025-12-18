import Link from 'next/link'
import styles from './page.module.css'
import { getDictionary } from '../../../get-dictionary'

export default async function Specialties(props) {
    const params = await props.params;
    const { lang } = params;
    const dictionary = await getDictionary(lang)
    const t = dictionary.specialties

    const specs = [t.mfg, t.warehouse, t.office, t.construction]

    return (
        <div className="container">
            <section className={styles.section}>
                <h1>{t.title}</h1>
                <p className={styles.subtitle}>{t.subtitle}</p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginTop: '3rem' }}>
                    {specs.map((spec, i) => (
                        <div key={i} className={styles.card} style={{ textAlign: 'left', padding: '2rem', background: '#fff', border: '1px solid #eee', borderRadius: '8px' }}>
                            <h3 style={{ color: '#00205B', marginBottom: '1rem' }}>{spec.title}</h3>
                            <p style={{ marginBottom: '1rem' }}>{spec.desc}</p>
                            <p style={{ fontStyle: 'italic', color: '#666', marginBottom: '1.5rem' }}>"{spec.value}"</p>
                            <div className="ctaGroup">
                                <Link href={`/${lang}/hire`} className="btn btn-primary btn-sm">{dictionary.common.requestTalent}</Link>
                            </div>
                        </div>
                    ))}
                </div>

                <div style={{ marginTop: '4rem' }}>
                    <Link href={`/${lang}/apply`} className="btn btn-accent btn-lg">{dictionary.common.applyNow}</Link>
                </div>
            </section>
        </div>
    )
}
