import LoadingPage from 'app/components/common/LoadingPage'
import React from 'react'
import { Link } from 'react-router-dom'
import { Kitchen } from 'app/models/user'
import { connect } from 'react-redux'
import { ReduxState } from 'reducers'
import { useRecipes } from '../actions'
import TopBar from 'app/components/common/TopBar'
import { RecipeResource } from 'app/resources/RecipeResource'
import RecipeLists from '../components/RecipeLists'
import ErrorPage from 'app/components/common/ErrorPage'
import RecipeItem from '../components/RecipeItem'

interface StateProps {
  currentKitchen?: Kitchen
}

type Props = StateProps

const RecipesIndex = (props: Props) => {
  const { currentKitchen } = props

  const { recipesData, recipesError } = useRecipes(currentKitchen)

  if (recipesError) return <ErrorPage />
  if (!recipesData) return <LoadingPage />

  return (
    <div>
      <TopBar
        items={[
          <Link
            key="edit"
            to={RecipeResource.newPath}
            className="btn btn-primary">
            New Recipe
          </Link>,
          <Link key="cost" to={'/recipes/cost'} className="btn btn-secondary">
            View Costs
          </Link>,
        ]}
      />
      <RecipeLists
        recipes={recipesData.recipes}
        item={(recipe) => <RecipeItem recipe={recipe} key={recipe.id} />}
      />
    </div>
  )
}

const mapStateToProps = (state: ReduxState): StateProps => {
  return {
    currentKitchen: state.auth.currentKitchen,
  }
}

export default connect(mapStateToProps, {})(RecipesIndex)
