import { type Aleph } from './typings/aleph'
import alephFetch from './util/aleph-fetch'

export async function readItem(barcode: string): Promise<Aleph.ReadItemResponse> {
  return await alephFetch('read-item', { item_barcode: barcode })
}

export async function readItemByDocument(doc_number: string, item_sequence: string) {
  return await alephFetch('read-item', { doc_number, item_sequence })
}
