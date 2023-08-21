import { toXML } from 'jstoxml'

import alephFetch from '../util/aleph-fetch'
import { borrowerInfo } from './borrower-info'

export async function updateBorrowerEmail(borId: string, newEmailAddress: string) {
  if (!borId.match(/^PWD\d+$/)) {
    const borInfo = await borrowerInfo(borId, false, false)
    borId = borInfo.z303['z303-id']
  }

  const requestData = {
    'p-file-20': {
      'patron-record': {
        z303: {
          'match-id-type': '00',
          'match-id': borId,
          'record-action': 'X',
        },
        z304: {
          'record-action': 'U',
          'z304-email-address': newEmailAddress,
          'z304-address-type': '01',
        },
      },
    },
  }

  const params = {
    update_flag: 'Y',
    xml_full_req: toXML(requestData),
  }

  const result = await alephFetch('update-bor', params, undefined, true, 'POST')
  if (result.error) {
    const error = typeof result.error === 'string' ? result.error : result.error[0]

    if (error && error !== `Succeeded to REWRITE table z304. cur-id ${borId}.`) {
      throw new Error(error)
    }
  }
}
