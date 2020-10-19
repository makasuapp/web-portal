import React from 'react'
import AppRoute, { ProtectionType } from 'app/components/common/AppRoute'
import RecipesIndex from '../components/recipes/containers/RecipesIndex'
import RecipeShow from '../components/recipes/containers/RecipeShow'
import RecipeEdit from '../components/recipes/containers/RecipeEdit'
import RecipeCreate from '../components/recipes/containers/RecipeCreate'
import { Switch } from 'react-router-dom'
import { RecipeResource } from 'app/resources/RecipeResource'
import RecipesCostIndex from 'app/components/costs/containers/RecipesCostIndex'
import RecipeCostShow from 'app/components/costs/containers/RecipeCostShow'

const RecipeRoutes = () => (
  <Switch>
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
      path="/recipes/cost"
      exact
      component={RecipesCostIndex}
      protection={ProtectionType.Owner}
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
    <AppRoute
      path="/recipes/:id/cost"
      exact
      component={RecipeCostShow}
      protection={ProtectionType.Owner}
    />
  </Switch>
)

export default RecipeRoutes
