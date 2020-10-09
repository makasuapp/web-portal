import UnitConverter, { allUnits } from 'app/utils/UnitConverter'
import React from 'react'
import { SelectField } from './SelectField'
import { WrappedFieldProps } from './WrappedField'

export function UnitField(props: WrappedFieldProps) {
  return (
    <SelectField
      label="Unit"
      {...props}
      options={[{ value: '', label: '' }].concat(
        UnitConverter.unitOptions(allUnits)
      )}
    />
  )
}
