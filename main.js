import 'dotenv/config'
import fetch from 'node-fetch'
import xml2js from 'xml2js-es6-promise'

export default async (op, params, explicitArray = false, ignoreErrors = false) => {
  const url = new URL(`http://${process.env.ALEPH_HOST}.ugent.be/X`)

  params = {
    library: 'rug50',
    ...params,
    op,
  }

  Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))

  const response = await fetch(url)

  const body = await response.text()

  const data = await xml2js(body, { explicitArray })

  if (!ignoreErrors && data[op].error) {
    const error = explicitArray ? data[op].error[0] : data[op].error
    throw Error(error)
  }

  return data[op]
}
