import React, { Component, ComponentType } from 'react'

import { InjectedFormProps } from 'redux-form'
import { ReduxState } from 'reducers'
import { Resource } from 'app/resources/ResourceHelper'
import { connect } from 'react-redux'
import { create } from './duck/actions'
import styles from './Form.module.css'
import { toast } from 'react-toastify'

interface StateProps {
  isLoading: boolean
  error?: string
}

interface DispatchProps {
  create: (resource: Resource, formData: object) => void
}

interface OuterProps {
  resource: Resource
  Form: ComponentType<InjectedFormProps>
  onCreate: () => void
  handleCreate?: (form: any) => void
  formatData?: (form: any) => any
  initialValues?: any
  hideHeader?: boolean
}

type Props = StateProps & DispatchProps & OuterProps

class CreateView extends Component<Props> {
  componentDidUpdate(prevProps: Props) {
    //TODO(generic): better way to detect succeeded in creating
    if (!this.props.isLoading && prevProps.isLoading) {
      if (this.props.error !== undefined) {
        toast.error(this.props.error)
      } else {
        toast.success(`Successfully created new ${this.props.resource.name}`)
        this.props.onCreate()
      }
    }
  }

  handleSubmit = (form: any) => {
    const { handleCreate, create, formatData, resource } = this.props
    const formattedData = formatData ? formatData(form) : form

    if (handleCreate !== undefined) {
      handleCreate(formattedData)
    } else {
      create(resource, formattedData)
    }
  }

  render() {
    const { resource, Form, isLoading, initialValues, hideHeader } = this.props

    return (
      <div className={styles.form}>
        {hideHeader ? null : <h1>Create new {resource.capital}</h1>}
        {isLoading ? <div>Processing...</div> : null}
        <Form
          onSubmit={this.handleSubmit}
          disabled={isLoading}
          initialValues={initialValues}
        />
      </div>
    )
  }
}

const mapStateToProps = (state: ReduxState, props: OuterProps): StateProps => {
  const api = state.api[props.resource.name]
  return {
    isLoading: api.isLoading,
    error: api.error,
  }
}

export default connect(mapStateToProps, { create })(CreateView)
