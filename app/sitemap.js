import { cities } from '../data/cities'

export default function sitemap() {
    const baseUrl = 'https://telliusco.com'
    const languages = ['en', 'es', 'kr']

    // Static routes
    const routes = [
        '',
        '/about',
        '/apply',
        '/hire',
        '/contact',
        '/locations',
        '/specialties',
        '/safety',
        '/testimonials',
        '/blog' // Assuming we create this
    ]

    let urls = []

    languages.forEach(lang => {
        // Add static routes
        routes.forEach(route => {
            urls.push({
                url: `${baseUrl}/${lang}${route}`,
                lastModified: new Date(),
                changeFrequency: 'weekly',
                priority: route === '' ? 1 : 0.8,
            })
        })

        // Add State Pages
        const states = ['ga', 'al', 'tx', 'tn']
        states.forEach(state => {
            urls.push({
                url: `${baseUrl}/${lang}/locations/${state}`,
                lastModified: new Date(),
                changeFrequency: 'weekly',
                priority: 0.8,
            })
        })

        // Add City Pages
        cities.forEach(city => {
            urls.push({
                url: `${baseUrl}/${lang}/locations/${city.stateCode.toLowerCase()}/${city.slug}`,
                lastModified: new Date(),
                changeFrequency: 'weekly',
                priority: 0.7,
            })
        })
    })

    return urls
}
