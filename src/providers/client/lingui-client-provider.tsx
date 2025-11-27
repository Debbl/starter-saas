'use client'
import { setupI18n } from '@lingui/core'
import { I18nProvider } from '@lingui/react'
import { useState } from 'react'
import type { Locale, Messages } from '@lingui/core'
import type { SupportedLocales } from '~/shared'

export function LinguiClientProvider({
  locale,
  locales,
  messages,
  children,
}: {
  locale: Locale
  locales: SupportedLocales
  messages: Messages
  children: React.ReactNode
}) {
  const [i18n] = useState(() =>
    setupI18n({
      locale,
      locales: [...locales],
      messages: { [locale]: messages },
    }),
  )

  return <I18nProvider i18n={i18n}>{children}</I18nProvider>
}
