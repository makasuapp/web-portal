import React, { Component } from 'react'
import ResetForm, { ResetFormValues } from './ResetForm'

import { AuthState } from '../duck/reducers'
import { ReduxState } from 'reducers'
import { RouteComponentProps } from 'react-router-dom'
import { connect } from 'react-redux'
import queryString from 'query-string'
import { resetPassword } from '../duck/actions'
import styles from './Auth.module.css'
import { toast } from 'react-toastify'

interface StateProps {
  auth: AuthState
}

interface DispatchProps {
  resetPassword: (token: string, form: ResetFormValues) => void
}

type Props = StateProps & DispatchProps & RouteComponentProps

class Reset extends Component<Props> {
  componentDidUpdate(prevProps: Props) {
    if (prevProps.auth.isAuthenticating && !this.props.auth.isAuthenticating) {
      if (
        this.props.auth.errors.length > 0 &&
        prevProps.auth.errors !== this.props.auth.errors
      ) {
        this.props.auth.errors.forEach((error) => {
          toast.error(error)
        })
      } else {
        toast.success('Successfully reset password!')
        this.props.history.push('/login')
      }
    }
  }

  handleSubmit = (form: ResetFormValues) => {
    const values = queryString.parse(this.props.location.search)
    if (typeof values.token === 'string') {
      this.props.resetPassword(values.token, form)
    }
  }

  render() {
    const { auth } = this.props

    return (
      <div className={styles.form}>
        {auth.isAuthenticating ? (
          <div className={styles.top}>Resetting...</div>
        ) : null}
        <ResetForm
          onSubmit={this.handleSubmit}
          disabled={auth.isAuthenticating}
        />
      </div>
    )
  }
}

const mapStateToProps = (state: ReduxState) => {
  return {
    auth: state.auth,
  }
}

export default connect(mapStateToProps, { resetPassword })(Reset)
