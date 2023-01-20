import alephFetch from './aleph-fetch'

export async function find(request: string) {
  return await alephFetch('find', {
    base: 'rug01',
    request,
  })
}
