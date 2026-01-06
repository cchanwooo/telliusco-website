'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import LanguageSwitcher from './LanguageSwitcher'
import styles from './Header.module.css'

export default function Header({ dictionary, lang }) {
    const [isScrolled, setIsScrolled] = useState(false)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [activeDropdown, setActiveDropdown] = useState(null)
    const pathname = usePathname()

    // Handle sticky header state
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    // Close mobile menu on route change
    useEffect(() => {
        setMobileMenuOpen(false)
        setActiveDropdown(null)
    }, [pathname])

    const toggleDropdown = (name) => {
        if (activeDropdown === name) {
            setActiveDropdown(null)
        } else {
            setActiveDropdown(name)
        }
    }

    return (
        <header className={`${styles.header} ${isScrolled ? styles.sticky : ''}`}>
            <div className={`container ${styles.container}`}>
                {/* Logo */}
                <div className={styles.logo}>
                    <Link href={`/${lang}`}>
                        <Image
                            src="/logo.png"
                            alt="Telliusco"
                            width={200}
                            height={55}
                            className={styles.logoImage}
                            priority
                        />
                    </Link>
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    className={styles.mobileToggle}
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    aria-label="Toggle menu"
                >
                    <span className={mobileMenuOpen ? styles.barOpen : styles.bar}></span>
                    <span className={mobileMenuOpen ? styles.barOpen : styles.bar}></span>
                    <span className={mobileMenuOpen ? styles.barOpen : styles.bar}></span>
                </button>

                {/* Navigation */}
                <nav className={`${styles.nav} ${mobileMenuOpen ? styles.navOpen : ''}`}>
                    <ul className={styles.navList}>
                        {/* Company Dropdown */}
                        <li className={styles.navItem}
                            onMouseEnter={() => { if (window.innerWidth > 992) setActiveDropdown('company') }}
                            onMouseLeave={() => { if (window.innerWidth > 992) setActiveDropdown(null) }}
                        >
                            <button
                                className={styles.navLink}
                                onClick={() => toggleDropdown('company')}
                            >
                                {dictionary.nav.company.title} <span className={styles.arrow}>▼</span>
                            </button>
                            <ul className={`${styles.dropdown} ${activeDropdown === 'company' ? styles.dropdownOpen : ''}`}>
                                <li><Link href={`/${lang}/about`}>{dictionary.nav.company.about}</Link></li>
                                <li><Link href={`/${lang}/safety`}>{dictionary.nav.company.safety}</Link></li>
                                <li><Link href={`/${lang}/testimonials`}>{dictionary.nav.company.testimonials}</Link></li>
                            </ul>
                        </li>

                        {/* Solutions Dropdown */}
                        <li className={styles.navItem}
                            onMouseEnter={() => { if (window.innerWidth > 992) setActiveDropdown('solutions') }}
                            onMouseLeave={() => { if (window.innerWidth > 992) setActiveDropdown(null) }}
                        >
                            <button className={styles.navLink} onClick={() => toggleDropdown('solutions')}>
                                {dictionary.nav.solutions.title} <span className={styles.arrow}>▼</span>
                            </button>
                            <ul className={`${styles.dropdown} ${activeDropdown === 'solutions' ? styles.dropdownOpen : ''}`}>
                                <li><Link href={`/${lang}/hire`}>{dictionary.nav.solutions.overview}</Link></li>
                                <li><Link href={`/${lang}/solutions/temporary`}>{dictionary.nav.solutions.temporary}</Link></li>
                                <li><Link href={`/${lang}/solutions/temp-to-hire`}>{dictionary.nav.solutions.tempToHire}</Link></li>
                                <li><Link href={`/${lang}/solutions/direct-hire`}>{dictionary.nav.solutions.directHire}</Link></li>
                            </ul>
                        </li>

                        {/* Industries Dropdown */}
                        <li className={styles.navItem}
                            onMouseEnter={() => { if (window.innerWidth > 992) setActiveDropdown('industries') }}
                            onMouseLeave={() => { if (window.innerWidth > 992) setActiveDropdown(null) }}
                        >
                            <button className={styles.navLink} onClick={() => toggleDropdown('industries')}>
                                {dictionary.nav.industries.title} <span className={styles.arrow}>▼</span>
                            </button>
                            <ul className={`${styles.dropdown} ${activeDropdown === 'industries' ? styles.dropdownOpen : ''}`}>
                                <li><Link href={`/${lang}/specialties`}>{dictionary.nav.industries.overview}</Link></li>
                                <li><Link href={`/${lang}/specialties/manufacturing`}>{dictionary.nav.industries.manufacturing}</Link></li>
                                <li><Link href={`/${lang}/specialties/warehouse`}>{dictionary.nav.industries.warehouse}</Link></li>
                                <li><Link href={`/${lang}/specialties/clerical`}>{dictionary.nav.industries.clerical}</Link></li>
                                <li><Link href={`/${lang}/specialties/construction`}>{dictionary.nav.industries.construction}</Link></li>
                            </ul>
                        </li>

                        {/* Locations Dropdown */}
                        <li className={styles.navItem}
                            onMouseEnter={() => { if (window.innerWidth > 992) setActiveDropdown('locations') }}
                            onMouseLeave={() => { if (window.innerWidth > 992) setActiveDropdown(null) }}
                        >
                            <button className={styles.navLink} onClick={() => toggleDropdown('locations')}>
                                {dictionary.nav.locations.title} <span className={styles.arrow}>▼</span>
                            </button>
                            <ul className={`${styles.dropdown} ${activeDropdown === 'locations' ? styles.dropdownOpen : ''}`}>
                                <li><Link href={`/${lang}/locations`}>{dictionary.nav.locations.overview}</Link></li>
                                <li><Link href={`/${lang}/locations/ga`}>{dictionary.nav.locations.ga}</Link></li>
                                <li><Link href={`/${lang}/locations/al`}>{dictionary.nav.locations.al}</Link></li>
                                <li><Link href={`/${lang}/locations/tx`}>{dictionary.nav.locations.tx}</Link></li>
                                <li><Link href={`/${lang}/locations/tn`}>{dictionary.nav.locations.tn}</Link></li>
                            </ul>
                        </li>

                        {/* Resources Dropdown */}
                        <li className={styles.navItem}
                            onMouseEnter={() => { if (window.innerWidth > 992) setActiveDropdown('resources') }}
                            onMouseLeave={() => { if (window.innerWidth > 992) setActiveDropdown(null) }}
                        >
                            <button className={styles.navLink} onClick={() => toggleDropdown('resources')}>
                                {dictionary.nav.resources.title} <span className={styles.arrow}>▼</span>
                            </button>
                            <ul className={`${styles.dropdown} ${activeDropdown === 'resources' ? styles.dropdownOpen : ''}`}>
                                <li><Link href={`/${lang}/blog`}>{dictionary.nav.resources.blog}</Link></li>
                            </ul>
                        </li>

                        <li className={styles.navItem}>
                            <Link href={`/${lang}/contact`} className={styles.navLinkSimple}>{dictionary.nav.contact}</Link>
                        </li>
                    </ul>

                    {/* Mobile Actions */}
                    <div className={styles.mobileActions}>
                        <Link href={`/${lang}/apply`} className="btn btn-primary">{dictionary.nav.findWork.apply}</Link>
                        <Link href={`/${lang}/hire`} className="btn btn-accent">{dictionary.nav.requestTalent}</Link>
                        <div className={styles.mobileLang}>
                            <LanguageSwitcher lang={lang} />
                        </div>
                    </div>
                </nav>

                {/* Desktop Actions */}
                <div className={styles.actions}>
                    <LanguageSwitcher lang={lang} />
                    <div className={styles.ctaGroup}>
                        <Link href={`/${lang}/apply`} className={`${styles.ctaBtn} ${styles.ctaApply}`}>
                            {dictionary.nav.findWork.apply}
                        </Link>
                        <Link href={`/${lang}/hire`} className={`${styles.ctaBtn} ${styles.ctaRequest}`}>
                            {dictionary.nav.requestTalent}
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    )
}
