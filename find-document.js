import alephFetch from './aleph-fetch.js'

export async function findDocument(docNumber, base = 'rug01') {
  return await alephFetch('find-doc', {
    doc_number: docNumber,
    base,
  })
}
