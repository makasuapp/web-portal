import React from 'react'
import { connect } from 'react-redux'
import { ReduxState } from 'reducers'
import { Link } from 'react-router-dom'
import moment from 'moment'

import { OrderResource } from '../resource'
import { RecipeResource } from '../../recipes/resource'
import { fetchOrders } from '../duck/actions'
import { Recipe } from 'app/models/recipe'
import OrderList from '../components/OrderList'
import IndexView from 'app/common/containers/IndexView'
import { Params } from 'app/common/ResourceHelper'
import TopBar from 'app/common/components/TopBar'
import { Kitchen } from 'app/models/user'
import { displayDateFormat } from 'app/common/DateHelper'

interface DispatchProps {
  fetchOrders: (params?: Params) => void
}

interface StateProps {
  recipesMap: { [key: number]: Recipe }
  currentKitchen?: Kitchen
}

type Props = StateProps & DispatchProps

class OrderIndex extends React.Component<Props> {
  render() {
    const { recipesMap, currentKitchen } = this.props

    if (currentKitchen === undefined) {
      return <div>No kitchen selected</div>
    }

    return (
      <div>
        <TopBar
          items={[
            <Link key="new" className={'btn btn-primary'} to={'/orders/new'}>
              New Order
            </Link>,
          ]}
        />
        <IndexView
          headerOverride={`Orders for ${moment().format(displayDateFormat)}`}
          resource={OrderResource}
          fetchResources={this.props.fetchOrders}
          params={{ kitchen_id: currentKitchen.id, all: true }}>
          <OrderList recipesMap={recipesMap} />
        </IndexView>
      </div>
    )
  }
}

const mapStateToProps = (state: ReduxState): StateProps => {
  const recipeState = state.api[RecipeResource.name]
  return {
    recipesMap: recipeState.byId as { [key: number]: Recipe },
    currentKitchen: state.auth.currentKitchen,
  }
}

export default connect(mapStateToProps, { fetchOrders })(OrderIndex)
