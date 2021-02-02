import alephFetch from './aleph-fetch'

export async function holdRequest(borId, barcode) {
  return await alephFetch('hold-req', {
    bor_id: borId,
    item_barcode: barcode,
  })
}
