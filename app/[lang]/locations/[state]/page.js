import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getDictionary } from '../../../../get-dictionary'
import { getCitiesByState, cities } from '../../../../data/cities'
import styles from './page.module.css'

// Generate static params for all states
export async function generateStaticParams() {
    const states = ['ga', 'al', 'tx', 'tn']
    const langs = ['en', 'ko', 'es']

    const params = []
    for (const lang of langs) {
        for (const state of states) {
            params.push({ lang, state })
        }
    }
    return params
}

export async function generateMetadata(props) {
    const params = await props.params;
    const { state } = params;
    const dictionary = await getDictionary(params.lang)

    const stateNames = {
        'ga': 'Georgia',
        'al': 'Alabama',
        'tx': 'Texas',
        'tn': 'Tennessee'
    }

    const stateName = stateNames[state.toLowerCase()]
    if (!stateName) return {}

    return {
        title: `${stateName} Staffing Agency Locations | Telliusco`,
        description: `Find Telliusco staffing agency locations in ${stateName}. We provide temporary, temp-to-hire, and direct hire staffing solutions.`,
        alternates: {
            canonical: `/locations/${state.toLowerCase()}`,
        }
    }
}

export default async function StatePage(props) {
    const params = await props.params;
    const { lang, state } = params;
    const dictionary = await getDictionary(lang)

    // Map state codes to full names
    const stateNames = {
        'ga': 'Georgia',
        'al': 'Alabama',
        'tx': 'Texas',
        'tn': 'Tennessee'
    }

    const stateName = stateNames[state.toLowerCase()]
    if (!stateName) {
        notFound()
    }

    // Get cities for this state
    const stateCities = getCitiesByState(state)

    if (!stateCities || stateCities.length === 0) {
        notFound()
    }

    return (
        <div className="container">
            <section className={styles.hero}>
                <h1 className={styles.title}>
                    {stateName} {dictionary.locations.title}
                </h1>
                <p className={styles.subtitle}>
                    {dictionary.locations.subtitle}
                </p>
            </section>

            <div className={styles.cityList}>
                <h2 className={styles.sectionTitle}>
                    {dictionary.locations.title} in {stateName}
                </h2>
                <div className={styles.cityGrid}>
                    {stateCities.map((city) => (
                        <Link
                            key={city.slug}
                            href={`/${lang}/locations/${state.toLowerCase()}/${city.slug}`}
                            className={styles.cityCard}
                        >
                            <span className={styles.cityName}>{city.city}</span>
                            <span className={styles.arrow}>→</span>
                        </Link>
                    ))}
                </div>
            </div>

            <section className={styles.ctaSection}>
                <h2>{dictionary.home.finalCta.title}</h2>
                <div className={styles.ctaGroup}>
                    <Link href={`/${lang}/apply`} className="btn btn-primary btn-lg">
                        {dictionary.common.applyNow}
                    </Link>
                    <Link href={`/${lang}/hire`} className="btn btn-accent btn-lg">
                        {dictionary.common.requestTalent}
                    </Link>
                </div>
            </section>
        </div>
    )
}
