import xml2js from 'xml2js'

export default async function alephFetch(
  op: string,
  params: Record<string, string>,
  explicitArray = false,
  ignoreErrors = false
) {
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

  const data = await xml2js.parseStringPromise(body, { explicitArray })

  if (!ignoreErrors && data[op].error) {
    const error = explicitArray ? data[op].error[0] : data[op].error

    throw new Error(error)
  }

  return data[op]
}
