import React, {Component, ComponentType} from 'react';
import { Resource, ResourceRecord } from 'app/common/ResourceHelper';
import {edit, show} from "../../common/duck/actions";

import { InjectedFormProps } from 'redux-form'
import LoadingPage from 'app/common/LoadingPage';
import {ReduxState} from "reducers";
import { connect } from 'react-redux';
import styles from './Form.module.css'
import { toast } from 'react-toastify';

interface StateProps {
  isFetching: boolean
  isLoading: boolean
  error?: string
  datum?: ResourceRecord
}

interface DispatchProps {
  edit: (resource: Resource, id: number, formData: object) => void
  show: (resource: Resource, id: number) => void
}

interface OuterProps {
  id: number
  resource: Resource
  Form: ComponentType<InjectedFormProps>
  onEdit: () => void
  getInitialValues: (datum: ResourceRecord) => object
  handleEdit?: (form: object) => void
  fetchResource?: (id: number) => void
}

type Props = StateProps & DispatchProps & OuterProps

class EditView extends Component<Props> {
  componentDidMount() {
    const {datum, resource, id, show, fetchResource} = this.props
    if (datum === undefined) {
      if (fetchResource !== undefined) {
        fetchResource(id)
      } else {
        show(resource, id)
      }
    }
  }

  componentDidUpdate(prevProps: Props) {
    //TODO(generic): better way to detect succeeded in editing 
    if (!this.props.isLoading && prevProps.isLoading) {
      if (this.props.error !== undefined) {
        toast.error(this.props.error);
      } else {
        toast.success(`Successfully edited ${this.props.resource.name}`)
        this.props.onEdit()
      }
    }
  }

  handleSubmit = (form: object) => {
    const {resource, id, handleEdit, edit} = this.props
    if (handleEdit !== undefined) {
      handleEdit(form)
    } else {
      edit(resource, id, form)
    }
  }

  render() {
    const {isFetching, isLoading, resource, datum, Form, getInitialValues} = this.props

    if (isFetching) {
      return <LoadingPage />
    } else if (datum === undefined) {
      return <div>Nothing to see here</div>
    } else {
      return <div className={styles.form}>
        <h1>Edit {resource.capital}</h1>
        {isLoading ? <div>Processing...</div> : null}
        <Form onSubmit={this.handleSubmit} disabled={isLoading} initialValues={getInitialValues(datum)} />
      </div>
    }
  }
}

const mapStateToProps = (state: ReduxState, props: OuterProps) => {
  const resourceState = state.api[props.resource.name]
  const datum = resourceState.byId[props.id]

  return {
    isLoading: resourceState.isLoading,
    isFetching: resourceState.isFetching,
    hasFetched: resourceState.hasFetched,
    datum,
    error: resourceState.error
  }
};

export default connect(mapStateToProps, {edit, show})(EditView);
