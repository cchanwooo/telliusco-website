import Link from 'next/link'
import { getDictionary } from '../../../get-dictionary'
import { cities } from '../../../data/cities'
import styles from './page.module.css'

export default async function Locations(props) {
    const params = await props.params;
    const { lang } = params;
    const dictionary = await getDictionary(lang)

    // Group cities by state
    const states = {
        Georgia: cities.filter(c => c.stateCode === 'GA'),
        Alabama: cities.filter(c => c.stateCode === 'AL'),
        Texas: cities.filter(c => c.stateCode === 'TX'),
        Tennessee: cities.filter(c => c.stateCode === 'TN'),
    }

    return (
        <div className="container">
            <section className={styles.hero}>
                <h1 className={styles.title}>{dictionary.locations.title}</h1>
                <p className={styles.subtitle}>{dictionary.locations.subtitle}</p>
                <div style={{ maxWidth: '800px', margin: '0 auto', opacity: 0.9 }}>
                    <p>{dictionary.locations.intro}</p>
                </div>
            </section>

            <div className={styles.stateList}>
                {Object.entries(states).map(([stateName, cityList]) => (
                    <div key={stateName} className={styles.stateSection}>
                        <h2 className={styles.stateTitle}>{stateName}</h2>
                        <div className={styles.cityGrid}>
                            {cityList.map((city) => (
                                <Link
                                    key={city.slug}
                                    href={`/${lang}/locations/${city.stateCode.toLowerCase()}/${city.slug}`}
                                    className={styles.cityCard}
                                >
                                    <span className={styles.cityName}>{city.city}</span>
                                    <span className={styles.arrow}>→</span>
                                </Link>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
