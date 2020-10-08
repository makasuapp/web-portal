import React from 'react'
import * as Yup from 'yup'
import { Formik, FormikHelpers } from 'formik'
import { TextField } from 'app/components/common/form/TextField'
import { Vendor } from 'app/models/vendor'
import { SelectField } from 'app/components/common/form/SelectField'
import FormikForm from 'app/components/common/form/Form'

export interface IngredientFormValues {
  name?: string
  gram_per_tbsp?: number
  default_vendor_id?: number
}

const IngredientSchema = Yup.object().shape({
  name: Yup.string().required('Required'),
  gram_per_tbsp: Yup.number(),
  default_vendor_id: Yup.number().required('Required'),
})

interface OuterProps {
  initialValues?: IngredientFormValues
  vendors: Vendor[]
  handleSubmit: (
    values: IngredientFormValues,
    actions: FormikHelpers<IngredientFormValues>
  ) => void
}

const IngredientForm = (props: OuterProps) => {
  const { handleSubmit, vendors, initialValues } = props

  return (
    <Formik
      initialValues={initialValues || {}}
      onSubmit={handleSubmit}
      validationSchema={IngredientSchema}>
      {({ isSubmitting }) => (
        <FormikForm>
          <TextField name="name" isRequired label="Ingredient Name" />
          <TextField
            name="gram_per_tbsp"
            label="How many grams are in a tablespoon of this ingredient?"
            subtext="If you convert between volume and weight for this ingredient, you'll need this"
          />
          <SelectField
            name="default_vendor_id"
            isRequired
            label="Default Vendor"
            options={vendors.map((vendor) => {
              return {
                value: vendor.id,
                label: vendor.name,
              }
            })}
          />

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

export default IngredientForm
