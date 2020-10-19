import React from 'react'
import { Link } from 'react-router-dom'
import { Recipe, StepInput } from 'app/models/recipe'
import CostCalculator from 'app/utils/CostCalculator'
import UnitConverter from 'app/utils/UnitConverter'

interface Props {
  recipe: Recipe
  asInput?: StepInput
  calculator: CostCalculator
}

const RecipeCostItem = ({ recipe, asInput, calculator }: Props) => {
  const recipeCost = calculator.getCostForRecipe(recipe.id)

  let followup
  if (recipeCost) {
    const displayCost = UnitConverter.centsToDisplay(recipeCost)
    const displayAmount =
      recipe.output_qty === 1 && recipe.unit === undefined
        ? displayCost
        : `${displayCost} / ${UnitConverter.qtyToDisplay(
            recipe.output_qty,
            recipe.unit
          )}`

    if (asInput !== undefined) {
      const costOfInput = calculator.costOfInput(
        asInput,
        recipeCost,
        recipe.output_qty,
        recipe.unit,
        recipe.volume_weight_ratio
      )

      followup = `${UnitConverter.centsToDisplay(
        costOfInput
      )} (${displayAmount})`
    } else {
      followup = displayAmount
    }
    const isFullyCalculated = calculator.isFullyCalculated(recipe)
    if (!isFullyCalculated) {
      followup = `${followup} - missing ingredient prices`
    }
  } else {
    followup = 'ingredient prices not set'
  }
  return (
    <>
      <Link to={`/recipes/${recipe.id}/cost`}>{recipe.name}</Link>: {followup}
    </>
  )
}

export default RecipeCostItem
