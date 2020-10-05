import { idFromUrl } from 'app/common/ResourceHelper'
import LoadingPage from 'app/common/components/LoadingPage'
import React from 'react'
import { Link, RouteComponentProps } from 'react-router-dom'
import { Kitchen } from 'app/models/user'
import { connect } from 'react-redux'
import { ReduxState } from 'reducers'
import RecipeCard from '../components/RecipeCard'
import { useRecipe, useRecipes } from '../duck/actions'
import TopBar from 'app/common/components/TopBar'
import { RecipeResource } from '../resource'
import ErrorPage from 'app/common/components/ErrorPage'

interface Params {
  id: string
}

interface StateProps {
  currentKitchen?: Kitchen
}

type Props = RouteComponentProps<Params> & StateProps

const RecipeShow = (props: Props) => {
  const id = idFromUrl(props)
  const { currentKitchen } = props

  const { recipeData, recipeError } = useRecipe(id, currentKitchen)
  const { recipesData, recipesError } = useRecipes(currentKitchen)

  if (recipeError || recipesError) return <ErrorPage />
  if (!recipeData || !recipesData) return <LoadingPage />

  return (
    <div>
      <TopBar
        items={[
          <Link
            key="edit"
            to={RecipeResource.editPath(id)}
            className="btn btn-primary">
            Edit Recipe
          </Link>,
        ]}
      />
      <RecipeCard
        recipes={recipesData.recipes}
        recipe={recipeData.recipe}
        recipeSteps={recipeData.recipe_steps}
        ingredients={recipesData.ingredients}
      />
    </div>
  )
}

const mapStateToProps = (state: ReduxState): StateProps => {
  return {
    currentKitchen: state.auth.currentKitchen,
  }
}

export default connect(mapStateToProps, {})(RecipeShow)