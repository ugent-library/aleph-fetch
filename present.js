import alephFetch from './aleph-fetch.js'

export async function present(setNumber, setEntry) {
  return await alephFetch('present', {
    set_number: setNumber,
    set_entry: setEntry,
  })
}
