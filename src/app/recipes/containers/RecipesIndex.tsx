import LoadingPage from 'app/common/components/LoadingPage'
import React from 'react'
import { Link } from 'react-router-dom'
import { Kitchen } from 'app/models/user'
import { connect } from 'react-redux'
import { ReduxState } from 'reducers'
import { useRecipes } from '../duck/actions'
import TopBar from 'app/common/components/TopBar'
import { RecipeResource } from '../resource'
import RecipeList from '../components/RecipeList'
import ErrorPage from 'app/common/components/ErrorPage'

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
        ]}
      />
      <RecipeList recipes={recipesData.recipes} />
    </div>
  )
}

const mapStateToProps = (state: ReduxState): StateProps => {
  return {
    currentKitchen: state.auth.currentKitchen,
  }
}

export default connect(mapStateToProps, {})(RecipesIndex)