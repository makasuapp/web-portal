import { Link, RouteComponentProps } from 'react-router-dom';
import LoginForm, { LoginFormValues } from './LoginForm';
import React, {Component} from 'react';

import {AuthState} from "../duck/reducers";
import {ReduxState} from "reducers";
import {authenticate} from "../duck/actions";
import { connect } from 'react-redux';
import styles from "./Auth.module.css";
import { toast } from 'react-toastify';

interface StateProps {
  auth: AuthState
}

interface DispatchProps {
  authenticate: (newUser: LoginFormValues) => void
}

type Props = StateProps & DispatchProps & RouteComponentProps

class Login extends Component<Props> {
  componentDidMount() {
    if (this.props.auth.currentUser !== null) {
      this.props.history.push("/")
    }
  }

  componentWillReceiveProps(nextProps: Props) {
    if (this.props.auth.currentUser === null && nextProps.auth.currentUser !== null) {
      toast.success("Successfully signed in!");
      this.props.history.push("/")
    }

    if (nextProps.auth.errors.length > 0 && nextProps.auth.errors !== this.props.auth.errors) {
      nextProps.auth.errors.forEach((error) => {
        toast.error(error)
      })
    }
  }

  handleSubmit = (form: LoginFormValues) => {
    this.props.authenticate(form)
  }

  render() {
    const {auth} = this.props;

    return <div className={styles.form}>
      {auth.isAuthenticating ? <div>Logging in...</div> : null}
      <LoginForm onSubmit={this.handleSubmit} disabled={auth.isAuthenticating || auth.currentUser !== null} />
      <p className={styles.bottom}>Don't have an account? <Link to={"/signup"}>Sign up</Link></p>
    </div>
  }
}

const mapStateToProps = (state: ReduxState) => {
  return {
    auth: state.auth
  }
};

export default connect(mapStateToProps, {authenticate})(Login);
