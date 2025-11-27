/* eslint-disable n/prefer-global/process */
import { createEnv } from '@t3-oss/env-core'
import { z } from 'zod'

const isDev = true

export const env = createEnv({
  server: {
    DB_FILE_NAME: z.string(),
    GITHUB_CLIENT_ID: z.string(),
    GITHUB_CLIENT_SECRET: z.string(),
  },
  runtimeEnv: (() => {
    return process?.env ?? {}
  })(),
  skipValidation: !isDev,
})
