'use client'
import { useLingui } from '@lingui/react/macro'
import { useRouter } from 'next/navigation'
import { linguiConfig } from '~/i18n/config'

export function LangSwitcher() {
  const { i18n } = useLingui()
  const locales = linguiConfig.locales
  const router = useRouter()

  return (
    <select
      value={i18n.locale}
      onChange={(e) => {
        const lang = e.target.value
        if (lang === 'en') {
          router.push('/')
        } else {
          router.push(`/${lang}`)
        }
      }}
    >
      {locales.map((locale) => (
        <option key={locale} value={locale}>
          {locale}
        </option>
      ))}
    </select>
  )
}
