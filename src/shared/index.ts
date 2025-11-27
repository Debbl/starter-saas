export const X_NEXT_LOCALE = 'x-next-locale'
export const DEFAULT_LOCALE = 'en'
export const SUPPORTED_LOCALES = ['en', 'zh'] as const

export type SupportedLocale = (typeof SUPPORTED_LOCALES)[number]

export type SupportedLocales = typeof SUPPORTED_LOCALES
