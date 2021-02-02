import jstoxml from 'jstoxml'

import alephFetch from './aleph-fetch'

export async function updateItem(docNumber, itemSequence, field, value) {
  const updateItemRequest = {
    'update-item': {
      z30: {
        'z30-doc-number': docNumber,
        'z30-item-sequence': itemSequence,
        [field]: value,
      },
    },
  }

  const response = await alephFetch('update-item', { xml_full_req: jstoxml.toXML(updateItemRequest) }, false, true)

  if (response.error !== 'Item has been updated successfully') {
    throw new Error(response.error)
  } else {
    return response
  }
}
