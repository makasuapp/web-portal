import React from 'react'
import { InjectedFormProps, reduxForm } from 'redux-form'
import { Ingredient, Recipe } from 'app/models/recipe'

export const formName = 'recipeForm'

export interface RecipeFormData {}

interface OuterProps {
  recipes: Recipe[]
  ingredients: Ingredient[]
  disabled?: boolean
}

type Props = InjectedFormProps<RecipeFormData, OuterProps> & OuterProps

const RecipeForm = (props: Props) => {
  const { handleSubmit, disabled, recipes, ingredients } = props

  return (
    <form onSubmit={handleSubmit}>
      {recipes.map((recipe) => (
        <div>{recipe.name}</div>
      ))}
      {ingredients.map((ingredient) => (
        <div>{ingredient.name}</div>
      ))}

      <button className="btn btn-primary" type="submit" disabled={disabled}>
        Submit
      </button>
    </form>
  )
}

export default reduxForm<RecipeFormData, OuterProps>({
  form: formName,
})(RecipeForm)
