import React from 'react'
import AppRoute, { ProtectionType } from 'app/common/AppRoute'
import RecipesIndex from '../recipes/containers/RecipesIndex'
import RecipeShow from '../recipes/containers/RecipeShow'
import RecipeEdit from '../recipes/containers/RecipeEdit'
import RecipeCreate from '../recipes/containers/RecipeCreate'
import { RecipeResource } from 'app/recipes/resource'

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
