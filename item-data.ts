import alephFetch from './aleph-fetch'

export async function itemData(docNumber: string) {
  return await alephFetch(
    'item-data',
    {
      base: 'rug01',
      doc_number: docNumber,
    },
    true
  )
}
