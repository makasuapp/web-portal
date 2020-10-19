import React from 'react'
import { Kitchen } from 'app/models/user'
import { connect } from 'react-redux'
import { ReduxState } from 'reducers'
import { RouteComponentProps } from 'react-router-dom'
import ErrorPage from 'app/components/common/ErrorPage'
import LoadingPage from 'app/components/common/LoadingPage'
import { idFromUrl } from 'app/resources/ResourceHelper'
import { useIngredients } from 'app/components/ingredients/actions'
import IngredientCostForm from '../components/IngredientCostForm'
import { createCost } from '../actions'
import { toast } from 'react-toastify'

interface Params {
  id: string
}

interface StateProps {
  currentKitchen?: Kitchen
}

type Props = StateProps & RouteComponentProps<Params>

const IngredientCostCreate = (props: Props) => {
  const id = idFromUrl(props)
  const { currentKitchen } = props

  const { ingredientsData, ingredientsError } = useIngredients(currentKitchen)

  if (ingredientsError) return <ErrorPage />
  if (!ingredientsData) return <LoadingPage />

  if (!currentKitchen) {
    return <div>No kitchen found</div>
  }

  const ingredient = ingredientsData.filter((i) => i.id === id)[0]
  if (!ingredient) {
    return <div>No ingredient found</div>
  }

  //show other latest costs for the same ingredient?
  return (
    <IngredientCostForm
      ingredient={ingredient}
      handleSubmit={(values, actions) => {
        const data = {
          procurement_item: Object.assign({}, values, {
            price_cents: values.price && values.price * 100.0,
            price: undefined,
            ingredient_id: id,
          }),
          kitchen_id: currentKitchen.id,
        }

        createCost(data)
          .then((resp) => {
            //TODO: not great, the toast gets lost
            //also there's a bit of a lag before it sees updated versions
            //would be better if this mutated
            toast.success('Successfully set cost')
            props.history.goBack()
            actions.setSubmitting(false)
          })
          .catch((err) => {
            toast.error('An error occurred setting the cost')
            actions.setSubmitting(false)
            throw err
          })
      }}
    />
  )
}

const mapStateToProps = (state: ReduxState): StateProps => {
  return {
    currentKitchen: state.auth.currentKitchen,
  }
}

export default connect(mapStateToProps, {})(IngredientCostCreate)
