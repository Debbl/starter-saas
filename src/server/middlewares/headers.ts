import { os } from '@orpc/server'
import { headers } from 'next/headers'

export const requiredHeadersMiddleware = os
  .$context()
  .middleware(async ({ next }) => {
    return next({
      context: {
        headers: await headers(),
      },
    })
  })
