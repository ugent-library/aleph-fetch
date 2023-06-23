import { type Aleph } from './typings/aleph'
import alephFetch from './util/aleph-fetch'

export async function readItem(barcode: string): Promise<Aleph.ReadItemResponse> {
  return await alephFetch('read-item', { item_barcode: barcode })
}
