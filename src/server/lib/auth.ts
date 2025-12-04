import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
// import Database from 'better-sqlite3'
import { cache } from 'react'
import { env } from '~/env'
import { getDB } from '~/server/db'

const betterAuthConfig: Parameters<typeof betterAuth>[0] = {
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    github: {
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
    },
  },
}

export const getAuth = cache(() => {
  const db = getDB()

  return betterAuth({
    ...betterAuthConfig,
    database: drizzleAdapter(db, {
      provider: 'sqlite',
    }),
  })
})

// only for generate auth-schema.ts
// npx @better-auth/cli@latest generate
// export const auth = betterAuth({
//   ...betterAuthConfig,
//   database: drizzleAdapter(new Database(':memory:'), {
//     provider: 'sqlite',
//   }),
// })
