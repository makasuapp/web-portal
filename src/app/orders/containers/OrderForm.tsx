import React from 'react';
import { SelectField, TextField, DatePickerField } from 'redux-form-fields-lib';
import { FieldArray, InjectedFormProps, formValueSelector, reduxForm } from 'redux-form'
import { ReduxState } from 'reducers';
import { connect } from 'react-redux';

import { Recipe } from 'app/models/recipe';
import { Resource, Params } from 'app/common/ResourceHelper';
import { fetch } from 'app/common/duck/actions';
import { RecipeResource } from 'app/recipes/resource';
import OrderItemForm, { OrderItemFormData } from '../components/OrderItemForm';
import formStyles from 'app/common/containers/Form.module.css'
import { Kitchen } from 'app/models/user';

const formName = "orderForm"

export interface OrderFormData {
  order: {
    order_type: string
    for_type: string,
    for_time?: string,
    kitchen_id: number,
    order_items: OrderItemFormData[]
  },
  customer: {
    email?: string,
    first_name?: string,
    last_name?: string,
    phone_number?: string
  }
}

interface StateProps {
  hasFetchedRecipes: boolean
  selectTime: boolean
  recipes: Recipe[]
  currentKitchen?: Kitchen
}

interface DispatchProps {
  fetch: (resource: Resource, params?: Params) => void
}

type Props = InjectedFormProps<OrderFormData> & StateProps & DispatchProps

class OrderForm extends React.Component<Props> {
  componentDidMount() {
    //TODO: should redirect if no kitchen
    const {currentKitchen, hasFetchedRecipes} = this.props
    if (currentKitchen && !hasFetchedRecipes) {
      this.props.fetch(RecipeResource, {kitchen_id: currentKitchen.id})
    }
  }

  render() {
    const {handleSubmit, disabled, selectTime, recipes} = this.props;

    return <form onSubmit={handleSubmit}>
      <SelectField name="order.order_type" label="Order Type" isRequired
        customclasses={{input: "form-control", field: formStyles.shortField}} 
        options={[
          {value: "delivery", label: "Delivery"}, 
          {value: "pickup", label: "Pickup"},
        ]} 
      />

      <SelectField name="order.for_type" label="For" isRequired
        customclasses={{input: "form-control", field: formStyles.shortField}} 
        options={[
          {value: "asap", label: "ASAP"}, 
          {value: "select", label: "Select Time"},
        ]} 
      />

      {selectTime ? 
        <DatePickerField 
          name="order.for_time" 
          customclasses={{field: formStyles.shortField}}
          showTimeSelect isRequired 
          dateFormat="MM/d/yyyy h:mm aa" />
      : null}

      <h3>Customer Info</h3>
      <div className={formStyles.inlineFields}>
        <TextField name="customer.first_name" label="First Name" customclasses={{field: formStyles.inlineField}} />
        <TextField name="customer.last_name" label="Last Name" customclasses={{field: formStyles.inlineField}} />
      </div>
      <div className={formStyles.inlineFields}>
        <TextField name="customer.email" label="Email" customclasses={{field: formStyles.inlineField}} />
        <TextField name="customer.phone_number" label="Phone Number" customclasses={{field: formStyles.inlineField}} />
      </div>

      <h3>Order Items</h3>
      <FieldArray name="order.order_items" recipes={recipes} 
        component={OrderItemForm} />

      <button className="btn btn-primary" type="submit" disabled={disabled}>Submit</button>
    </form>
  }
};

const selector = formValueSelector(formName)
const mapStateToProps = (state: ReduxState): StateProps => {  
  const resourceState = state.api[RecipeResource.name]
  const recipes = resourceState.data as Recipe[]
  const forType = selector(state, "order.for_type")

  return {
    selectTime: forType === "select",
    hasFetchedRecipes: resourceState.hasFetched,
    recipes,
    currentKitchen: state.auth.currentKitchen
  }
};

const OrderReduxForm = reduxForm({
  form: formName
})(OrderForm);

export default connect(mapStateToProps, {fetch})(OrderReduxForm)