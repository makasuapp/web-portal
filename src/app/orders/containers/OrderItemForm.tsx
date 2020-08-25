import React from 'react'
import {FaTrashAlt} from 'react-icons/fa';
import { SelectField, TextField } from 'redux-form-fields-lib';
import { ReduxState } from 'reducers';
import { connect } from 'react-redux';
import classnames from 'classnames'

import { Recipe } from 'app/models/recipe';
import { RecipeResource } from 'app/recipes/resource';
import styles from './OrderForm.module.css'

export interface OrderItemFormData {
  quantity: string,
  recipe_id: string,
  price_cents: string
}

const OrderItemForm = ({ recipes, fields, meta: { error, submitFailed } }) => {
  const shownRecipes = (recipes as Recipe[]).filter((recipe) => recipe.publish)

  return <div>
    {fields.map((item, index) => {
      const removeItem = () => {
        fields.remove(index)
      }

      return <div key={index}>
        <div className={styles.inlineFields}>
          <TextField name={`${item}.quantity`} label="Quantity" isRequired 
            customclasses={{field: styles.quantityField}} />
          <SelectField name={`${item}.recipe_id`} label="Recipe" isRequired
            customclasses={{input: "form-control", field: styles.inlineField}} 
            options={shownRecipes.map((recipe) =>{
              return {label: recipe.name, value: recipe.id.toString()}
            })} 
          />
          <button className={classnames("btn btn-danger", styles.trash)} onClick={removeItem}>
            <FaTrashAlt /> 
          </button>
        </div>
        <TextField name={`${item}.price_cents`} isRequired isNumber 
          label="Price" pretext="$"
          customclasses={{field: styles.shortField, inputWrapper: styles.dollarInput, pretext: styles.dollarSign}} />
      </div>
    })}
    <br/>
    <div>
      <button className={"btn btn-secondary"} onClick={() => fields.push({})}>
        Add Item
      </button>
      {submitFailed && error && <span>{error}</span>}
    </div>
    <br/>
  </div>
}

const mapStateToProps = (state: ReduxState) => {  
  const resourceState = state.api[RecipeResource.name]
  const recipes = resourceState.data as Recipe[]
  return {
    recipes,
  }
};

export default connect(mapStateToProps, {})(OrderItemForm)