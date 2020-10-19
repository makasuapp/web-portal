import { Recipe, RecipeStep } from 'app/models/recipe'
import React from 'react'
import StepInputItem from './StepInputItem'
import styles from './RecipeCard.module.css'
import { Ingredient } from 'app/models/ingredient'
import { resourcesToMap } from 'app/resources/ResourceHelper'

interface Props {
  recipe: Recipe
  recipes: Recipe[]
  recipeSteps: RecipeStep[]
  ingredients: Ingredient[]
}

const RecipeCard = ({ recipe, recipes, recipeSteps, ingredients }: Props) => {
  const ingredientsMap: { [key: number]: Ingredient } = resourcesToMap(
    ingredients
  )
  const recipesMap: { [key: number]: Recipe } = resourcesToMap(recipes)

  //TODO: aggregate the ingredients at the top

  return (
    <div>
      <h1>{recipe.name}</h1>
      <div>
        Makes: {recipe.output_qty} {recipe.unit}
      </div>
      <div>Steps:</div>
      {recipeSteps
        .sort((a, b) => a.number - b.number)
        .map((recipeStep) => (
          <div key={recipeStep.id} className={styles.step}>
            <div>
              {recipeStep.number}. {recipeStep.instruction}
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
