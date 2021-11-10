import alephFetch from './aleph-fetch.js'

export async function readItem(barcode) {
  return await alephFetch('read-item', { item_barcode: barcode })
}
