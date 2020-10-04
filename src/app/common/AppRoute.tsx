import { Route } from 'react-router-dom'

import { ApiReducerState } from './duck/reducers'
import Layout from './components/Layout'
import LoadingPage from './components/LoadingPage'
import React from 'react'
import { ReduxState } from 'reducers'
import { connect } from 'react-redux'
import { registerResource } from './duck/actions'
import { isOwner, UserState } from 'app/models/user'

interface StateProps {
  resources: ApiReducerState
  user: UserState
}

interface DispatchProps {
  registerResource: (resourceName: string) => void
}

interface OuterProps {
  resourceNames?: string[]
  path?: string
  component: any
  exact?: boolean
  protection?: ProtectionType
}

type Props = StateProps & OuterProps & DispatchProps

export enum ProtectionType {
  Authenticated,
  Owner,
}

//should also do kitchen check here?
//TODO(test)
const AuthCheck = (
  pathDef: string,
  path: string,
  user: UserState,
  protection?: ProtectionType
): boolean => {
  if (protection !== undefined) {
    if (user !== undefined) {
      switch (protection) {
        case ProtectionType.Authenticated:
          return user !== null
        case ProtectionType.Owner:
          return !!isOwner(user)
      }
    } else {
      //still loading, pass auth for now
      return true
    }
  } else {
    return true
  }
}

class AppRoute extends React.Component<Props> {
  componentDidMount() {
    const { resourceNames, resources } = this.props
    if (resourceNames !== undefined) {
      resourceNames.forEach((name) => {
        if (resources[name] === undefined) {
          this.props.registerResource(name)
        }
      })
    }
  }

  componentDidUpdate(prevProps: Props) {
    const { resourceNames, resources } = this.props
    if (
      resourceNames !== undefined &&
      resourceNames !== prevProps.resourceNames
    ) {
      resourceNames.forEach((name) => {
        if (resources[name] === undefined) {
          this.props.registerResource(name)
        }
      })
    }
  }

  mkComponent(props) {
    const { resourceNames, resources } = this.props
    const Component = this.props.component

    //need to register but hasn't registered
    if (
      resourceNames !== undefined &&
      resourceNames.filter((name) => resources[name] === undefined).length > 0
    ) {
      return <LoadingPage />
    } else {
      return <Component {...props} />
    }
  }

  isAuthed(pathDef: string): boolean {
    const { protection, user } = this.props
    return AuthCheck(pathDef, window.location.pathname, user, protection)
  }

  render() {
    const { path, exact } = this.props

    if (path === undefined) {
      return (
        <Route
          render={(props) => (
            <Layout {...props}>{this.mkComponent(props)}</Layout>
          )}
        />
      )
    }

    if (this.isAuthed(path)) {
      return (
        <Route
          path={path}
          exact={exact}
          render={(props) => (
            <Layout {...props}>{this.mkComponent(props)}</Layout>
          )}
        />
      )
    } else {
      return (
        <Route
          path={path}
          exact={exact}
          render={(props) => (
            <Layout {...props}>
              <div>
                Unauthorized to view this page. If this is unexpected, try
                logging in with a different account or contact support.
              </div>
            </Layout>
          )}
        />
      )
    }
  }
}

const mapStateToProps = (state: ReduxState) => {
  return {
    resources: state.api,
    user: state.auth.currentUser,
  }
}

export default connect(mapStateToProps, { registerResource })(AppRoute)
