import { WrappedField, WrappedFieldProps } from './WrappedField'

import { Field } from 'formik'
import React from 'react'

export interface TextFieldProps {
  type?: 'text' | 'email' | 'password' | 'hidden'
  placeholder?: string
  isDisabled?: boolean
}

export function TextField(props: TextFieldProps & WrappedFieldProps) {
  const { type, name, placeholder, customclasses, isDisabled } = props

  return (
    <Field type={type || 'text'} name={name} placeholder={placeholder}>
      {({ field, form, meta }) => (
        <WrappedField {...props} meta={meta}>
          <input
            className={customclasses?.input || 'form-control'}
            placeholder={placeholder}
            name={name}
            type={type}
            disabled={isDisabled}
            {...field}
          />
        </WrappedField>
      )}
    </Field>
  )
}
