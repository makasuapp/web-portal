import React from 'react'
import * as Yup from 'yup'
import { Formik, FormikHelpers } from 'formik'
import { TextField } from 'app/components/common/form/TextField'
import FormikForm from 'app/components/common/form/Form'
import { UnitField } from 'app/components/common/form/UnitField'
import styles from './IngredientCostForm.module.css'
import { Ingredient } from 'app/models/ingredient'

export interface IngredientCostFormValues {
  price?: number
  got_qty?: number
  got_unit?: string
}

const IngredientCostSchema = Yup.object().shape({
  price: Yup.number().required('Required'),
  got_qty: Yup.number().required('Required'),
  got_unit: Yup.string(),
})

interface OuterProps {
  ingredient: Ingredient
  initialValues?: IngredientCostFormValues
  handleSubmit: (
    values: IngredientCostFormValues,
    actions: FormikHelpers<IngredientCostFormValues>
  ) => void
}

const IngredientCostForm = (props: OuterProps) => {
  const { handleSubmit, initialValues, ingredient } = props

  return (
    <Formik
      initialValues={initialValues || {}}
      onSubmit={handleSubmit}
      validationSchema={IngredientCostSchema}>
      {({ isSubmitting }) => (
        <FormikForm>
          <h2>Set Cost for {ingredient.name}</h2>
          <div>
            Note: the unit has to be convertable to what's used in the recipe
          </div>
          <br />
          <TextField
            name="price"
            pretext="$"
            customclasses={{
              pretext: styles.dollarSign,
              inputWrapper: styles.dollarInput,
            }}
            label="Price"
          />
          per
          <div className={styles.qtyWithUnit}>
            <TextField name="got_qty" isRequired label="Quantity" />
            <UnitField name="got_unit" />
          </div>
          <button
            className="btn btn-primary"
            type="submit"
            disabled={isSubmitting}>
            Submit
          </button>
        </FormikForm>
      )}
    </Formik>
  )
}

export default IngredientCostForm
