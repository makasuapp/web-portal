import React from 'react'
import * as Yup from 'yup'
import { Recipe, StepInputType } from 'app/models/recipe'
import { FieldArray, Formik, FormikHelpers, useFormikContext } from 'formik'
import { TextField } from 'app/components/common/form/TextField'
import DeleteItemButton from 'app/components/common/form/DeleteItemButton'
import { Ingredient } from 'app/models/ingredient'
import { CheckboxField } from 'app/components/common/form/CheckboxField'
import FormikForm from 'app/components/common/form/Form'
import { SelectField } from 'app/components/common/form/SelectField'
import UnitConverter, { allUnits } from 'app/utils/UnitConverter'
import AddItemButton from 'app/components/common/form/AddItemButton'
import styles from './RecipeForm.module.css'

export interface RecipeFormValues {
  name?: string
  publish?: boolean
  output_qty?: number
  current_price?: number
  unit?: string
  gram_per_tbsp?: number
  recipe_steps: {
    instruction?: string
    max_before_min?: number
    min_before_min?: number
    inputs: {
      inputable_type: StepInputType
      inputable_id?: number
      quantity?: number
      unit?: string
    }[]
  }[]
}

const RecipeSchema = Yup.object().shape({
  name: Yup.string().required('Required'),
  publish: Yup.boolean(),
  output_qty: Yup.number().required('Required'),
  current_price: Yup.number(),
  unit: Yup.string(),
  gram_per_tbsp: Yup.number(),
  recipe_steps: Yup.array().of(
    Yup.object().shape({
      instruction: Yup.string().required('Required'),
      max_before_min: Yup.number(),
      min_before_min: Yup.number(),
      inputs: Yup.array().of(
        Yup.object().shape({
          inputable_type: Yup.string().required('Required'),
          inputable_id: Yup.number().required('Required'),
          quantity: Yup.number().required('Required'),
          unit: Yup.string(),
        })
      ),
    })
  ),
})

interface OuterProps {
  recipes: Recipe[]
  ingredients: Ingredient[]
  initialValues?: RecipeFormValues
  handleSubmit: (
    values: RecipeFormValues,
    actions: FormikHelpers<RecipeFormValues>
  ) => void
}

//TODO(form): when toggle, need to reset the values
const MenuItemToggledFields = () => {
  const {
    values: { publish },
  } = useFormikContext()

  if (publish === true) {
    return (
      <>
        <TextField
          name="output_qty"
          label="How many orders does 1 serving of this recipe make?"
          isRequired
        />
        <TextField
          name="current_price"
          pretext="$"
          customclasses={{
            pretext: styles.dollarSign,
            inputWrapper: styles.dollarInput,
          }}
          label="What's the current price of this menu item?"
        />
      </>
    )
  } else {
    return (
      <>
        <div className={styles.qtyWithUnit}>
          <TextField name="output_qty" label="Serving Size" isRequired />
          <SelectField
            name="unit"
            label="Serving Unit"
            options={UnitConverter.unitOptions(allUnits)}
          />
        </div>
        <TextField
          name="gram_per_tbsp"
          label="How many grams are in a tablespoon of this recipe?"
          subtext="If you convert between volume and weight for this recipe, you'll need this"
        />
      </>
    )
  }
}

interface InputableIdFieldProps {
  recipeStepIndex: number
  inputIndex: number
  recipes: Recipe[]
  ingredients: Ingredient[]
}

//TODO(form): when toggle, need to reset the value
const InputableIdField = ({
  recipeStepIndex,
  inputIndex,
  recipes,
  ingredients,
}: InputableIdFieldProps) => {
  const {
    values: { recipe_steps },
  } = useFormikContext()

  const input = recipe_steps[recipeStepIndex].inputs[inputIndex]
  const inputableType = input.inputable_type

  if (inputableType === 'Ingredient') {
    return (
      <SelectField
        name={`recipe_steps.${recipeStepIndex}.inputs.${inputIndex}.inputable_id`}
        isRequired
        label="Input"
        options={ingredients.map((ingredient) => ({
          value: ingredient.id,
          label: ingredient.name,
        }))}
      />
    )
  } else if (inputableType === 'Recipe') {
    return (
      <SelectField
        name={`recipe_steps.${recipeStepIndex}.inputs.${inputIndex}.inputable_id`}
        isRequired
        label="Input"
        options={recipes.map((recipe) => ({
          value: recipe.id,
          label: recipe.name,
        }))}
      />
    )
  } else {
    return null
  }
}

const emptyRecipeStep = { inputs: [] }

const RecipeForm = (props: OuterProps) => {
  const { initialValues, handleSubmit, recipes, ingredients } = props
  const alphabeticalRecipes = recipes.sort((a, b) => {
    if (a.name < b.name) {
      return -1
    }
    if (a.name > b.name) {
      return 1
    }
    return 0
  })
  const alphabeticalIngredients = ingredients.sort((a, b) => {
    if (a.name < b.name) {
      return -1
    }
    if (a.name > b.name) {
      return 1
    }
    return 0
  })

  //TODO(form): verify there is inputable_id of inputable_type
  //TODO(form): only show units that make sense for recipe
  return (
    <Formik
      initialValues={initialValues || { recipe_steps: [emptyRecipeStep] }}
      validationSchema={RecipeSchema}
      onSubmit={handleSubmit}>
      {({ isSubmitting, values }) => (
        <FormikForm>
          <TextField name="name" isRequired label="Recipe Name" />
          <CheckboxField
            name="publish"
            label="Is this a recipe that shows up on the menu?"
          />
          <MenuItemToggledFields />

          <div className={styles.stepContainer}>
            <FieldArray name="recipe_steps">
              {({ insert, remove, push }) => (
                <>
                  <div>
                    {values.recipe_steps.length > 0 &&
                      values.recipe_steps.map((recipe_step, index) => (
                        <div>
                          <h4 className={styles.stepHeader}>{index + 1}.</h4>
                          <DeleteItemButton onClick={() => remove(index)} />
                          <TextField
                            name={`recipe_steps.${index}.instruction`}
                            isRequired
                            label="Instruction"
                          />
                          <TextField
                            name={`recipe_steps.${index}.max_before_min`}
                            label="Do this step at most X minutes in advance"
                          />
                          <TextField
                            name={`recipe_steps.${index}.min_before_min`}
                            label="Do this step at least X minutes in advance"
                          />
                          <FieldArray name={`recipe_steps.${index}.inputs`}>
                            {(props) => {
                              const pushInput = props.push
                              const removeInput = props.remove
                              return (
                                <div className={styles.inputContainer}>
                                  <div>
                                    {values.recipe_steps[index].inputs.length >
                                      0 &&
                                      values.recipe_steps[index].inputs.map(
                                        (input, inputIndex) => (
                                          <div>
                                            <h4>
                                              Step {index + 1} Input{' '}
                                              {inputIndex + 1}
                                            </h4>
                                            <DeleteItemButton
                                              onClick={() =>
                                                removeInput(inputIndex)
                                              }
                                            />
                                            <div className={styles.qtyWithUnit}>
                                              <TextField
                                                name={`recipe_steps.${index}.inputs.${inputIndex}.quantity`}
                                                isRequired
                                                label="Quantity"
                                              />
                                              <SelectField
                                                name={`recipe_steps.${index}.inputs.${inputIndex}.unit`}
                                                label="Unit"
                                                options={UnitConverter.unitOptions(
                                                  allUnits
                                                )}
                                              />
                                            </div>
                                            <div className={styles.inputType}>
                                              <SelectField
                                                name={`recipe_steps.${index}.inputs.${inputIndex}.inputable_type`}
                                                isRequired
                                                label="Input Type"
                                                options={[
                                                  {
                                                    value: 'Ingredient',
                                                    label: 'Ingredient',
                                                  },
                                                  {
                                                    value: 'Recipe',
                                                    label: 'Recipe',
                                                  },
                                                ]}
                                              />
                                              <InputableIdField
                                                recipeStepIndex={index}
                                                inputIndex={inputIndex}
                                                recipes={alphabeticalRecipes}
                                                ingredients={
                                                  alphabeticalIngredients
                                                }
                                              />
                                            </div>
                                          </div>
                                        )
                                      )}
                                  </div>
                                  <AddItemButton
                                    onClick={() =>
                                      pushInput({
                                        inputable_type: 'Ingredient',
                                      })
                                    }
                                    text="New Input"
                                  />
                                </div>
                              )
                            }}
                          </FieldArray>
                        </div>
                      ))}
                  </div>
                  <AddItemButton
                    onClick={() => push(emptyRecipeStep)}
                    text="New Step"
                  />
                </>
              )}
            </FieldArray>
          </div>
          <button
            className="btn btn-primary"
            type="submit"
            disabled={isSubmitting}>
            Save Recipe
          </button>
        </FormikForm>
      )}
    </Formik>
  )
}

export default RecipeForm
