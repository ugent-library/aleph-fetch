import jstoxml from 'jstoxml'
import { isPlainObject, chunk } from 'lodash'

import alephFetch from './aleph-fetch'

export async function updateItem(docNumber, itemSequence, ...data) {
  let dataset = null
  if (data.length === 1 && isPlainObject(data[0])) {
    dataset = Object.entries(data[0])
  } else if (data.length % 2 === 0) {
    dataset = chunk(data, 2)
  } else {
    throw new Error('Data argument is invalid. Should be either an object or an even number of arguments.')
  }

  const updateItemRequest = {
    'update-item': {
      z30: {
        'z30-doc-number': docNumber,
        'z30-item-sequence': itemSequence,
      },
    },
  }

  for (let item of dataset) {
    updateItemRequest['update-item']['z30'][item[0]] = item[1]
  }

  const response = await alephFetch('update-item', { xml_full_req: jstoxml.toXML(updateItemRequest) }, false, true)

  if (response.error !== 'Item has been updated successfully') {
    throw new Error(response.error)
  } else {
    return response
  }
}
