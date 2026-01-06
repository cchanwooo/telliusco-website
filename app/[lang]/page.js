import Link from 'next/link'
import styles from './page.module.css'
import { getDictionary } from '../../get-dictionary'

export const metadata = {
  title: 'Telliusco Staffing | Reliable Workers in GA, AL, TX, TN',
  description: 'Leading staffing agency. Solve workforce gaps quickly with screened, reliable workers.',
  openGraph: {
    title: 'Telliusco Staffing',
    description: 'Leading staffing agency serving Georgia, Alabama, Texas, and Tennessee.',
    url: 'https://telliusco.com',
    siteName: 'Telliusco Staffing',
    images: [{ url: '/logo.png' }],
    type: 'website',
  },
}

export default async function Home(props) {
  const params = await props.params;
  const { lang } = params;
  const dictionary = await getDictionary(lang)
  const t = dictionary.home

  return (
    <div className={styles.main}>
      {/* 1. HERO */}
      <section className={styles.hero}>
        <div className="container">
          <div className={styles.heroContent}>
            <h1 className={styles.title}>{t.heroTitle}</h1>
            <p className={styles.subtitle}>{t.heroSubtitle}</p>
            <div className={styles.ctaGroup}>
              <Link href={`/${lang}/apply`} className={`btn btn-primary btn-lg ${styles.heroBtnApply}`}>
                {t.ctaApply}
              </Link>
              <Link href={`/${lang}/hire`} className={`btn btn-accent btn-lg ${styles.heroBtnHire}`}>
                {t.ctaHire}
              </Link>
            </div>

            <div className={styles.trustBadges}>
              <span>✓ E-Verified</span>
              <span>✓ Insured</span>
              <span>✓ Local Experts</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SEGMENTATION (Seeker vs Employer) */}
      <section className={styles.howWeHelp}>
        <div className="container">
          <div className={styles.segmentGrid}>
            <div className={`${styles.segmentCard} ${styles.seekerCard}`}>
              <div className={styles.cardHeader}>
                <h3>{t.howWeHelp.seekerTitle}</h3>
                <div className={styles.icon}>👷</div>
              </div>
              <p>{t.howWeHelp.seekerDesc}</p>
              <Link href={`/${lang}/apply`} className={styles.segmentLink}>
                {dictionary.common.applyNow} &rarr;
              </Link>
            </div>
            <div className={`${styles.segmentCard} ${styles.employerCard}`}>
              <div className={styles.cardHeader}>
                <h3>{t.howWeHelp.employerTitle}</h3>
                <div className={styles.icon}>🏢</div>
              </div>
              <p>{t.howWeHelp.employerDesc}</p>
              <Link href={`/${lang}/hire`} className={styles.segmentLink}>
                {dictionary.common.requestTalent} &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CORE VALUES / WHY US */}
      <section className={styles.featuresSection}>
        <div className="container">
          <h2 className={styles.sectionTitle}>{t.features.title}</h2>
          <div className={styles.featureGrid}>
            <div className={styles.featureItem}>
              <div className={styles.featureIcon}>🛡️</div>
              <h3>{t.features.safety}</h3>
              <p>{t.features.safetyDesc}</p>
            </div>
            <div className={styles.featureItem}>
              <div className={styles.featureIcon}>🤝</div>
              <h3>{t.features.integrity}</h3>
              <p>{t.features.integrityDesc}</p>
            </div>
            <div className={styles.featureItem}>
              <div className={styles.featureIcon}>⚡</div>
              <h3>{t.features.speed}</h3>
              <p>{t.features.speedDesc}</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. SERVICE AREAS */}
      <section className={styles.locationsSection}>
        <div className="container">
          <div className={styles.locationHeader}>
            <h2 className={styles.sectionTitleWhite}>{dictionary.locations.title}</h2>
            <p className={styles.sectionSubtitleWhite}>{dictionary.locations.subtitle}</p>
          </div>
          <div className={styles.stateGrid}>
            <Link href={`/${lang}/locations/ga`} className={styles.stateCard}>
              <span className={styles.stateAbbr}>GA</span>
              <span className={styles.stateName}>Georgia</span>
            </Link>
            <Link href={`/${lang}/locations/al`} className={styles.stateCard}>
              <span className={styles.stateAbbr}>AL</span>
              <span className={styles.stateName}>Alabama</span>
            </Link>
            <Link href={`/${lang}/locations/tx`} className={styles.stateCard}>
              <span className={styles.stateAbbr}>TX</span>
              <span className={styles.stateName}>Texas</span>
            </Link>
            <Link href={`/${lang}/locations/tn`} className={styles.stateCard}>
              <span className={styles.stateAbbr}>TN</span>
              <span className={styles.stateName}>Tennessee</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 5. INDUSTRIES */}
      <section className={styles.industries}>
        <div className="container">
          <h2 className={styles.sectionTitle}>{t.industries.title}</h2>
          <div className={styles.indList}>
            <Link href={`/${lang}/specialties/manufacturing`} className={styles.indItem}>
              {t.industries.mfg} <span>&rarr;</span>
            </Link>
            <Link href={`/${lang}/specialties/warehouse`} className={styles.indItem}>
              {t.industries.warehouse} <span>&rarr;</span>
            </Link>
            <Link href={`/${lang}/specialties/clerical`} className={styles.indItem}>
              {t.industries.office} <span>&rarr;</span>
            </Link>
            <Link href={`/${lang}/specialties/construction`} className={styles.indItem}>
              {t.industries.construction} <span>&rarr;</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 6. TESTIMONIALS */}
      <section className={styles.testimonials}>
        <div className="container">
          <h2 className={styles.sectionTitle}>{t.testimonials.title}</h2>
          <div className={styles.testGrid}>
            <div className={styles.testCard}>
              <p>"{t.testimonials.q1}"</p>
              <div className={styles.testAuthor}>
                <div className={styles.avatar}></div>
                <span>{t.testimonials.a1}</span>
              </div>
            </div>
            <div className={styles.testCard}>
              <p>"{t.testimonials.q2}"</p>
              <div className={styles.testAuthor}>
                <div className={styles.avatar}></div>
                <span>{t.testimonials.a2}</span>
              </div>
            </div>
            <div className={styles.testCard}>
              <p>"{t.testimonials.q3}"</p>
              <div className={styles.testAuthor}>
                <div className={styles.avatar}></div>
                <span>{t.testimonials.a3}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. CTA */}
      <section className={styles.finalCta}>
        <div className="container">
          <h2>{t.finalCta.title}</h2>
          <p>{t.finalCta.subtitle}</p>
          <div className={styles.ctaGroup}>
            <Link href={`/${lang}/apply`} className="btn btn-primary btn-lg">
              {t.ctaApply}
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
