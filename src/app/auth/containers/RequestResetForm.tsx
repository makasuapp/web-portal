import { InjectedFormProps, reduxForm } from "redux-form";

import React from "react";
import { TextField } from "redux-form-fields-lib";

export interface RequestResetFormValues {
  email: string;
}

interface OuterProps {
  disabled?: boolean;
}

type Props = OuterProps & InjectedFormProps<RequestResetFormValues, OuterProps>;

class RequestResetForm extends React.Component<Props> {
  render() {
    const { handleSubmit, disabled } = this.props;

    return (
      <form onSubmit={handleSubmit}>
        <TextField name="email" label="Email" type="email" isRequired />
        <button className="btn btn-primary" type="submit" disabled={disabled}>
          Submit
        </button>
      </form>
    );
  }
}

export default reduxForm<RequestResetFormValues, OuterProps>({
  form: "request_reset",
})(RequestResetForm);
