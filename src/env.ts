/* eslint-disable n/prefer-global/process */
import { createEnv } from '@t3-oss/env-core'
import { z } from 'zod'

const isDev = true

export const env = createEnv({
  server: {
    CLOUDFLARE_ACCOUNT_ID: z.string(),
    CLOUDFLARE_DATABASE_ID: z.string(),
    CLOUDFLARE_D1_TOKEN: z.string(),
  },
  runtimeEnv: (() => {
    return process?.env ?? {}
  })(),
  skipValidation: !isDev,
})
