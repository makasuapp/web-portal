import React from 'react'
import { Kitchen } from 'app/models/user'
import { connect } from 'react-redux'
import { ReduxState } from 'reducers'
import VendorForm from '../components/VendorForm'
import { create } from 'app/components/common/form/actions'
import { VendorResource } from 'app/resources/VendorResource'
import { RouteComponentProps } from 'react-router-dom'
import { toast } from 'react-toastify'

interface StateProps {
  currentKitchen?: Kitchen
}

type Props = StateProps & RouteComponentProps

const VendorCreate = (props: Props) => {
  const { currentKitchen } = props

  if (!currentKitchen) {
    return <div>No kitchen found</div>
  }

  return (
    <VendorForm
      handleSubmit={(values, actions) => {
        const data = {
          vendor: values,
          kitchen_id: currentKitchen.id,
        }

        create(VendorResource, data, (resp) => {
          //TODO(swr): mutate vendors to be resp
          props.history.push(VendorResource.indexPath)
          toast.success('Successfully created vendor')
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

export default connect(mapStateToProps, {})(VendorCreate)
