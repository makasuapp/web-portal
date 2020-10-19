import { Recipe, RecipeStep } from 'app/models/recipe'
import React from 'react'
import CostCalculator from 'app/utils/CostCalculator'
import { resourcesToMap } from 'app/resources/ResourceHelper'
import UnitConverter from 'app/utils/UnitConverter'
import RecipeCostItem from './RecipeCostItem'
import { Link } from 'react-router-dom'
import classnames from 'classnames'
import styles from './RecipeCostCard.module.css'

interface Props {
  recipe: Recipe
  recipeSteps: RecipeStep[]
  calculator: CostCalculator
}

const RecipeCostCard = ({ recipe, recipeSteps, calculator }: Props) => {
  const recipeCost = calculator.getCostForRecipe(recipe.id)
  const displayCost = UnitConverter.centsToDisplay(recipeCost)
  const recipeStepsMap: { [key: number]: RecipeStep } = resourcesToMap(
    recipeSteps
  )
  //TODO: aggregate inputs that are the same
  const inputs = recipe.step_ids
    .map((id) => recipeStepsMap[id].inputs)
    .reduce((a, b) => a.concat(b), [])

  return (
    <div>
      <h1>{recipe.name}</h1>
      <div>
        Makes: {recipe.output_qty} {recipe.unit}
      </div>
      {displayCost ? <div>Cost: {displayCost}</div> : null}
      <div>Ingredients:</div>
      {inputs.map((input) => {
        if (input.inputable_type === 'Recipe') {
          //not the best to use map from calculator
          const inputRecipe = calculator.recipesMap[input.inputable_id]
          return (
            <div key={`recipe-${input.id}`}>
              {UnitConverter.qtyToDisplay(input.quantity, input.unit)}{' '}
              <RecipeCostItem
                recipe={inputRecipe}
                calculator={calculator}
                asInput={input}
              />
            </div>
          )
        } else if (input.inputable_type === 'Ingredient') {
          const ingredientCost = calculator.ingredientCostForInput(input)
          let price = 'price not set'
          if (ingredientCost !== undefined) {
            //not the best to use map from calculator
            const ingredient = calculator.ingredientsMap[input.inputable_id]
            const costOfInput = calculator.costOfInput(
              input,
              ingredientCost.price_cents,
              ingredientCost.got_qty,
              ingredientCost.got_unit,
              ingredient.volume_weight_ratio
            )
            price = `${UnitConverter.centsToDisplay(
              costOfInput
            )} (${UnitConverter.centsToDisplay(
              ingredientCost.price_cents
            )} / ${UnitConverter.qtyToDisplay(
              ingredientCost.got_qty,
              ingredientCost.got_unit
            )})`
          }

          return (
            <div key={`ingredient-${input.id}`}>
              {UnitConverter.qtyToDisplay(input.quantity, input.unit)}{' '}
              {input.name}: {price}
              <Link
                to={`/ingredients/${input.inputable_id}/cost`}
                className={classnames('btn btn-secondary', styles.link)}>
                Set Cost
              </Link>
            </div>
          )
        } else {
          return null
        }
      })}
    </div>
  )
}

export default RecipeCostCard
