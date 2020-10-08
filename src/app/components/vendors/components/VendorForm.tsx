import React from 'react'
import * as Yup from 'yup'
import { Formik, FormikHelpers } from 'formik'
import { TextField } from 'app/components/common/form/TextField'
import FormikForm from 'app/components/common/form/Form'

export interface VendorFormValues {
  name?: string
}

const VendorSchema = Yup.object().shape({
  name: Yup.string().required('Required'),
})

interface OuterProps {
  handleSubmit: (
    values: VendorFormValues,
    actions: FormikHelpers<VendorFormValues>
  ) => void
}

const VendorForm = (props: OuterProps) => {
  const { handleSubmit } = props

  return (
    <Formik
      initialValues={{}}
      onSubmit={handleSubmit}
      validationSchema={VendorSchema}>
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
