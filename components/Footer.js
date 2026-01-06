import Link from 'next/link'
import Image from 'next/image'
import styles from './Footer.module.css'

export default function Footer({ dictionary }) {
    const currentYear = new Date().getFullYear();

    return (
        <footer className={styles.footer}>
            <div className={`container ${styles.container}`}>
                <div className={styles.grid}>
                    {/* Brand Column */}
                    <div className={styles.col}>
                        <div className={styles.logo}>
                            <strong>Telliusco Staffing</strong>
                        </div>
                        <p className={styles.tagline}>Reliable. Fast. Local.</p>
                        <address className={styles.address}>
                            Corporate Inquiries:<br />
                            <a href="tel:4047169911">404-716-9911</a>
                        </address>
                        <div className={styles.socials}>
                            {/* Icons would go here */}
                        </div>
                    </div>

                    {/* Solutions Column */}
                    <div className={styles.col}>
                        <h4>{dictionary.nav.solutions.title}</h4>
                        <ul>
                            <li><Link href="/en/hire">{dictionary.nav.solutions.temporary}</Link></li>
                            <li><Link href="/en/hire">{dictionary.nav.solutions.tempToHire}</Link></li>
                            <li><Link href="/en/hire">{dictionary.nav.solutions.directHire}</Link></li>
                            <li><Link href="/en/hire">{dictionary.nav.solutions.managed}</Link></li>
                        </ul>
                    </div>

                    {/* Industries Column */}
                    <div className={styles.col}>
                        <h4>{dictionary.nav.industries.title}</h4>
                        <ul>
                            <li><Link href="/en/specialties/manufacturing">{dictionary.nav.industries.manufacturing}</Link></li>
                            <li><Link href="/en/specialties/warehouse">{dictionary.nav.industries.warehouse}</Link></li>
                            <li><Link href="/en/specialties/clerical">{dictionary.nav.industries.clerical}</Link></li>
                            <li><Link href="/en/specialties/construction">{dictionary.nav.industries.construction}</Link></li>
                        </ul>
                    </div>

                    {/* Quick & Legal */}
                    <div className={styles.col}>
                        <h4>{dictionary.footer.quickLinks}</h4>
                        <ul>
                            <li><Link href="/en/apply">{dictionary.nav.findWork.apply}</Link></li>
                            <li><Link href="/en/locations">{dictionary.nav.locations.overview}</Link></li>
                            <li><Link href="/en/about">{dictionary.nav.company.about}</Link></li>
                            <li><Link href="/en/contact">{dictionary.nav.contact}</Link></li>
                        </ul>
                    </div>
                </div>

                <div className={styles.bottom}>
                    <p>© {currentYear} Telliusco. {dictionary.footer.rights}</p>
                    <div className={styles.legal}>
                        <Link href="/en/privacy">{dictionary.footer.privacy}</Link>
                        <Link href="/en/terms">{dictionary.footer.terms}</Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}
