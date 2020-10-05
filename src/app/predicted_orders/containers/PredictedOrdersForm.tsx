import React from 'react'
import { DatePickerField } from 'redux-form-fields-lib'
import { FieldArray, InjectedFormProps, reduxForm } from 'redux-form'
import { ReduxState } from 'reducers'
import { connect } from 'react-redux'

import { fetch } from 'app/common/duck/actions'
import { Recipe } from 'app/models/recipe'
import { Resource, Params } from 'app/common/ResourceHelper'
import { RecipeResource } from 'app/recipes/resource'
import PredictedOrderForm, {
  PredictedOrderFormData,
} from '../components/PredictedOrderForm'
import { Kitchen } from 'app/models/user'
import { datepickerDateFormat } from 'app/common/DateHelper'

export const formName = 'predictedOrderCreateForm'

export interface PredictedOrdersFormData {
  date_ms: number
  predicted_orders: PredictedOrderFormData[]
  kitchen_id: number
}

interface StateProps {
  hasFetchedRecipes: boolean
  recipes: Recipe[]
  currentKitchen?: Kitchen
}

interface DispatchProps {
  fetch: (resource: Resource, params?: Params) => void
}

interface OuterProps {
  dateDisabled?: boolean
  disabled?: boolean
}

type Props = InjectedFormProps<PredictedOrdersFormData, OuterProps> &
  StateProps &
  DispatchProps &
  OuterProps

//TODO: be able to delete or change time?
class PredictedOrdersForm extends React.Component<Props> {
  componentDidMount() {
    //TODO: should redirect if no kitchen
    const { currentKitchen, hasFetchedRecipes } = this.props
    if (currentKitchen && !hasFetchedRecipes) {
      this.props.fetch(RecipeResource, { kitchen_id: currentKitchen.id })
    }
  }

  render() {
    const { handleSubmit, disabled, recipes, dateDisabled } = this.props

    return (
      <form onSubmit={handleSubmit}>
        <div>
          Note: Expected Orders set here overrides whatever existed for that
          date.
        </div>
        <div>
          This will also reset the morning and prep checklists for the day,
          including any changes you may have made.
        </div>
        <br />
        <DatePickerField
          name="date_ms"
          label="Date"
          isRequired
          disabled={dateDisabled}
          showTimeSelect
          dateFormat={datepickerDateFormat}
        />

        <h3>Expected Orders</h3>
        <FieldArray
          name="predicted_orders"
          recipes={recipes}
          component={PredictedOrderForm}
        />

        <button className="btn btn-primary" type="submit" disabled={disabled}>
          Submit
        </button>
      </form>
    )
  }
}

const mapStateToProps = (state: ReduxState): StateProps => {
  const resourceState = state.api[RecipeResource.name]
  const recipes = resourceState.data as Recipe[]

  return {
    recipes,
    hasFetchedRecipes: resourceState.hasFetched,
    currentKitchen: state.auth.currentKitchen,
  }
}

const ConnectedPredictedOrdersForm = connect(mapStateToProps, { fetch })(
  PredictedOrdersForm
)

export default reduxForm<PredictedOrdersFormData, OuterProps>({
  form: formName,
})(ConnectedPredictedOrdersForm)
