import styles from './Footer.module.css'

export default function Footer({ dictionary }) {
    return (
        <footer className={styles.footer}>
            <div className={`container ${styles.container}`}>
                <div className={styles.top}>
                    <div>
                        <h3>Telliusco Staffing</h3>
                        <p>Reliable. Fast. Local.</p>
                    </div>
                    <div>
                        <h4>{dictionary.footer.statesServed}</h4>
                        <div className={styles.states}>
                            <span>GA</span>
                            <span>AL</span>
                            <span>TX</span>
                            <span>TN</span>
                        </div>
                    </div>
                </div>
                <div className={styles.bottom}>
                    <p>© {new Date().getFullYear()} Telliusco. {dictionary.footer.rights} | Equal Opportunity Employer</p>
                    <div className={styles.links}>
                        {/* Placeholders */}
                        <span>{dictionary.footer.privacy}</span>
                        <span>{dictionary.footer.terms}</span>
                    </div>
                </div>
            </div>
        </footer>
    )
}
