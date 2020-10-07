import LoadingPage from 'app/components/common/LoadingPage'
import React from 'react'
import { Link } from 'react-router-dom'
import { Kitchen } from 'app/models/user'
import { connect } from 'react-redux'
import { ReduxState } from 'reducers'
import { useVendors } from '../actions'
import TopBar from 'app/components/common/TopBar'
import { VendorResource } from '../../../resources/VendorResource'
import ErrorPage from 'app/components/common/ErrorPage'

interface StateProps {
  currentKitchen?: Kitchen
}

type Props = StateProps

const VendorsIndex = (props: Props) => {
  const { currentKitchen } = props

  const { vendorData, vendorError } = useVendors(currentKitchen)

  if (vendorError) return <ErrorPage />
  if (!vendorData) return <LoadingPage />

  return (
    <div>
      <TopBar
        items={[
          <Link
            key="edit"
            to={VendorResource.newPath}
            className="btn btn-primary">
            New Vendor
          </Link>,
        ]}
      />
      <h1>Vendors</h1>
      {vendorData.map((vendor) => (
        <div key={vendor.id}>{vendor.name}</div>
      ))}
    </div>
  )
}

const mapStateToProps = (state: ReduxState): StateProps => {
  return {
    currentKitchen: state.auth.currentKitchen,
  }
}

export default connect(mapStateToProps, {})(VendorsIndex)
