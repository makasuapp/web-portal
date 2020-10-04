import React, { ReactElement } from 'react'
import { Resource, ResourceRecord, Params } from '../ResourceHelper'

import LoadingPage from 'app/common/components/LoadingPage'
import { ReduxState } from 'reducers'
import { connect } from 'react-redux'
import { fetch } from '../duck/actions'

interface StateProps {
  isFetching: boolean
  hasFetched: boolean
  data: ResourceRecord[]
}

interface DispatchProps {
  fetch: (resource: Resource, params?: Params) => void
}

interface OuterProps {
  headerOverride?: string
  resource: Resource
  fetchResources?: (params?: Params) => void
  children: ReactElement<{ data?: ResourceRecord[] }>
  params?: Params
}

type Props = StateProps & DispatchProps & OuterProps

class IndexView extends React.Component<Props> {
  componentDidMount() {
    //do we actually only want to do this if hasn't fetched or would want to refresh still?
    if (!this.props.hasFetched) {
      if (this.props.fetchResources !== undefined) {
        this.props.fetchResources(this.props.params)
      } else {
        this.props.fetch(this.props.resource, this.props.params)
      }
    }
  }

  render() {
    const { data, isFetching, resource, children, headerOverride } = this.props

    let list
    if (isFetching) {
      list = <LoadingPage />
    } else if (data.length === 0) {
      list = <div>Nothing to see here yet!</div>
    } else {
      list = React.cloneElement(children, { data })
    }

    const headerText = headerOverride ?? resource.pluralCapital

    return (
      <div>
        <h1>{headerText}</h1>
        {list}
      </div>
    )
  }
}

const mapStateToProps = (state: ReduxState, props: OuterProps) => {
  const resourceState = state.api[props.resource.name]
  return {
    isFetching: resourceState.isFetching,
    hasFetched: resourceState.hasFetched,
    data: resourceState.data,
  }
}

export default connect(mapStateToProps, { fetch })(IndexView)
