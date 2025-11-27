import { setI18n } from '@lingui/react/server'
import { domMax, LazyMotion } from 'motion/react'
import { ThemeProvider } from 'next-themes'
import { getI18nInstance } from '~/i18n'
import { LinguiClientProvider } from './client/lingui-client-provider'
import { QueryClientProvider } from './client/query-client-provider'
import type { SupportedLocale, SupportedLocales } from '~/shared'

export async function Providers({
  locale,
  children,
}: {
  locale: SupportedLocale
  children: React.ReactNode
}) {
  const i18n = await getI18nInstance(locale)
  setI18n(i18n)

  return (
    <ThemeProvider
      attribute='class'
      defaultTheme='system'
      enableSystem
      disableTransitionOnChange
    >
      <LinguiClientProvider
        locale={i18n.locale}
        locales={i18n.locales as unknown as SupportedLocales}
        messages={i18n.messages}
      >
        <QueryClientProvider>
          <LazyMotion strict features={domMax}>
            {children}
          </LazyMotion>
        </QueryClientProvider>
      </LinguiClientProvider>
    </ThemeProvider>
  )
}
