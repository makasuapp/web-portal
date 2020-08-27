import React from 'react'
import { DatePickerField } from 'redux-form-fields-lib';
import { FieldArray, InjectedFormProps, reduxForm } from 'redux-form'
import { ReduxState } from 'reducers';
import { connect } from 'react-redux';

import { fetch } from 'app/common/duck/actions';
import {Recipe} from 'app/models/recipe';
import { Resource, Params } from 'app/common/ResourceHelper';
import { RecipeResource } from 'app/recipes/resource';
import PredictedOrderForm, {PredictedOrderFormData} from './PredictedOrderForm';

export const formName = "predictedOrderCreateForm"

export interface PredictedOrdersFormData {
  date_ms: number,
  predicted_orders: PredictedOrderFormData[],
  kitchen_id: number
}

interface StateProps {
  recipes: Recipe[]
}

interface DispatchProps {
  fetch: (resource: Resource, params?: Params) => void
}

interface OuterProps {
  dateDisabled?: boolean
  disabled?: boolean
}

type Props = InjectedFormProps<PredictedOrdersFormData, OuterProps> & StateProps 
  & DispatchProps & OuterProps

class PredictedOrdersForm extends React.Component<Props> {
  componentDidMount() {
    if (!this.props.hasFetched) {
      //TODO(kitchenId)
      this.props.fetch(RecipeResource, {kitchen_id: 1})
    }
  }

  render() {
    const {handleSubmit, disabled, recipes, dateDisabled} = this.props;

    return <form onSubmit={handleSubmit}>
      <DatePickerField 
        name="date_ms" 
        label="Date"
        isRequired 
        disabled={dateDisabled}
        dateFormat="MM/d/yyyy" />

      <h3>Predicted Orders</h3>
      <FieldArray name="predicted_orders" recipes={recipes}
        component={PredictedOrderForm} />

      <button className="btn btn-primary" type="submit" disabled={disabled}>Submit</button>
    </form>
  }
}

const mapStateToProps = (state: ReduxState) => {  
  const resourceState = state.api[RecipeResource.name]
  const recipes = resourceState.data as Recipe[]

  return {
    recipes
  }
};

const ConnectedPredictedOrdersForm = connect(mapStateToProps, {fetch})(PredictedOrdersForm)

export default reduxForm<PredictedOrdersFormData, OuterProps>({
  form: formName
})(ConnectedPredictedOrdersForm);