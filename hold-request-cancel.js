import alephFetch from './aleph-fetch'

export async function holdRequestCancel(item) {
  const response = await alephFetch('hold-req-cancel', {
    doc_number: item.z37['z37-doc-number'],
    item_sequence: item.z37['z37-item-sequence'],
    sequence: item.z37['z37-sequence'],
  })

  return response
}
