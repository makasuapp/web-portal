import LoadingPage from 'app/common/components/LoadingPage'
import React from 'react'
import { Kitchen } from 'app/models/user'
import { connect } from 'react-redux'
import { ReduxState } from 'reducers'
import { useRecipes } from '../duck/actions'
import ErrorPage from 'app/common/components/ErrorPage'
import RecipeForm from './RecipeForm'

interface StateProps {
  currentKitchen?: Kitchen
}

type Props = StateProps

const RecipeCreate = (props: Props) => {
  const { currentKitchen } = props

  const { recipesData, recipesError } = useRecipes(currentKitchen)

  if (recipesError) return <ErrorPage />
  if (!recipesData) return <LoadingPage />

  return (
    <RecipeForm
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

export default connect(mapStateToProps, {})(RecipeCreate)
