import React from 'react';
import { SelectField, TextField, DatePickerField } from 'redux-form-fields-lib';
import { FieldArray, InjectedFormProps, formValueSelector, reduxForm } from 'redux-form'
import { ReduxState } from 'reducers';
import { connect } from 'react-redux';

import { Recipe } from 'app/models/recipe';
import { Resource } from 'app/common/ResourceHelper';
import { fetch } from 'app/common/duck/actions';
import { RecipeResource } from 'app/recipes/resource';
import OrderItemForm, { OrderItemFormData } from './OrderItemForm';
import styles from './OrderForm.module.css'

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
  selectTime: boolean
  recipes: Recipe[]
}

interface DispatchProps {
  fetch: (resource: Resource) => void
}

type Props = InjectedFormProps<OrderFormData> & StateProps & DispatchProps

class OrderForm extends React.Component<Props> {
  componentDidMount() {
    if (!this.props.hasFetched) {
      //TODO(kitchenId)
      this.props.fetch(RecipeResource, {kitchen_id: 1})
    }
  }

  render() {
    const {handleSubmit, disabled, selectTime} = this.props;

    //TODO(forms): make date picker a date/time picker and make it required. make it send up date correctly
    return <form onSubmit={handleSubmit}>
      <SelectField name="order.order_type" label="Order Type" isRequired
        customclasses={{input: "form-control", field: styles.shortField}} 
        options={[
          {value: "delivery", label: "Delivery"}, 
          {value: "pickup", label: "Pickup"},
        ]} 
      />

      <SelectField name="order.for_type" label="For" isRequired
        customclasses={{input: "form-control", field: styles.shortField}} 
        options={[
          {value: "asap", label: "ASAP"}, 
          {value: "select", label: "Select Time"},
        ]} 
      />

      {selectTime ? 
        <DatePickerField name="order.for_time" />
      : null}

      <h3>Customer Info</h3>
      <div className={styles.inlineFields}>
        <TextField name="customer.first_name" label="First Name" customclasses={{field: styles.inlineField}} />
        <TextField name="customer.last_name" label="Last Name" customclasses={{field: styles.inlineField}} />
      </div>
      <div className={styles.inlineFields}>
        <TextField name="customer.email" label="Email" customclasses={{field: styles.inlineField}} />
        <TextField name="customer.phone_number" label="Phone Number" customclasses={{field: styles.inlineField}} />
      </div>

      <h3>Order Items</h3>
      <FieldArray name="order.order_items" component={OrderItemForm} />

      <button className="btn btn-primary" type="submit" disabled={disabled}>Submit</button>
    </form>
  }
};

const selector = formValueSelector(formName)
const mapStateToProps = (state: ReduxState) => {  
  const resourceState = state.api[RecipeResource.name]
  const recipes = resourceState.data as Recipe[]
  const forType = selector(state, "order.for_type")

  return {
    selectTime: forType === "select",
    recipes,
  }
};

const OrderReduxForm = reduxForm({
  form: formName
})(OrderForm);

export default connect(mapStateToProps, {fetch})(OrderReduxForm)