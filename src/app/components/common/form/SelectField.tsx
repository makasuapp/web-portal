import { WrappedField, WrappedFieldProps } from './WrappedField'

import { Field } from 'formik'
import React from 'react'
import Select from 'react-select'

export interface SelectFieldProps {
  options: { value: string | number; label: string }[]
}

export function SelectField(props: SelectFieldProps & WrappedFieldProps) {
  const { name, customclasses = {}, options } = props

  return (
    <Field name={name}>
      {({ field, form, meta }) => (
        <WrappedField {...props} meta={meta}>
          <Select
            name={field.name}
            options={options}
            value={
              (options
                ? options.find((option) => option.value === field.value)
                : '') as any
            }
            onChange={(option) =>
              form.setFieldValue(field.name, (option as any).value)
            }
            onBlur={field.onBlur}
            className={customclasses.input}
          />
        </WrappedField>
      )}
    </Field>
  )
}
