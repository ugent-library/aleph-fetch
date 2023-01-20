import alephFetch from './aleph-fetch'

export async function readItem(barcode: string) {
  return await alephFetch('read-item', { item_barcode: barcode })
}
