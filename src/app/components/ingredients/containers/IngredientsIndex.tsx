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
import { resourcesToMap } from 'app/resources/ResourceHelper'

interface StateProps {
  currentKitchen?: Kitchen
}

type Props = StateProps

const IngredientsIndex = (props: Props) => {
  const { currentKitchen } = props

  const { ingredientsData, ingredientsError } = useIngredients(currentKitchen)
  const { vendorData, vendorError } = useVendors(currentKitchen)

  if (vendorError || ingredientsError) return <ErrorPage />
  if (!ingredientsData || !vendorData) return <LoadingPage />

  const vendorsMap: { [key: number]: Vendor } = resourcesToMap(vendorData)

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
      {ingredientsData.map((ingredient) => (
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
