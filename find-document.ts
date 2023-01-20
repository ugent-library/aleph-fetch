import alephFetch from './aleph-fetch'

export async function findDocument(docNumber: string, base = 'rug01') {
  return await alephFetch('find-doc', {
    doc_number: docNumber,
    base,
  })
}
