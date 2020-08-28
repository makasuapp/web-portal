import { InjectedFormProps, reduxForm } from 'redux-form'

import React from 'react';
import {TextField} from "redux-form-fields-lib";

export interface LoginFormValues {
  email: string
  password: string
}

type Props = InjectedFormProps<LoginFormValues> 

const LoginForm = (props: Props) => {
  const {handleSubmit, disabled} = props;

  return <form onSubmit={handleSubmit}>
    <TextField name="email" label="Email" type="email" isRequired />
    <TextField name="password" label="Password" type="password" isRequired />
    <button className="btn btn-primary" type="submit" disabled={disabled}>Submit</button>
  </form>
};

export default reduxForm({
  form: 'login'
})(LoginForm);
