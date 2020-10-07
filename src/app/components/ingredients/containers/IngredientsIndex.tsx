import LoadingPage from 'app/components/common/LoadingPage'
import React from 'react'
import { Link } from 'react-router-dom'
import { Kitchen } from 'app/models/user'
import { connect } from 'react-redux'
import { ReduxState } from 'reducers'
import { useIngredients } from '../actions'
import TopBar from 'app/components/common/TopBar'
import { IngredientResource } from '../../../resources/IngredientResource'
import ErrorPage from 'app/components/common/ErrorPage'
import { useVendors } from 'app/components/vendors/actions'
import { Vendor } from 'app/models/vendor'
import IngredientCard from '../components/IngredientCard'

interface StateProps {
  currentKitchen?: Kitchen
}

type Props = StateProps

const IngredientsIndex = (props: Props) => {
  const { currentKitchen } = props

  const { ingredientData, ingredientError } = useIngredients(currentKitchen)
  const { vendorData, vendorError } = useVendors(currentKitchen)

  if (vendorError || ingredientError) return <ErrorPage />
  if (!ingredientData || !vendorData) return <LoadingPage />

  const vendorsMap: { [key: number]: Vendor } = vendorData.reduce(
    (map, vendor) => {
      map[vendor.id] = vendor
      return map
    },
    {}
  )

  return (
    <div>
      <TopBar
        items={[
          <Link
            key="edit"
            to={IngredientResource.newPath}
            className="btn btn-primary">
            New Ingredient
          </Link>,
        ]}
      />
      <h1>Ingredients</h1>
      {ingredientData.map((ingredient) => (
        <IngredientCard
          key={ingredient.id}
          ingredient={ingredient}
          vendorsMap={vendorsMap}
        />
      ))}
    </div>
  )
}

const mapStateToProps = (state: ReduxState): StateProps => {
  return {
    currentKitchen: state.auth.currentKitchen,
  }
}

export default connect(mapStateToProps, {})(IngredientsIndex)
