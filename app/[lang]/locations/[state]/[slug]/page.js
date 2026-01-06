import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getDictionary } from '../../../../../get-dictionary'
import { getCityBySlug, cities } from '../../../../../data/cities'
import styles from './page.module.css'

export async function generateStaticParams() {
    return cities.map((city) => ({
        lang: 'en',
        state: city.stateCode.toLowerCase(),
        slug: city.slug,
    }))
}

export async function generateMetadata(props) {
    const params = await props.params;
    const dictionary = await getDictionary(params.lang)
    const t = dictionary.cityPage
    const cityData = getCityBySlug(params.slug)

    if (!cityData) return {}

    // Helper to replace variables
    const r = (text) => text.replace(/{city}/g, cityData.city).replace(/{state}/g, cityData.stateData || cityData.stateCode)

    return {
        title: r(t.heroTitle) + " | Telliusco",
        description: r(t.heroSubtitle),
        alternates: {
            canonical: `/locations/${params.state}/${params.slug}`,
        },
        openGraph: {
            title: r(t.heroTitle),
            description: r(t.heroSubtitle),
            type: 'website',
        }
    }
}

export default async function CityPage(props) {
    const params = await props.params;
    const { lang, state, slug } = params;
    const dictionary = await getDictionary(lang)
    const cityData = getCityBySlug(slug)
    const t = dictionary.cityPage

    if (!cityData) {
        notFound()
    }

    // Helper to replace variables
    const r = (text) => text.replace(/{city}/g, cityData.city).replace(/{state}/g, cityData.stateData || cityData.stateCode)

    // Schema Data
    const schemaData = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "BreadcrumbList",
                "itemListElement": [
                    { "@type": "ListItem", "position": 1, "name": "Home", "item": `https://telliusco.com/${lang}` },
                    { "@type": "ListItem", "position": 2, "name": "Locations", "item": `https://telliusco.com/${lang}/locations` },
                    { "@type": "ListItem", "position": 3, "name": cityData.state, "item": `https://telliusco.com/${lang}/locations/${state}` },
                    { "@type": "ListItem", "position": 4, "name": cityData.city, "item": `https://telliusco.com/${lang}/locations/${state}/${slug}` }
                ]
            },
            {
                "@type": "LocalBusiness",
                "name": `Telliusco Staffing - ${cityData.city}`,
                "image": "https://telliusco.com/logo.png",
                "telephone": dictionary.contactInfo.phone,
                "url": `https://telliusco.com/${lang}/locations/${state}/${slug}`,
                "address": {
                    "@type": "PostalAddress",
                    "addressLocality": cityData.city,
                    "addressRegion": cityData.stateCode,
                    "addressCountry": "US"
                },
                "areaServed": {
                    "@type": "City",
                    "name": cityData.city
                },
                "priceRange": "$$"
            },
            {
                "@type": "FAQPage",
                "mainEntity": [
                    {
                        "@type": "Question",
                        "name": r(t.faq.q1),
                        "acceptedAnswer": { "@type": "Answer", "text": r(t.faq.a1) }
                    },
                    {
                        "@type": "Question",
                        "name": r(t.faq.q2),
                        "acceptedAnswer": { "@type": "Answer", "text": r(t.faq.a2) }
                    },
                    {
                        "@type": "Question",
                        "name": r(t.faq.q3),
                        "acceptedAnswer": { "@type": "Answer", "text": r(t.faq.a3) }
                    },
                    {
                        "@type": "Question",
                        "name": r(t.faq.q4),
                        "acceptedAnswer": { "@type": "Answer", "text": r(t.faq.a4) }
                    },
                    {
                        "@type": "Question",
                        "name": r(t.faq.q5),
                        "acceptedAnswer": { "@type": "Answer", "text": r(t.faq.a5) }
                    },
                    {
                        "@type": "Question",
                        "name": r(t.faq.q6),
                        "acceptedAnswer": { "@type": "Answer", "text": r(t.faq.a6) }
                    }
                ]
            }
        ]
    }

    return (
        <div className={styles.container}>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
            />

            {/* HERO SECTION */}
            <section className={styles.hero}>
                <div className="container">
                    <h1 className={styles.heroTitle}>{r(t.heroTitle)}</h1>
                    <p className={styles.heroSubtitle}>{r(t.heroSubtitle)}</p>
                    <div className={styles.ctaGroup}>
                        <Link href={`/${lang}/apply`} className="btn btn-primary btn-lg">{t.sectionA.step1}</Link>
                        <Link href={`/${lang}/hire`} className="btn btn-accent btn-lg">{dictionary.nav.requestTalent}</Link>
                    </div>
                </div>
            </section>

            {/* SECTION A — JOB SEEKERS */}
            <section className={styles.sectionA}>
                <div className="container">
                    <div className={styles.splitContent}>
                        <div className={styles.jobText}>
                            <h2>{r(t.sectionA.title)}</h2>
                            <p>{r(t.sectionA.desc)}</p>

                            <div className={styles.processSteps}>
                                <div className={styles.step}>
                                    <span className={styles.stepNum}>1</span>
                                    <span>{t.sectionA.step1}</span>
                                </div>
                                <div className={styles.step}>
                                    <span className={styles.stepNum}>2</span>
                                    <span>{t.sectionA.step2}</span>
                                </div>
                                <div className={styles.step}>
                                    <span className={styles.stepNum}>3</span>
                                    <span>{t.sectionA.step3}</span>
                                </div>
                            </div>

                            <p><strong>{t.sectionA.microCopy}</strong></p>
                            <p className={styles.note}>{t.sectionA.note}</p>
                        </div>

                        <div className={styles.categories}>
                            <h3>{dictionary.nav.industries.overview}</h3>
                            <ul>
                                <li>{dictionary.nav.industries.clerical}</li>
                                <li>{dictionary.nav.industries.warehouse}</li>
                                <li>{dictionary.nav.industries.manufacturing}</li>
                                <li>{dictionary.nav.industries.construction}</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTION B — EMPLOYERS */}
            <section className={styles.sectionB}>
                <div className="container">
                    <h2>{r(t.sectionB.title)}</h2>
                    <p className={styles.problemText}>{r(t.sectionB.problem)}</p>

                    <div className={styles.cardGrid}>
                        <div className={styles.card}>
                            <h3>{t.sectionB.services.temp}</h3>
                            <p>{t.sectionB.services.tempDesc}</p>
                        </div>
                        <div className={styles.card}>
                            <h3>{t.sectionB.services.tempHire}</h3>
                            <p>{t.sectionB.services.tempHireDesc}</p>
                        </div>
                        <div className={styles.card}>
                            <h3>{t.sectionB.services.direct}</h3>
                            <p>{t.sectionB.services.directDesc}</p>
                        </div>
                    </div>

                    <div className={styles.trustIndicators}>
                        <span className={styles.check}>✓ {t.sectionB.indicators.fast}</span>
                        <span className={styles.check}>✓ {t.sectionB.indicators.screened}</span>
                        <span className={styles.check}>✓ {t.sectionB.indicators.safety}</span>
                    </div>
                </div>
            </section>

            {/* SECTION C — CTA STRIP */}
            <section className={styles.sectionC}>
                <div className="container">
                    <h2>{r(t.sectionC.title)}</h2>
                    <div className={styles.ctaGroup}>
                        <Link href={`/${lang}/apply`} className="btn btn-primary">{t.sectionA.step1}</Link>
                        <Link href={`/${lang}/hire`} className="btn btn-accent">{dictionary.nav.requestTalent}</Link>
                    </div>
                </div>
            </section>

            {/* SECTION D — LOCAL OFFICE INFO */}
            <section className={styles.sectionD}>
                <div className="container">
                    <div className={styles.officeBox}>
                        <h3>Telliusco {cityData.city}</h3>
                        <p>📍 {cityData.city}, {cityData.stateCode} {t.sectionD.pending}</p>
                        <p>{t.sectionD.call} {dictionary.contactInfo.phone}</p>
                        <p>✉️ {cityData.slug.split('-')[0]}@telliusco.com</p>
                    </div>
                </div>
            </section>

            {/* SECTION E — FAQ */}
            <section className={styles.sectionE}>
                <div className="container">
                    <h2>FAQ</h2>
                    <div className={styles.faqGrid}>
                        <details><summary>{r(t.faq.q1)}</summary><p>{r(t.faq.a1)}</p></details>
                        <details><summary>{r(t.faq.q2)}</summary><p>{r(t.faq.a2)}</p></details>
                        <details><summary>{r(t.faq.q3)}</summary><p>{r(t.faq.a3)}</p></details>
                        <details><summary>{r(t.faq.q4)}</summary><p>{r(t.faq.a4)}</p></details>
                        <details><summary>{r(t.faq.q5)}</summary><p>{r(t.faq.a5)}</p></details>
                        <details><summary>{r(t.faq.q6)}</summary><p>{r(t.faq.a6)}</p></details>
                    </div>
                </div>
            </section>
        </div>
    )
}
