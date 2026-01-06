import { i18n } from '../../get-dictionary'
import '../globals.css'
import { Inter } from 'next/font/google'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { getDictionary } from '../../get-dictionary'
import Script from 'next/script'

// Setup Inter font
const inter = Inter({ subsets: ['latin'] })

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }))
}

export const metadata = {
  title: {
    template: '%s | Telliusco Staffing',
    default: 'Telliusco Staffing',
  },
  description: 'Reliable Staffing Across the Southeast - Georgia, Alabama, Texas, Tennessee',
  openGraph: {
    type: 'website',
    siteName: 'Telliusco Staffing',
    title: 'Telliusco Staffing',
    description: 'Reliable Staffing Across the Southeast - Georgia, Alabama, Texas, Tennessee',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Telliusco Staffing',
    description: 'Reliable Staffing Across the Southeast - Georgia, Alabama, Texas, Tennessee',
  },
}

export default async function RootLayout(props) {
  const params = await props.params;
  const { lang } = params;
  const { children } = props;
  const dictionary = await getDictionary(lang)

  return (
    <html lang={params.lang}>
      <body className={inter.className}>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-J2XBDXBCEW"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-J2XBDXBCEW');
          `}
        </Script>
        <Header dictionary={dictionary} lang={params.lang} />
        <main>{children}</main>
        <Footer dictionary={dictionary} />
      </body>
    </html>
  )
}
