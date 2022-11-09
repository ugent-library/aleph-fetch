import alephFetch from './aleph-fetch.js'

export async function itemData(docNumber) {
  return await alephFetch(
    'item-data',
    {
      base: 'rug01',
      doc_number: docNumber,
    },
    true
  )
}
