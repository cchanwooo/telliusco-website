import Link from 'next/link'
import styles from './page.module.css'
import { getDictionary } from '../../get-dictionary'

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
              <Link href={`/${lang}/apply`} className="btn btn-primary btn-lg">
                {t.ctaApply}
              </Link>
              <Link href={`/${lang}/hire`} className="btn btn-accent btn-lg">
                {t.ctaHire}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. HOW WE HELP */}
      <section className={styles.howWeHelp}>
        <div className="container">
          <h2 className={styles.sectionTitle}>{t.howWeHelp.title}</h2>
          <div className={styles.helpGrid}>
            <div className={styles.helpCard}>
              <h3>{t.howWeHelp.seekerTitle}</h3>
              <p>{t.howWeHelp.seekerDesc}</p>
              <Link href={`/${lang}/apply`} className={styles.textLink}>{dictionary.common.applyNow} →</Link>
            </div>
            <div className={styles.helpCard}>
              <h3>{t.howWeHelp.employerTitle}</h3>
              <p>{t.howWeHelp.employerDesc}</p>
              <Link href={`/${lang}/hire`} className={styles.textLink}>{dictionary.common.requestTalent} →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3. INDUSTRIES */}
      <section className={styles.industries}>
        <div className="container">
          <h2 className={styles.sectionTitle}>{t.industries.title}</h2>
          <div className={styles.industryGrid}>
            <div className={styles.indCard}>🏭 {t.industries.mfg}</div>
            <div className={styles.indCard}>📦 {t.industries.warehouse}</div>
            <div className={styles.indCard}>💼 {t.industries.office}</div>
            <div className={styles.indCard}>🚧 {t.industries.construction}</div>
          </div>
        </div>
      </section>

      {/* 4. WHY TELLIUSCO */}
      <section className={styles.whySection}>
        <div className="container">
          <h2 className={styles.sectionTitle}>{t.why.title}</h2>
          <div className={styles.whyGrid}>
            <div className={styles.whyItem}>
              <h3>⚡ {t.why.speed}</h3>
              <p>{t.why.speedDesc}</p>
            </div>
            <div className={styles.whyItem}>
              <h3>🔍 {t.why.screening}</h3>
              <p>{t.why.screeningDesc}</p>
            </div>
            <div className={styles.whyItem}>
              <h3>🛡️ {t.why.safety}</h3>
              <p>{t.why.safetyDesc}</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. LOCATIONS (Existing but updated text) */}
      <section className={styles.statesSection}>
        <div className="container">
          <h2 className={styles.sectionTitle}>{dictionary.locations.title}</h2>
          <p className={styles.sectionSubtitle}>{dictionary.locations.subtitle}</p>
          <div className={styles.stateGrid}>
            <Link href={`/${lang}/locations/ga`} className={styles.stateCard}>
              <h3>Georgia</h3>
            </Link>
            <Link href={`/${lang}/locations/al`} className={styles.stateCard}>
              <h3>Alabama</h3>
            </Link>
            <Link href={`/${lang}/locations/tx`} className={styles.stateCard}>
              <h3>Texas</h3>
            </Link>
            <Link href={`/${lang}/locations/tn`} className={styles.stateCard}>
              <h3>Tennessee</h3>
            </Link>
          </div>
          <div style={{ marginTop: '2rem', textAlign: 'center' }}>
            <Link href={`/${lang}/locations`} className="btn">{dictionary.common.readMore}</Link>
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
              <span>— {t.testimonials.a1}</span>
            </div>
            <div className={styles.testCard}>
              <p>"{t.testimonials.q2}"</p>
              <span>— {t.testimonials.a2}</span>
            </div>
            <div className={styles.testCard}>
              <p>"{t.testimonials.q3}"</p>
              <span>— {t.testimonials.a3}</span>
            </div>
          </div>
        </div>
      </section>

      {/* 7. FINAL CTA */}
      <section className={styles.finalCta}>
        <div className="container">
          <h2>{t.finalCta.title}</h2>
          <p>{t.finalCta.subtitle}</p>
          <div className={styles.ctaGroup}>
            <Link href={`/${lang}/apply`} className="btn btn-primary btn-lg">
              {t.ctaApply}
            </Link>
            <Link href={`/${lang}/hire`} className="btn btn-accent btn-lg">
              {t.ctaHire}
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}
