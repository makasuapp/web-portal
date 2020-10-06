import React from 'react'
import { FaTrashAlt } from 'react-icons/fa'
import { SelectField, TextField } from 'redux-form-fields-lib'
import classnames from 'classnames'

import { Recipe } from 'app/models/recipe'
import styles from './OrderItemForm.module.css'
import formStyles from 'app/components/common/reduxForm/Form.module.css'

export interface OrderItemFormData {
  quantity: string
  recipe_id: string
  price_cents: string
}

const OrderItemForm = ({ recipes, fields, meta: { error, submitFailed } }) => {
  const shownRecipes = (recipes as Recipe[]).filter((recipe) => recipe.publish)
  const options = shownRecipes.map((recipe) => {
    return { label: recipe.name, value: recipe.id.toString() }
  })

  return (
    <div>
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
            <TextField
              name={`${item}.price_cents`}
              isRequired
              isNumber
              label="Price"
              pretext="$"
              customclasses={{
                field: formStyles.shortField,
                inputWrapper: styles.dollarInput,
                pretext: styles.dollarSign,
              }}
            />
          </div>
        )
      })}
      <br />
      <div>
        <button className={'btn btn-secondary'} onClick={() => fields.push({})}>
          Add Item
        </button>
        {submitFailed && error && <span>{error}</span>}
      </div>
      <br />
    </div>
  )
}

export default OrderItemForm
