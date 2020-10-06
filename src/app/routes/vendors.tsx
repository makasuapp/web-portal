import React from 'react'
import AppRoute, { ProtectionType } from 'app/common/AppRoute'
import VendorCreate from '../vendors/containers/VendorCreate'
import VendorIndex from '../vendors/containers/VendorIndex'
import { VendorResource } from 'app/vendors/resource'

const VendorRoutes = () => (
  <>
    <AppRoute
      path={VendorResource.indexPath}
      exact
      component={VendorIndex}
      protection={ProtectionType.Authenticated}
    />
    <AppRoute
      path={VendorResource.newPath}
      exact
      component={VendorCreate}
      protection={ProtectionType.Owner}
    />
  </>
)

export default VendorRoutes
