import React from 'react'
import { Ingredient, Recipe, StepInput } from 'app/models/recipe'

interface Props {
  stepInput: StepInput
  recipesMap: { [key: number]: Recipe }
  ingredientsMap: { [key: number]: Ingredient }
}

const StepInputItem = ({ stepInput, recipesMap, ingredientsMap }: Props) => {
  const qtyWithUnit = stepInput.unit
    ? `${stepInput.quantity} ${stepInput.unit}`
    : stepInput.quantity

  if (stepInput.inputable_type === 'Recipe') {
    return (
      <div>
        {qtyWithUnit} {recipesMap[stepInput.inputable_id].name}
      </div>
    )
  } else if (stepInput.inputable_type === 'Ingredient') {
    return (
      <div>
        {qtyWithUnit} {ingredientsMap[stepInput.inputable_id].name}
      </div>
    )
  } else {
    return <div>{stepInput.quantity} Recipe Step</div>
  }
}

export default StepInputItem
