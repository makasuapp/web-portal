import React from 'react'
import { FaTrashAlt } from 'react-icons/fa'
import { SelectField, TextField } from 'redux-form-fields-lib'
import classnames from 'classnames'

import { Recipe } from 'app/models/recipe'
import formStyles from 'app/components/common/reduxForm/Form.module.css'
import styles from './PredictedOrderForm.module.css'

export interface PredictedOrderFormData {
  quantity: string
  recipe_id: string
}

const PredictedOrderForm = ({
  recipes,
  fields,
  meta: { error, submitFailed },
}) => {
  const shownRecipes = (recipes as Recipe[]).filter((recipe) => recipe.publish)
  const options = shownRecipes.map((recipe) => {
    return { label: recipe.name, value: recipe.id.toString() }
  })

  return (
    <div>
      <button
        className={classnames('btn btn-secondary', styles.newBtn)}
        onClick={() => fields.push({})}>
        New Item
      </button>
      {fields.map((item, index) => {
        const removeItem = () => {
          fields.remove(index)
        }

        return (
          <div key={index}>
            <div className={formStyles.inlineFields}>
              <TextField
                name={`${item}.quantity`}
                label="Quantity"
                isRequired
                customclasses={{ field: styles.quantityField }}
              />
              <SelectField
                name={`${item}.recipe_id`}
                label="Recipe"
                isRequired
                customclasses={{
                  input: 'form-control',
                  field: formStyles.inlineField,
                }}
                options={options}
              />
              <span
                className={classnames('btn btn-danger', formStyles.trash)}
                onClick={removeItem}>
                <FaTrashAlt />
              </span>
            </div>
          </div>
        )
      })}
      <div>{submitFailed && error && <span>{error}</span>}</div>
    </div>
  )
}

export default PredictedOrderForm
