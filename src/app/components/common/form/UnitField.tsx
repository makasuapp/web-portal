import UnitConverter, { allUnits } from 'app/utils/UnitConverter'
import React from 'react'
import CreatableSelect from 'react-select/creatable'
import { WrappedField, WrappedFieldProps } from './WrappedField'

import { Field } from 'formik'

export function UnitField(props: WrappedFieldProps) {
  const { name, label, customclasses = {} } = props

  const options = [{ value: '', label: '' }].concat(
    UnitConverter.unitOptions(allUnits)
  )

  return (
    <Field name={name}>
      {({ field, form, meta }) => (
        <WrappedField {...props} meta={meta} label={label || 'Unit'}>
          <CreatableSelect
            isClearable
            name={field.name}
            options={options}
            value={
              options.find((option) => option.value === field.value) || {
                label: field.value,
                value: field.value,
              }
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
