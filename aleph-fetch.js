import fetch from 'node-fetch'
import xml2js from 'xml2js'

export default async function alephFetch(op, params, explicitArray = false, ignoreErrors = false) {
  const url = new URL('X', process.env.ALEPH_HOST)

  params = {
    library: 'rug50',
    ...params,
    op,
  }

  Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))

  const response = await fetch(url)

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
