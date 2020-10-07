import { WrappedField, WrappedFieldProps } from './WrappedField'

import { Field } from 'formik'
import React from 'react'

export interface SelectFieldProps {
  options: { value: string | number; label: string }[]
}

export function SelectField(props: SelectFieldProps & WrappedFieldProps) {
  const { name, customclasses = {}, options } = props

  return (
    <Field name={name}>
      {({ field, form, meta }) => (
        <WrappedField {...props} meta={meta}>
          <select className={customclasses.input || 'form-control'} {...field}>
            <option value=""></option>
            {options.map(({ value, label }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </WrappedField>
      )}
    </Field>
  )
}
