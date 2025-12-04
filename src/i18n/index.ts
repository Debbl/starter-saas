import { linguiConfig } from './config'
import { getAllI18nInstances } from './load'
import type { I18n } from '@lingui/core'
import type { SupportedLocale } from '~/shared'

export const { locales, sourceLocale } = linguiConfig

export async function getI18nInstance(locale?: SupportedLocale): Promise<I18n> {
  const allI18nInstances = await getAllI18nInstances()

  const realLocale = (locale ?? sourceLocale) as SupportedLocale

  if (!allI18nInstances[realLocale]) {
    console.warn(`No i18n instance found for locale "${realLocale}"`)
  }
  return allI18nInstances[realLocale]!
}

export async function generateMetadataWithI18n(
  params: Promise<{ locale: SupportedLocale }>,
) {
  const { locale } = await params

  const i18n = await getI18nInstance(locale)

  return i18n
}
