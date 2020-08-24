import { SelectField, TextField } from 'redux-form-fields-lib';
import { FieldArray, InjectedFormProps, formValueSelector, reduxForm } from 'redux-form'

import { Recipe } from 'app/models/recipe';
import React from 'react';
import { ReduxState } from 'reducers';
import { connect } from 'react-redux';
import { Resource } from 'app/common/ResourceHelper';
import { fetch } from 'app/common/duck/actions';
import { RecipeResource } from 'app/recipes/resource';
import OrderItemForm from './OrderItemForm';

const formName = "orderForm"

export interface OrderFormData {
  order: {
    order_type: string
    for_time?: string
  },
  customer: {
    email?: string,
    first_name?: string,
    last_name?: string,
    phone_number?: string
  }
}

interface StateProps {
  isFetching: boolean
  hasFetched: boolean
  recipes: Recipe[]
}

interface DispatchProps {
  fetch: (resource: Resource) => void
}

type Props = InjectedFormProps<OrderFormData> & StateProps & DispatchProps

class OrderForm extends React.Component<Props> {
  componentDidMount() {
    if (!this.props.hasFetched) {
      this.props.fetch(RecipeResource)
    }
  }

  render() {
    const {handleSubmit, disabled} = this.props;

    return <form onSubmit={handleSubmit}>
      <SelectField name="order.order_type" label="Order Type" isRequired
        customclasses={{input: "form-control"}} options={[
          {value: "delivery", label: "Delivery"}, 
          {value: "pickup", label: "Pickup"},
        ]} 
      />
      <TextField name="customer.email" label="Customer Email" isRequired />

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
  return {
    isFetching: resourceState.isFetching,
    hasFetched: resourceState.hasFetched,
    recipes,
  }
};

const OrderReduxForm = reduxForm({
  form: formName
})(OrderForm);

export default connect(mapStateToProps, {fetch})(OrderReduxForm)