import { Route } from 'react-router-dom'

import {ApiReducerState} from './duck/reducers'
import Layout from "./Layout";
import LoadingPage from './LoadingPage';
import React from 'react'
import {ReduxState} from "reducers";
import { connect } from 'react-redux';
import { registerResource } from './duck/actions';

interface StateProps {
  resources: ApiReducerState
}

interface DispatchProps {
  registerResource: (resourceName: string) => void
}

interface OuterProps {
  resourceNames?: string[]
  path?: string
  component: any
  exact?: boolean
}

type Props = StateProps & OuterProps & DispatchProps

class AppRoute extends React.Component<Props> {
  componentDidMount() {
    const {resourceNames, resources} = this.props
    if (resourceNames !== undefined) {
      resourceNames.forEach((name) => {
        if (resources[name] === undefined) {
          this.props.registerResource(name)
        }
      })
    }
  }

  componentDidUpdate(prevProps: Props) {
    const {resourceNames, resources} = this.props
    if (resourceNames !== undefined && resourceNames !== prevProps.resourceNames) {
      resourceNames.forEach((name) => {
        if (resources[name] === undefined) {
          this.props.registerResource(name)
        }
      })
    }
  }

  mkComponent(props) {
    const {resourceNames, resources} = this.props
    const Component = this.props.component

    //need to register but hasn't registered
    if (resourceNames !== undefined && resourceNames.filter((name) => resources[name] === undefined).length > 0) {
      return <LoadingPage />
    } else {
      return <Component {...props} />
    }
  }

  render() {
    const {path, exact} = this.props

    if (path === undefined) {
      return <Route render={props => (
        <Layout {...props}>
          {this.mkComponent(props)} 
        </Layout>
      )} />
    }

    return <Route path={path} exact={exact} render={props => (
      <Layout {...props}>
        {this.mkComponent(props)} 
      </Layout>
    )} />
  }
}

const mapStateToProps = (state: ReduxState) => {
  return {
    resources: state.api
  }
};

export default connect(mapStateToProps, {registerResource})(AppRoute);