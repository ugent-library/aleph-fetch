import { toXML } from 'jstoxml'
import { isPlainObject, chunk } from 'lodash'

import { type Aleph } from './typings/aleph'
import alephFetch from './util/aleph-fetch'

type UpdateItemRequest = {
  'update-item': {
    z30: Partial<Aleph.Z30>
  }
}

export async function updateItem(docNumber: string, itemSequence: string, ...data: object[] | string[]) {
  let dataset: [string, string][]
  if (data.length === 1 && isPlainObject(data[0])) {
    dataset = Object.entries(data[0] as object)
  } else if (data.length % 2 === 0) {
    dataset = chunk<string>(data as string[], 2) as [string, string][]
  } else {
    throw new Error('Data argument is invalid. Should be either an object or an even number of arguments.')
  }

  const updateItemRequest: UpdateItemRequest = {
    'update-item': {
      z30: {
        'z30-doc-number': docNumber,
        'z30-item-sequence': itemSequence,
      },
    },
  }

  for (let [key, value] of dataset) {
    updateItemRequest['update-item']['z30'][key] = value
  }

  const response = await alephFetch('update-item', { xml_full_req: toXML(updateItemRequest) }, false, true)

  if (response.error) {
    const error = typeof response.error !== 'string' ? response.error[0] : response.error

    if (error !== 'Item has been updated successfully') {
      throw new Error(error)
    }
  }

  return response
}
