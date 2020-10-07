import React from 'react'
import { Formik, FormikHelpers } from 'formik'
import { TextField } from 'app/components/common/form/TextField'
import FormikForm from 'app/components/common/form/Form'

export interface VendorFormValues {
  name?: string
}

interface OuterProps {
  handleSubmit: (
    values: VendorFormValues,
    actions: FormikHelpers<VendorFormValues>
  ) => void
}

const VendorForm = (props: OuterProps) => {
  const { handleSubmit } = props

  //TODO(form): schema validation
  return (
    <Formik initialValues={{}} onSubmit={handleSubmit}>
      {({ isSubmitting }) => (
        <FormikForm>
          <TextField name="name" isRequired label="Vendor Name" />

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

export default VendorForm
