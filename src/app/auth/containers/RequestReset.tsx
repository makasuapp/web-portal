import React, { Component } from 'react'
import RequestResetForm, { RequestResetFormValues } from './RequestResetForm'

import { AuthState } from '../duck/reducers'
import { ReduxState } from 'reducers'
import { RouteComponentProps } from 'react-router-dom'
import { connect } from 'react-redux'
import queryString from 'query-string'
import { requestReset } from '../duck/actions'
import styles from './Auth.module.css'
import { toast } from 'react-toastify'

interface StateProps {
  auth: AuthState
}

interface DispatchProps {
  requestReset: (email: string) => void
}

type Props = StateProps & DispatchProps & RouteComponentProps

class RequestReset extends Component<Props> {
  componentDidMount() {
    if (this.props.auth.currentUser !== null) {
      const values = queryString.parse(this.props.location.search)
      if (typeof values.redirect === 'string') {
        this.props.history.push(values.redirect)
      } else {
        this.props.history.push('/')
      }
    }
  }

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
        toast.success('Successfully requested! Please check your email shortly')
        this.props.history.push('/login')
      }
    }
  }

  handleSubmit = (form: RequestResetFormValues) => {
    this.props.requestReset(form.email)
  }

  render() {
    const { auth } = this.props

    return (
      <div className={styles.form}>
        <p>
          Enter the email of your account and we'll send you a link to reset
          your password.
        </p>
        <p>
          If you don't know the email of your account, please contact support.
        </p>
        {auth.isAuthenticating ? (
          <div className={styles.top}>Requesting...</div>
        ) : null}
        <RequestResetForm
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

export default connect(mapStateToProps, { requestReset })(RequestReset)
