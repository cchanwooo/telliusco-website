import Link from 'next/link'
import Image from 'next/image'
import LanguageSwitcher from './LanguageSwitcher'
import styles from './Header.module.css'

export default function Header({ dictionary, lang }) {
    return (
        <header className={styles.header}>
            <div className={`container ${styles.container}`}>
                <div className={styles.logo}>
                    <Link href={`/${lang}`}>
                        <Image
                            src="/logo.png"
                            alt="Telliusco"
                            width={220}
                            height={60}
                            className={styles.logoImage}
                            priority
                        />
                    </Link>
                </div>

                <nav className={styles.nav}>
                    <ul className={styles.navList}>
                        <li><Link href={`/${lang}/apply`}>{dictionary.nav.findWork}</Link></li>
                        <li><Link href={`/${lang}/hire`}>{dictionary.nav.hireTalent}</Link></li>
                        <li><Link href={`/${lang}/specialties`}>{dictionary.nav.specialties}</Link></li>
                        <li><Link href={`/${lang}/locations`}>{dictionary.nav.locations}</Link></li>
                        <li><Link href={`/${lang}/about`}>{dictionary.nav.about}</Link></li>
                        <li><Link href={`/${lang}/contact`}>{dictionary.nav.contact}</Link></li>
                    </ul>
                </nav>

                <div className={styles.actions}>
                    <LanguageSwitcher lang={lang} />
                    <Link href={`/${lang}/apply`} className="btn btn-primary">{dictionary.nav.applyNow}</Link>
                    <Link href={`/${lang}/hire`} className="btn btn-accent">{dictionary.nav.requestTalent}</Link>
                </div>
            </div>
        </header>
    )
}
