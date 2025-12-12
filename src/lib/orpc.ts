import { createORPCClient } from '@orpc/client'
import { RPCLink } from '@orpc/client/fetch'
import { createTanstackQueryUtils } from '@orpc/tanstack-query'
import { getLang } from '~/i18n/helper'
import { X_NEXT_LOCALE } from '~/shared'
import { isBrowser } from './is-browser'
import type { RouterClient } from '@orpc/server'
import type { Router } from '~/server/routes'

const baseUrl = isBrowser ? window.location.origin : 'http://localhost:3000'

const link = new RPCLink({
  url: `${baseUrl}/api`,
  headers: {
    [X_NEXT_LOCALE]: getLang(),
  },
})

const client: RouterClient<Router> = createORPCClient(link)

export const orpc = createTanstackQueryUtils(client)
