import React from 'react'
import AppRoute, { ProtectionType } from 'app/components/common/AppRoute'
import RecipesIndex from '../components/recipes/containers/RecipesIndex'
import RecipeShow from '../components/recipes/containers/RecipeShow'
import RecipeEdit from '../components/recipes/containers/RecipeEdit'
import RecipeCreate from '../components/recipes/containers/RecipeCreate'
import { RecipeResource } from 'app/resources/RecipeResource'

const RecipeRoutes = () => (
  <>
    <AppRoute
      path={RecipeResource.indexPath}
      exact
      component={RecipesIndex}
      protection={ProtectionType.Authenticated}
    />
    <AppRoute
      path={RecipeResource.newPath}
      exact
      component={RecipeCreate}
      protection={ProtectionType.Authenticated}
    />
    <AppRoute
      path="/recipes/:id"
      exact
      component={RecipeShow}
      protection={ProtectionType.Authenticated}
    />
    <AppRoute
      path="/recipes/:id/edit"
      exact
      component={RecipeEdit}
      protection={ProtectionType.Authenticated}
    />
  </>
)

export default RecipeRoutes
