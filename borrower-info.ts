import { type Aleph } from './typings/aleph'
import alephFetch from './util/aleph-fetch'

export async function borrowerInfo(borId: string, hold = true, loans = true): Promise<Aleph.BorrowerInfoResponse> {
  const response = await alephFetch<Aleph.BorrowerInfoResponse>('bor-info', {
    bor_id: borId,
    hold: hold ? 'Y' : 'N',
    loans: loans ? 'Y' : 'N',
    cash: 'N',
  })

  if (hold && !response['item-h']) {
    response['item-h'] = []
  }

  if (loans && !response['item-l']) {
    response['item-l'] = []
  }

  // Force array in case patron has only one item on hold
  if (!Array.isArray(response['item-h'])) {
    response['item-h'] = [response['item-h']]
  }

  // Force array in case patron has only one item on loan
  if (!Array.isArray(response['item-l'])) {
    response['item-l'] = [response['item-l']]
  }

  return response
}
