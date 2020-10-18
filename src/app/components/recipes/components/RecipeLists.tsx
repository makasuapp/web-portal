import React from 'react'

import { Recipe } from 'app/models/recipe'

interface OuterProps {
  recipes: Recipe[]
  item: (recipe: Recipe) => React.ReactNode
}

const RecipeLists = ({ recipes = [], item }: OuterProps) => {
  const menuItems = recipes.filter((recipe) => recipe.publish)
  const prepRecipes = recipes.filter((recipe) => !recipe.publish)

  return (
    <div>
      <h2>Menu Items</h2>
      {menuItems.map((recipe) => item(recipe))}
      <br />
      <h2>Prep Recipes</h2>
      {prepRecipes.map((recipe) => item(recipe))}
    </div>
  )
}

export default RecipeLists
