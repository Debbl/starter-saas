import Database from 'better-sqlite3'
import { drizzle } from 'drizzle-orm/better-sqlite3'
import { cache } from 'react'
import { env } from '~/env'
import * as schema from './schema'

export const getDB = cache(() => {
  const client = new Database(env.DB_FILE_NAME, {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    nativeBinding: require('better-sqlite3/build/Release/better_sqlite3.node'),
  })
  return drizzle({ client, schema })
})
