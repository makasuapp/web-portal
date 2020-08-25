import React from 'react';
import { connect } from 'react-redux';
import {ReduxState} from "reducers";
import { Link } from 'react-router-dom'

import { OrderResource } from '../resource';
import { RecipeResource } from '../../recipes/resource';
import { fetchOrders } from '../duck/actions';
import { fetch } from 'app/common/duck/actions';
import { Order } from 'app/models/order';
import { Recipe }  from 'app/models/recipe';
import OrderList from '../components/OrderList';
import IndexView from 'app/common/containers/IndexView';
import { Params } from 'app/common/ResourceHelper';
import TopBar from 'app/common/components/TopBar';

interface DispatchProps {
  fetchOrders: (params?: Params) => void
}

interface StateProps {
  isFetching: boolean
  hasFetched: boolean
  orders: Order[] 
  recipesMap: {[key: number]: Recipe}
}

type Props = StateProps & DispatchProps 

class OrderIndex extends React.Component<Props> {
  render() {
    const {recipesMap} = this.props

    //TODO(kitchenId)
    return <div>
      <TopBar items={[
        <Link 
          className={"btn btn-primary"}
          to={"/orders/new"}>
            New Order
        </Link>
      ]} />
      <IndexView
        resource={OrderResource}
        fetchResources={this.props.fetchOrders}
        params={{kitchen_id: 1, all: true, env: "dev"}}
      >
        <OrderList recipesMap={recipesMap} />  
      </IndexView>
    </div>
  }
}

const mapStateToProps = (state: ReduxState) => {
  const recipeState = state.api[RecipeResource.name]
  return {
    recipesMap: recipeState.byId as {[key: number]: Recipe}
  }
};

export default connect(mapStateToProps, {fetchOrders, fetch})(OrderIndex)
