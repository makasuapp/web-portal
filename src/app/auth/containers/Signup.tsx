import {Link, RouteComponentProps} from 'react-router-dom';
import React, {Component} from 'react';
import SignupForm, { SignupFormValues } from "./SignupForm";

import {AuthState} from "../duck/reducers";
import {ReduxState} from "reducers";
import { SignupRequestData } from 'app/models/user';
import { connect } from 'react-redux';
import {signup} from "../duck/actions";
import styles from "./Auth.module.css";
import { toast } from 'react-toastify';

interface Params {
  email?: string
}

interface StateProps {
  auth: AuthState
}

interface DispatchProps {
  signup: (data: SignupRequestData) => void
}

type Props = StateProps & DispatchProps & RouteComponentProps<Params>

class Signup extends Component<Props> {
  componentDidMount() {
    if (this.props.auth.currentUser !== null) {
      this.props.history.push("/")
    }
  }

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.auth.currentUser !== null) {
      toast.success("Successfully signed up!");
      this.props.history.push("/")
    }

    if (nextProps.auth.errors.length > 0 && nextProps.auth.errors !== this.props.auth.errors) {
      nextProps.auth.errors.forEach((error) => {
        toast.error(error);
      })
    }
  }

  handleSubmit = (form: SignupFormValues) => {
    this.props.signup({
      user: {
        first_name: form.first_name,
        last_name: form.last_name,
        phone_number: form.phone_number,
        email: form.email,
        password: form.password,
        password_confirmation: form.password_confirmation
      },
    })
  }

  render() {
    const {auth} = this.props;
    const providedEmail = this.props.match.params.email

    return <div className={styles.form}>
      <h4>Create an account by filling out the form</h4>
      <p className={styles.top}>Already have an account? <Link to={"/login"}>Login</Link></p>
      <SignupForm onSubmit={this.handleSubmit} 
        disabled={auth.isAuthenticating || auth.currentUser !== null}
        providedEmail={providedEmail}
        initialValues={{email: providedEmail}}
      />
      {auth.isAuthenticating ? <div className={styles.top}>Signing up...</div> : null}
    </div>
  }
}

const mapStateToProps = (state: ReduxState) => {
  return {
    auth: state.auth
  }
};

export default connect(mapStateToProps, {signup})(Signup);
