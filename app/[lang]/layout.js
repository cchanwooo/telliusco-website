import { i18n } from '../../get-dictionary'
import '../globals.css'
import { Inter } from 'next/font/google'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { getDictionary } from '../../get-dictionary'

// Setup Inter font
const inter = Inter({ subsets: ['latin'] })

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }))
}

export const metadata = {
  title: 'Telliusco Staffing Solutions',
  description: 'Reliable Staffing Solutions Across the Southeast - Georgia, Alabama, Texas, Tennessee',
}

export default async function RootLayout(props) {
  const params = await props.params;
  const { lang } = params;
  const { children } = props;
  const dictionary = await getDictionary(lang)

  return (
    <html lang={params.lang}>
      <body className={inter.className}>
        <Header dictionary={dictionary} lang={params.lang} />
        <main>{children}</main>
        <Footer dictionary={dictionary} />
      </body>
    </html>
  )
}
