import { InjectedFormProps, reduxForm } from 'redux-form'

import React from 'react';
import {TextField} from "redux-form-fields-lib";

export interface ResetFormValues {
  password: string
  password_confirmation: string
}

interface OuterProps {
  disabled?: boolean
}

type Props = OuterProps & InjectedFormProps<ResetFormValues, OuterProps> 

class ResetForm extends React.Component<Props> {
  render() {
    const {handleSubmit, disabled} = this.props;

    return <form onSubmit={handleSubmit}>
      <TextField name="password" label="New Password" type="password" isRequired />
      <TextField name="password_confirmation" label="Re-type Password" type="password" isRequired />
      <button className="btn btn-primary" type="submit" disabled={disabled}>Submit</button>
    </form>
  }
}

export default reduxForm<ResetFormValues, OuterProps>({
  form: 'reset'
})(ResetForm);

