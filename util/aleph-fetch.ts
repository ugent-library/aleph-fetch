import { parseStringPromise } from 'xml2js'
import { type Aleph } from '../typings/aleph'

export default async function alephFetch<TResponse extends Aleph.BaseResponse>(
  op: string,
  params: Record<string, string>,
  explicitArray = false,
  ignoreErrors = false,
  method = 'GET'
): Promise<TResponse | never> {
  const url = new URL('X', process.env.ALEPH_HOST)

  params = {
    op,
    library: 'rug50',
    ...params,
  }

  let requestBody: URLSearchParams | null = null
  const headers: HeadersInit = {}
  if (method === 'POST') {
    requestBody = new URLSearchParams(params)
    headers['Content-Type'] = 'application/x-www-form-urlencoded'
  } else {
    Object.entries(params).forEach(([key, value]) => url.searchParams.append(key, value))
  }

  const response = await fetch(url.toString(), { method, body: requestBody, headers })
  const body = await response.text()

  if (body.includes('Error 403')) {
    throw new Error(`Cannot reach ALEPH_HOST: ${process.env.ALEPH_HOST}`)
  }

  const data: {
    [key: typeof op]: TResponse
  } = await parseStringPromise(body, { explicitArray })
  const result = data[op] as TResponse

  if (!ignoreErrors && result.error) {
    const error = typeof result.error === 'string' ? result.error : result.error[0]

    throw new Error(error)
  }

  return result
}
