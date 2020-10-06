import LoadingPage from 'app/common/components/LoadingPage'
import React from 'react'
import { Link } from 'react-router-dom'
import { Kitchen } from 'app/models/user'
import { connect } from 'react-redux'
import { ReduxState } from 'reducers'
import { useVendors } from '../duck/actions'
import TopBar from 'app/common/components/TopBar'
import { VendorResource } from '../resource'
import ErrorPage from 'app/common/components/ErrorPage'

interface StateProps {
  currentKitchen?: Kitchen
}

type Props = StateProps

const RecipesIndex = (props: Props) => {
  const { currentKitchen } = props

  const { vendorData, error } = useVendors(currentKitchen)

  if (error) return <ErrorPage />
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

export default connect(mapStateToProps, {})(RecipesIndex)
