import LoadingPage from 'app/components/common/LoadingPage'
import React from 'react'
import { Link } from 'react-router-dom'
import { Kitchen } from 'app/models/user'
import { connect } from 'react-redux'
import { ReduxState } from 'reducers'
import TopBar from 'app/components/common/TopBar'
import { RecipeResource } from 'app/resources/RecipeResource'
import ErrorPage from 'app/components/common/ErrorPage'
import RecipeCostItem from '../components/RecipeCostItem'
import CostCalculator from 'app/utils/CostCalculator'
import { useIngredientCosts } from 'app/components/ingredients/actions'
import RecipeLists from 'app/components/recipes/components/RecipeLists'

interface StateProps {
  currentKitchen?: Kitchen
}

type Props = StateProps

const RecipesCostIndex = (props: Props) => {
  const { currentKitchen } = props

  const { costData, costError } = useIngredientCosts(currentKitchen)

  if (costError) return <ErrorPage />
  if (!costData) return <LoadingPage />

  const calculator = new CostCalculator(
    costData.recipes,
    costData.ingredients,
    costData.costs,
    costData.recipe_steps
  )

  return (
    <div>
      <TopBar
        items={[
          <Link
            key="index"
            to={RecipeResource.indexPath}
            className="btn btn-secondary">
            Back to Index
          </Link>,
        ]}
      />
      <h1>Recipe Costs</h1>
      <RecipeLists
        recipes={costData.recipes}
        item={(recipe) => (
          <div key={recipe.id}>
            <RecipeCostItem recipe={recipe} calculator={calculator} />
          </div>
        )}
      />
    </div>
  )
}

const mapStateToProps = (state: ReduxState): StateProps => {
  return {
    currentKitchen: state.auth.currentKitchen,
  }
}

export default connect(mapStateToProps, {})(RecipesCostIndex)
