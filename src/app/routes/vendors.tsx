import React from 'react'
import AppRoute, { ProtectionType } from 'app/components/common/AppRoute'
import VendorCreate from '../components/vendors/containers/VendorCreate'
import VendorsIndex from '../components/vendors/containers/VendorsIndex'
import { VendorResource } from 'app/resources/VendorResource'

const VendorRoutes = () => (
  <>
    <AppRoute
      path={VendorResource.indexPath}
      exact
      component={VendorsIndex}
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
