import React from 'react';
import { InjectedFormProps, reduxForm } from 'redux-form'
import {TextField} from "redux-form-fields-lib";

export interface SignupFormValues {
  first_name: string
  last_name?: string
  email: string
  phone_number?: string
  password: string
  password_confirmation: string
}

interface OuterProps {
  providedEmail?: string
  disabled?: boolean
}

type OtherProps = OuterProps 
type Props = OtherProps & InjectedFormProps<SignupFormValues, OtherProps> 

class SignupForm extends React.Component<Props> {
  render() {
    const {handleSubmit, disabled, providedEmail} = this.props;

    return <form onSubmit={handleSubmit}>
      <TextField name="first_name" label="First Name" type="text" isRequired />
      <TextField name="last_name" label="Last Name" type="text" />
      <TextField name="email" label="Email" type="email" isRequired isDisabled={providedEmail !== undefined} />
      <TextField name="phone_number" label="Phone Number " type="text" />
      <TextField name="password" label="Password" type="password" isRequired />
      <TextField name="password_confirmation" label="Re-type Password" type="password" isRequired />

      <button className="btn btn-primary" type="submit" disabled={disabled}>Submit</button>
    </form>
  }
}

export default reduxForm<SignupFormValues, OtherProps>({
  form: 'signup'
})(SignupForm);
