import React from 'react'
import { Form, Formik, FormikHelpers } from 'formik'
import { TextField } from 'app/components/common/form/TextField'

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

  return (
    <Formik initialValues={{}} onSubmit={handleSubmit}>
      {({ isSubmitting }) => (
        <Form>
          <TextField name="name" isRequired label="Vendor Name" />

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

export default VendorForm
