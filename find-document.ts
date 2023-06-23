import { type Aleph } from './typings/aleph'
import alephFetch from './util/aleph-fetch'

export async function findDocument(docNumber: string, base = 'rug01'): Promise<Aleph.FindDocumentResponse> {
  return await alephFetch<Aleph.FindDocumentResponse>('find-doc', {
    doc_number: docNumber,
    base,
  })
}
