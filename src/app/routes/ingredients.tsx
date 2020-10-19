import React from 'react'
import AppRoute, { ProtectionType } from 'app/components/common/AppRoute'
import IngredientCreate from '../components/ingredients/containers/IngredientCreate'
import IngredientsIndex from '../components/ingredients/containers/IngredientsIndex'
import IngredientEdit from 'app/components/ingredients/containers/IngredientEdit'
import { Switch } from 'react-router-dom'
import { IngredientResource } from 'app/resources/IngredientResource'
import IngredientCostCreate from 'app/components/costs/containers/IngredientCostCreate'

const IngredientsRoutes = () => (
  <Switch>
    <AppRoute
      path={IngredientResource.indexPath}
      exact
      component={IngredientsIndex}
      protection={ProtectionType.Authenticated}
    />
    <AppRoute
      path={IngredientResource.newPath}
      exact
      component={IngredientCreate}
      protection={ProtectionType.Owner}
    />
    <AppRoute
      path="/ingredients/:id/cost"
      exact
      component={IngredientCostCreate}
      protection={ProtectionType.Owner}
    />
    <AppRoute
      path="/ingredients/:id/edit"
      exact
      component={IngredientEdit}
      protection={ProtectionType.Owner}
    />
  </Switch>
)

export default IngredientsRoutes
