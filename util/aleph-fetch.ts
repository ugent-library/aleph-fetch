import xml2js from 'xml2js'
import { type Aleph } from '../typings/aleph'

export default async function alephFetch<TResponse extends Aleph.BaseResponse>(
  op: string,
  params: Record<string, string>,
  explicitArray = false,
  ignoreErrors = false
): Promise<TResponse> | never {
  const url = new URL('X', process.env.ALEPH_HOST)

  params = {
    library: 'rug50',
    ...params,
    op,
  }

  Object.entries(params).forEach(([key, value]) => url.searchParams.append(key, value))

  const response = await fetch(url.toString())
  const body = await response.text()

  if (body.includes('Error 403')) {
    throw new Error(`Cannot reach ALEPH_HOST: ${process.env.ALEPH_HOST}`)
  }

  const data: {
    [key: typeof op]: TResponse
  } = await xml2js.parseStringPromise(body, { explicitArray })
  const result = data[op] as TResponse

  if (!ignoreErrors && result.error) {
    const error = typeof result.error === 'string' ? result.error : result.error[0]

    throw new Error(error)
  }

  return result
}
