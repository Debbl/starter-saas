import { RPCHandler } from '@orpc/server/fetch'
import { auth, router } from '~/server'

const handler = new RPCHandler(router)

async function handleRequest(request: Request) {
  const url = new URL(request.url)
  if (url.pathname.startsWith('/api/auth')) {
    const handler = auth.authHandler()

    return request.method === 'GET'
      ? handler.GET(request)
      : handler.POST(request)
  }

  const { response } = await handler.handle(request, {
    prefix: '/api',
  })

  return response ?? new Response('Not found', { status: 404 })
}

export const HEAD = handleRequest
export const GET = handleRequest
export const POST = handleRequest
export const PUT = handleRequest
export const PATCH = handleRequest
export const DELETE = handleRequest
