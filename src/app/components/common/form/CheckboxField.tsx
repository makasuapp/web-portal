import { WrappedField, WrappedFieldProps } from './WrappedField'

import { Field } from 'formik'
import React from 'react'
import styles from './Form.module.css'
import classnames from 'classnames'

export function CheckboxField(props: WrappedFieldProps) {
  const { name, label, customclasses = {} } = props

  const adjustedProps = Object.assign({}, props, {
    label: undefined,
  })

  return (
    <Field name={name}>
      {({ field, form, meta }) => {
        return (
          <WrappedField {...adjustedProps} meta={meta}>
            <input
              className={classnames(styles.checkboxInput, customclasses.input)}
              name={name}
              id={name}
              defaultChecked={!!meta.initialValue}
              type="checkbox"
              {...field}
            />
            <label
              htmlFor={name}
              className={classnames(styles.checkboxLabel, customclasses.label)}>
              {label}
            </label>
          </WrappedField>
        )
      }}
    </Field>
  )
}
