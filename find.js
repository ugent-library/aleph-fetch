import alephFetch from './aleph-fetch.js'

export async function find(request) {
  return await alephFetch('find', {
    base: 'rug01',
    request,
  })
}
