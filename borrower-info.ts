import { type Aleph } from './typings/aleph'
import alephFetch from './util/aleph-fetch'

export async function borrowerInfo(borId: string, hold = true, loans = true): Promise<Aleph.BorrowerInfoResponse> {
  const response = await alephFetch<Aleph.BorrowerInfoResponse>('bor-info', {
    bor_id: borId,
    hold: hold ? 'Y' : 'N',
    loans: loans ? 'Y' : 'N',
    cash: 'N',
  })

  if (hold) {
    response['item-h'] = convertSingleObjectToArray(response['item-h'])
  } else {
    response['item-h'] = undefined
  }

  if (loans) {
    response['item-l'] = convertSingleObjectToArray(response['item-l'])
  } else {
    response['item-l'] = undefined
  }

  return response
}

function convertSingleObjectToArray<T>(objectOrArray: T | T[] | undefined): T[] {
  if (!objectOrArray) {
    return []
  }

  return !Array.isArray(objectOrArray) ? [objectOrArray] : objectOrArray
}
