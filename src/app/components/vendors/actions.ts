import useSWR from 'swr'
import { fetcher } from 'app/utils/fetcher'
import { Kitchen } from 'app/models/user'
import { Vendor } from 'app/models/vendor'
import { VendorResource } from 'app/resources/VendorResource'

export const useVendors = (currentKitchen?: Kitchen) => {
  const { data, error, mutate } = useSWR(
    currentKitchen
      ? VendorResource.indexUrl({ kitchen_id: currentKitchen.id })
      : null,
    fetcher
  )

  const vendorData: Vendor[] = data

  return {
    vendorData,
    error,
    mutate,
  }
}
