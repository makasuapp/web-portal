import React from 'react'
import { SelectField, TextField, DatePickerField } from 'redux-form-fields-lib';
import { FieldArray, InjectedFormProps, reduxForm } from 'redux-form'
import { ReduxState } from 'reducers';
import { connect } from 'react-redux';

import { fetch } from 'app/common/duck/actions';
import {Recipe} from 'app/models/recipe';
import { Resource, Params } from 'app/common/ResourceHelper';
import { RecipeResource } from 'app/recipes/resource';

const formName = "predictedOrderCreateForm"

interface PredictedOrderFormData {

}

interface StateProps {
  recipes: Recipe[]
}

interface DispatchProps {
  fetch: (resource: Resource, params?: Params) => void
}

type Props = InjectedFormProps<PredictedOrderFormData> & StateProps & DispatchProps

class PredictedOrdersForm extends React.Component<Props> {
  componentDidMount() {
    if (!this.props.hasFetched) {
      //TODO(kitchenId)
      this.props.fetch(RecipeResource, {kitchen_id: 1})
    }
  }

  render() {
    const {handleSubmit, disabled} = this.props;

    return <form onSubmit={handleSubmit}>

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

const PredictedOrdersReduxForm = reduxForm({
  form: formName
})(PredictedOrdersForm);

export default connect(mapStateToProps, {fetch})(PredictedOrdersReduxForm)