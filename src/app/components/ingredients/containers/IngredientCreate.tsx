import React from 'react'
import { Kitchen } from 'app/models/user'
import { connect } from 'react-redux'
import { ReduxState } from 'reducers'
import IngredientForm from '../components/IngredientForm'
import { create } from 'app/components/common/form/actions'
import { IngredientResource } from '../../../resources/IngredientResource'
import { RouteComponentProps } from 'react-router-dom'
import { toast } from 'react-toastify'
import UnitConverter from 'app/utils/UnitConverter'
import { useVendors } from 'app/components/vendors/actions'
import ErrorPage from 'app/components/common/ErrorPage'
import LoadingPage from 'app/components/common/LoadingPage'

interface StateProps {
  currentKitchen?: Kitchen
}

type Props = StateProps & RouteComponentProps

const IngredientCreate = (props: Props) => {
  const { currentKitchen } = props

  const { vendorData, vendorError } = useVendors(currentKitchen)

  if (vendorError) return <ErrorPage />
  if (!vendorData) return <LoadingPage />

  if (!currentKitchen) {
    return <div>No kitchen found</div>
  }

  return (
    <IngredientForm
      vendors={vendorData}
      handleSubmit={(values, actions) => {
        const data = {
          ingredient: Object.assign({}, values, {
            volume_weight_ratio:
              values.gram_per_tbsp &&
              UnitConverter.getVolumeWeightRatio(values.gram_per_tbsp),
          }),
          kitchen_id: currentKitchen.id,
        }

        create(IngredientResource, data, (resp) => {
          //TODO(swr): mutate ingredients to be resp
          props.history.push(IngredientResource.indexPath)
          toast.success('Successfully created ingredient')
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

export default connect(mapStateToProps, {})(IngredientCreate)
