import { idFromUrl } from 'app/resources/ResourceHelper'
import LoadingPage from 'app/components/common/LoadingPage'
import React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { Kitchen } from 'app/models/user'
import { connect } from 'react-redux'
import { ReduxState } from 'reducers'
import { useRecipe, useRecipes } from '../actions'
import ErrorPage from 'app/components/common/ErrorPage'
import RecipeForm from '../components/RecipeForm'

interface Params {
  id: string
}

interface StateProps {
  currentKitchen?: Kitchen
}

type Props = RouteComponentProps<Params> & StateProps

const RecipeEdit = (props: Props) => {
  const id = idFromUrl(props)
  const { currentKitchen } = props

  const { recipeData, recipeError } = useRecipe(id, currentKitchen)
  const { recipesData, recipesError } = useRecipes(currentKitchen)

  if (recipeError || recipesError) return <ErrorPage />
  if (!recipeData || !recipesData) return <LoadingPage />

  return (
    <RecipeForm
      initialValues={Object.assign({}, recipeData.recipe, {
        recipe_steps: recipeData.recipe_steps,
      })}
      handleSubmit={(values, actions) => {
        console.log(values)
        actions.setSubmitting(false)
      }}
      recipes={recipesData.recipes}
      ingredients={recipesData.ingredients}
    />
  )
}

const mapStateToProps = (state: ReduxState): StateProps => {
  return {
    currentKitchen: state.auth.currentKitchen,
  }
}

export default connect(mapStateToProps, {})(RecipeEdit)
