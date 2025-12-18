'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { i18n } from '../get-dictionary'
import styles from './LanguageSwitcher.module.css'

export default function LanguageSwitcher({ lang }) {
    const pathName = usePathname()

    const redirectedPathName = (locale) => {
        if (!pathName) return '/'
        const segments = pathName.split('/')
        segments[1] = locale
        return segments.join('/')
    }

    return (
        <div className={styles.switcher}>
            {i18n.locales.map((locale) => {
                // Simple flag mapping
                const flag = locale === 'en' ? '🇺🇸' : locale === 'es' ? '🇪🇸' : '🇰🇷'
                const label = locale.toUpperCase()
                const isActive = lang === locale

                return (
                    <Link
                        key={locale}
                        href={redirectedPathName(locale)}
                        className={`${styles.link} ${isActive ? styles.active : ''}`}
                        aria-label={`Switch to ${label}`}
                    >
                        {label}
                    </Link>
                )
            })}
        </div>
    )
}
