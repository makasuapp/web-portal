import { idFromUrl } from 'app/resources/ResourceHelper'
import LoadingPage from 'app/components/common/LoadingPage'
import React from 'react'
import { Link, RouteComponentProps } from 'react-router-dom'
import { Kitchen } from 'app/models/user'
import { connect } from 'react-redux'
import { ReduxState } from 'reducers'
import TopBar from 'app/components/common/TopBar'
import ErrorPage from 'app/components/common/ErrorPage'
import { useIngredientCosts } from 'app/components/ingredients/actions'
import CostCalculator from 'app/utils/CostCalculator'
import RecipeCostCard from '../components/RecipeCostCard'

interface Params {
  id: string
}

interface StateProps {
  currentKitchen?: Kitchen
}

type Props = RouteComponentProps<Params> & StateProps

const RecipeCostShow = (props: Props) => {
  const id = idFromUrl(props)
  const { currentKitchen } = props

  const { costData, costError } = useIngredientCosts(currentKitchen)

  if (costError) return <ErrorPage />
  if (!costData) return <LoadingPage />

  const recipe = costData.recipes.find((recipe) => recipe.id === id)

  if (recipe === undefined) {
    return <ErrorPage />
  }

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
          <Link key="cost" to={'/recipes/cost'} className="btn btn-secondary">
            Back to Costs
          </Link>,
        ]}
      />
      <RecipeCostCard
        recipe={recipe}
        calculator={calculator}
        recipeSteps={costData.recipe_steps}
      />
    </div>
  )
}

const mapStateToProps = (state: ReduxState): StateProps => {
  return {
    currentKitchen: state.auth.currentKitchen,
  }
}

export default connect(mapStateToProps, {})(RecipeCostShow)
