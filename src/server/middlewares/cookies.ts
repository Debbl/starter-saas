import { os } from '@orpc/server'
import { cookies } from 'next/headers'

export const requiredCookiesMiddleware = os
  .$context()
  .middleware(async ({ next }) => {
    return next({
      context: {
        cookies: await cookies(),
      },
    })
  })
