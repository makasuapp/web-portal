import React from 'react'

import { Recipe } from 'app/models/recipe'
import { ResourceRecord } from 'app/common/ResourceHelper'
import RecipeItem from './RecipeItem'

interface OuterProps {
  data?: ResourceRecord[]
}

const RecipeList = ({ data = [] }: OuterProps) => {
  const recipes = data as Recipe[]
  const menuItems = recipes.filter((recipe) => recipe.publish)
  const prepRecipes = recipes.filter((recipe) => !recipe.publish)

  return (
    <div>
      <h2>Menu Items</h2>
      {menuItems.map((recipe) => (
        <RecipeItem recipe={recipe} key={recipe.id} />
      ))}
      <h2>Prep Recipes</h2>
      {prepRecipes.map((recipe) => (
        <RecipeItem recipe={recipe} key={recipe.id} />
      ))}
    </div>
  )
}

export default RecipeList
