import React from 'react'
import { Recipe } from 'app/models/recipe'
import { Form, Formik, FormikHelpers } from 'formik'
import { TextField } from 'app/common/form/components/TextField'
import { Ingredient } from 'app/models/ingredient'

export interface RecipeFormValues {
  name?: string
}

interface OuterProps {
  recipes: Recipe[]
  ingredients: Ingredient[]
  initialValues?: RecipeFormValues
  handleSubmit: (
    values: RecipeFormValues,
    actions: FormikHelpers<RecipeFormValues>
  ) => void
}

const RecipeForm = (props: OuterProps) => {
  const { initialValues, handleSubmit, recipes, ingredients } = props

  //Recipe Name: Input
  //Is this a recipe that shows up on the menu? Checkbox
  //If yes, How many orders does 1 serving of this recipe make? Qty Input
  //Optional What's the price of this menu item?
  //Auto-convert to cents
  //If no, How many servings does this recipe produce? Qty Input + Optional Unit Selector +
  //Optional How many grams is one tablespoon?
  //Add Step
  //Auto-assign number
  //Delete Step Button
  //Instruction: Input
  //Optional: Do this step at most X minutes in advance
  //Optional: Do this step at least X minutes in advance
  //Auto-convert X
  //Add Ingredient
  //Select from dropdown if ingredient or recipe
  //Select from dropdown of existing ingredient/recipe
  //Or add new
  //Add new Ingredient: Name + How many grams is one tablespoon?
  //You'll need this if you convert between weight and volume
  //auto-convert ratio
  //Add new Recipe: open up a new create recipe page

  return (
    <Formik initialValues={initialValues || {}} onSubmit={handleSubmit}>
      {({ isSubmitting }) => (
        <Form>
          <TextField name="name" isRequired label="Recipe Name" />
          {recipes.map((recipe) => (
            <div>{recipe.name}</div>
          ))}
          {ingredients.map((ingredient) => (
            <div>{ingredient.name}</div>
          ))}

          <button
            className="btn btn-primary"
            type="submit"
            disabled={isSubmitting}>
            Submit
          </button>
        </Form>
      )}
    </Formik>
  )
}

export default RecipeForm
