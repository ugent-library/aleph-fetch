import alephFetch from '../util/aleph-fetch'

export async function present(setNumber: string, setEntry: string) {
  return await alephFetch('present', {
    set_number: setNumber,
    set_entry: setEntry,
  })
}
