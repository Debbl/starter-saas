import { toNextJsHandler } from 'better-auth/next-js'
import { getAuth } from '~/lib/auth'

async function handleRequest(request: Request) {
  const auth = getAuth()
  const handler = toNextJsHandler(auth)

  return request.method === 'GET' ? handler.GET(request) : handler.POST(request)
}

export const GET = handleRequest
export const POST = handleRequest
