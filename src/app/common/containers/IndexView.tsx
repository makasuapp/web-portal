import React, { ReactElement, ReactNode } from 'react'
import { Resource, ResourceRecord } from '../ResourceHelper';

import LoadingPage from 'app/common/LoadingPage';
import {ReduxState} from "reducers";
import { connect } from 'react-redux';
import { fetch } from '../duck/actions';
import styles from './Index.module.css'

interface StateProps {
  isFetching: boolean
  hasFetched: boolean
  data: ResourceRecord[] 
}

interface DispatchProps {
  fetch: (resource: Resource) => void
}

interface OuterProps {
  resource: Resource
  topBarItems?: ReactNode[]
  fetchResources?: () => void
  children: ReactElement<{data?: ResourceRecord[]}> 
}

type Props = StateProps & DispatchProps & OuterProps

class IndexView extends React.Component<Props> {
  componentDidMount() {
    if (!this.props.hasFetched) {
      if (this.props.fetchResources !== undefined) {
        this.props.fetchResources()
      } else {
        this.props.fetch(this.props.resource)
      }
    }
  }

  render() {
    const {data, isFetching, resource, children, topBarItems = []} = this.props

    let list
    if (isFetching) {
      list = <LoadingPage />
    } else if (data.length === 0) {
      list = <div>Nothing to see here yet!</div>
    } else {
      list = React.cloneElement(children, {data})
    }

    return <div>
      <div className={styles.topBar}>
        {topBarItems}
      </div>

      <h1>{resource.pluralCapital}</h1>
      {list}
    </div>
  }
}

const mapStateToProps = (state: ReduxState, props: OuterProps) => {
  const resourceState = state.api[props.resource.name]
  return {
    isFetching: resourceState.isFetching,
    hasFetched: resourceState.hasFetched,
    data: resourceState.data
  }
};

export default connect(mapStateToProps, {fetch})(IndexView);