import alephFetch from './util/aleph-fetch'

export async function holdRequest(borId: string, barcode: string) {
  return await alephFetch('hold-req', {
    bor_id: borId,
    item_barcode: barcode,
  })
}
