import React from 'react'
import { Kitchen } from 'app/models/user'
import { connect } from 'react-redux'
import { ReduxState } from 'reducers'
import IngredientForm from '../components/IngredientForm'
import { edit } from 'app/components/common/form/actions'
import { IngredientResource } from '../../../resources/IngredientResource'
import { RouteComponentProps } from 'react-router-dom'
import { toast } from 'react-toastify'
import UnitConverter from 'app/utils/UnitConverter'
import { useVendors } from 'app/components/vendors/actions'
import ErrorPage from 'app/components/common/ErrorPage'
import LoadingPage from 'app/components/common/LoadingPage'
import { useIngredients } from '../actions'
import { idFromUrl } from 'app/resources/ResourceHelper'

interface Params {
  id: string
}

interface StateProps {
  currentKitchen?: Kitchen
}

type Props = StateProps & RouteComponentProps<Params>

const IngredientEdit = (props: Props) => {
  const id = idFromUrl(props)
  const { currentKitchen } = props

  const { ingredientsData, ingredientsError } = useIngredients(currentKitchen)
  const { vendorData, vendorError } = useVendors(currentKitchen)

  if (vendorError || ingredientsError) return <ErrorPage />
  if (!ingredientsData || !vendorData) return <LoadingPage />

  if (!currentKitchen) {
    return <div>No kitchen found</div>
  }

  const ingredient = ingredientsData.filter((i) => i.id === id)[0]
  if (!ingredient) {
    return <div>No ingredient found</div>
  }
  const gram_per_tbsp = UnitConverter.gramsPerTbsp(
    ingredient.volume_weight_ratio
  )

  return (
    <IngredientForm
      vendors={vendorData}
      initialValues={Object.assign({}, ingredient, {
        gram_per_tbsp,
      })}
      handleSubmit={(values, actions) => {
        const data = {
          ingredient: Object.assign({}, values, {
            volume_weight_ratio:
              values.gram_per_tbsp &&
              UnitConverter.getVolumeWeightRatio(values.gram_per_tbsp),
          }),
          kitchen_id: currentKitchen.id,
        }

        edit(id, IngredientResource, data)
          .then((resp) => {
            //TODO(swr): mutate recipe to be resp
            props.history.push(IngredientResource.indexPath)
            toast.success('Successfully edited ingredient')
            actions.setSubmitting(false)
          })
          .catch((err) => {
            toast.error(
              'An error occurred saving this ingredient. Please try again or contact support'
            )
            actions.setSubmitting(false)
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

export default connect(mapStateToProps, {})(IngredientEdit)
