import { i18n } from '@lingui/core'
import { os } from '@orpc/server'
import { cache } from 'react'
import { X_NEXT_LOCALE } from '~/shared'
import type { SupportedLocale } from '~/shared'

const getMessage = cache((locale: SupportedLocale) => {
  if (locale === 'zh') {
    return {}
  }
  return {}
})

export const requiredLocaleMiddleware = os
  .$context<{ headers: Headers }>()
  .middleware(async ({ context, next }) => {
    const headers = context.headers
    const locale = (headers.get(X_NEXT_LOCALE) ?? 'en') as 'en' | 'zh'

    i18n.load('en', getMessage(locale))
    i18n.activate('en')

    return next({
      context: {
        locale,
        i18n,
      },
    })
  })
