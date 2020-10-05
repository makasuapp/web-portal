import { Ingredient, Recipe, RecipeStep } from 'app/models/recipe'
import React from 'react'
import StepInputItem from './StepInputItem'
import styles from './RecipeCard.module.css'

interface Props {
  recipe: Recipe
  recipes: Recipe[]
  recipeSteps: RecipeStep[]
  ingredients: Ingredient[]
}

const RecipeCard = ({ recipe, recipes, recipeSteps, ingredients }: Props) => {
  const ingredientsMap: { [key: number]: Ingredient } = ingredients.reduce(
    (map, ingredient) => {
      map[ingredient.id] = ingredient
      return map
    },
    {}
  )
  const recipesMap: { [key: number]: Recipe } = recipes.reduce(
    (map, recipe) => {
      map[recipe.id] = recipe
      return map
    },
    {}
  )

  //TODO: aggregate the ingredients at the top

  return (
    <div>
      <h1>{recipe.name}</h1>
      {recipeSteps.map((recipeStep) => (
        <div key={recipeStep.id} className={styles.step}>
          <div>
            {recipeStep.number} {recipeStep.instruction}
          </div>
          <div>Ingredients:</div>
          {recipeStep.inputs.map((input) => (
            <StepInputItem
              key={input.id}
              stepInput={input}
              recipesMap={recipesMap}
              ingredientsMap={ingredientsMap}
            />
          ))}
        </div>
      ))}
    </div>
  )
}

export default RecipeCard
