import React from 'react'
import { SelectField, TextField } from 'redux-form-fields-lib';
import { Recipe } from 'app/models/recipe';
import { ReduxState } from 'reducers';
import { connect } from 'react-redux';
import { RecipeResource } from 'app/recipes/resource';

const OrderItemForm = ({ recipes, fields, meta: { error, submitFailed } }) => {
  const shownRecipes = (recipes as Recipe[]).filter((recipe) => recipe.publish)

  return <div>
    {fields.map((item, index) => {
      const removeItem = () => {
        fields.remove(index)
      }

      return <div key={index}>
        <SelectField name={`${item}.recipe_id`} label="Recipe" isRequired
          customclasses={{input: "form-control"}} options={shownRecipes.map((recipe) =>{
            return {label: recipe.name, value: recipe.id.toString()}
          })} 
        />
        <TextField name={`${item}.quantity`} label="Quantity" isRequired />
        <TextField name={`${item}.price_cents`} isRequired isNumber label="Price in cents" />
        <div>
          <span className={"btn btn-danger"} onClick={removeItem}>
            Delete
          </span>
        </div>
      </div>
    })}
    <br/>
    <div>
      <span className={"btn btn-secondary"} onClick={() => fields.push({})}>
        Add Item
      </span>
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