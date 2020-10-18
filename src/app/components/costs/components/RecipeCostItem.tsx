import React from 'react'
import { Link } from 'react-router-dom'
import { Recipe } from 'app/models/recipe'
import CostCalculator from 'app/utils/CostCalculator'
import UnitConverter from 'app/utils/UnitConverter'

interface Props {
  recipe: Recipe
  calculator: CostCalculator
}

const RecipeCostItem = ({ recipe, calculator }: Props) => {
  const recipeCost = calculator.getCostForRecipe(recipe.id)
  const isFullyCalculated = calculator.isFullyCalculated(recipe)
  const displayCost = UnitConverter.centsToDisplay(recipeCost)
  const displayAmount =
    recipe.output_qty === 1 && recipe.unit === undefined
      ? displayCost
      : `${displayCost} / ${UnitConverter.qtyToDisplay(
          recipe.output_qty,
          recipe.unit
        )}`

  return (
    <>
      <Link to={`/recipes/${recipe.id}/cost`}>{recipe.name}</Link>:{' '}
      {recipeCost
        ? isFullyCalculated
          ? displayAmount
          : `${displayAmount} (missing ingredient prices)`
        : 'ingredient prices not set'}
    </>
  )
}

export default RecipeCostItem
