import React from 'react'

import { Recipe } from 'app/models/recipe'
import RecipeItem from './RecipeItem'

interface OuterProps {
  recipes: Recipe[]
}

const RecipeList = ({ recipes = [] }: OuterProps) => {
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
