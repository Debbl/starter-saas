import { linguiConfig } from '~/i18n/config'
import './styles/index.css'
import type { Metadata } from 'next'
import type { PropsWithChildren } from 'react'

export const metadata: Metadata = {
  alternates: {
    canonical: '/',
    languages: Object.fromEntries(
      linguiConfig.locales.map((locale) => [locale, `/${locale}`]),
    ),
  },
}

export default function Layout({ children }: PropsWithChildren) {
  return children
}
