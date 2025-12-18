export const i18n = {
    defaultLocale: 'en',
    locales: ['en', 'es', 'kr'],
}

export const getDictionary = async (locale) => {
    const dictionaries = {
        en: () => import('./dictionaries/en.json').then((module) => module.default),
        es: () => import('./dictionaries/es.json').then((module) => module.default),
        kr: () => import('./dictionaries/kr.json').then((module) => module.default),
    }
    return dictionaries[locale]?.() ?? dictionaries.en()
}
