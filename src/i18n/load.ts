import { setupI18n } from '@lingui/core'
import { linguiConfig } from './config'
import type { I18n, Messages } from '@lingui/core'
import type { SupportedLocale } from '~/shared'

async function loadCatalog(locale: SupportedLocale): Promise<{
  [k: string]: Messages
}> {
  const { messages } = await import(`../locales/${locale}/messages.po`)
  return {
    [locale]: messages,
  }
}

type AllI18nInstances = { [K in SupportedLocale]: I18n }

export async function getAllI18nInstances(): Promise<AllI18nInstances> {
  const { locales } = linguiConfig

  const catalogs = await Promise.all(locales.map(loadCatalog))

  return locales.reduce((acc, locale) => {
    const allMessages = catalogs.reduce((acc, oneCatalog) => {
      return { ...acc, ...oneCatalog }
    }, {})

    const messages = allMessages[locale] ?? {}
    const i18n = setupI18n({
      locale,
      locales: [...locales],
      messages: { [locale]: messages },
    })

    return { ...acc, [locale]: i18n }
  }, {} as AllI18nInstances)
}
