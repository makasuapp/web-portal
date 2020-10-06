import React, { Component, ComponentType } from 'react'
import { ID, Resource, ResourceRecord } from 'app/resources/ResourceHelper'

import { InjectedFormProps } from 'redux-form'
import LoadingPage from '../LoadingPage'
import { ReduxState } from 'reducers'
import { connect } from 'react-redux'
import { toast } from 'react-toastify'
import styles from './Form.module.css'
import { edit, show } from './duck/actions'

interface StateProps {
  isFetching: boolean
  isLoading: boolean
  error?: string
  datum?: ResourceRecord
}

interface DispatchProps {
  edit: (resource: Resource, id: ID, formData: object) => void
  show: (resource: Resource, id: ID) => void
}

interface OuterProps {
  id: ID
  resource: Resource
  Form: ComponentType<InjectedFormProps>
  onEdit: () => void
  getInitialValues: (datum: ResourceRecord) => object
  handleEdit?: (form: any) => void
  fetchResource?: (id: ID) => void
}

type Props = StateProps & DispatchProps & OuterProps

class EditView extends Component<Props> {
  componentDidMount() {
    const { datum, resource, id, show, fetchResource } = this.props
    if (datum === undefined) {
      if (fetchResource !== undefined) {
        fetchResource(id)
      } else {
        show(resource, id)
      }
    }
  }

  componentDidUpdate(prevProps: Props) {
    // TODO(generic): better way to detect succeeded in editing
    if (!this.props.isLoading && prevProps.isLoading) {
      if (this.props.error !== undefined) {
        toast.error(this.props.error)
      } else {
        toast.success(`Successfully edited ${this.props.resource.name}`)
        this.props.onEdit()
      }
    }
  }

  handleSubmit = (form: any) => {
    const { resource, id, handleEdit, edit } = this.props
    if (handleEdit !== undefined) {
      handleEdit(form)
    } else {
      edit(resource, id, form)
    }
  }

  render() {
    const {
      isFetching,
      isLoading,
      resource,
      datum,
      Form,
      getInitialValues,
    } = this.props

    if (isFetching) {
      return <LoadingPage />
    }
    if (datum === undefined) {
      return <div>Nothing to see here</div>
    }
    return (
      <div className={styles.form}>
        <h1>Edit {resource.capital}</h1>
        {isLoading ? <div>Processing...</div> : null}
        <Form
          onSubmit={this.handleSubmit}
          disabled={isLoading}
          initialValues={getInitialValues(datum)}
        />
      </div>
    )
  }
}

const mapStateToProps = (state: ReduxState, props: OuterProps): StateProps => {
  const resourceState = state.api[props.resource.name]
  const datum = resourceState.byId[props.id]

  return {
    isLoading: resourceState.isLoading,
    isFetching: resourceState.isFetching,
    datum,
    error: resourceState.error,
  }
}

export default connect(mapStateToProps, { edit, show })(EditView)
