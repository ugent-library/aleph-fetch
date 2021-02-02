import alephFetch from './aleph-fetch'

export async function readItem(barcode) {
  return await alephFetch('read-item', { item_barcode: barcode })
}
