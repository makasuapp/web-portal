import React from 'react';
import { connect } from 'react-redux';
import {ReduxState} from "reducers";

import LoadingPage from 'app/common/LoadingPage';
import { OrderResource } from '../resource';
import { RecipeResource } from '../../recipes/resource';
import { fetchOrders } from '../duck/actions';
import { fetch } from 'app/common/duck/actions';
import { Order } from 'app/models/order';
import { Recipe }  from 'app/models/recipe';
import OrderList from '../components/OrderList';

interface DispatchProps {
  fetchOrders: (kitchenId: number, showAll: boolean) => void
}

interface StateProps {
  isFetching: boolean
  hasFetched: boolean
  orders: Order[] 
  recipesMap: {[key: number]: Recipe}
}

type Props = StateProps & DispatchProps 

class OrderListContainer extends React.Component<Props> {
  componentDidMount() {
    //TODO(kitchenId): use actual kitchen id
    if (!this.props.hasFetched) {
      //want want to have both models fetching states
      this.props.fetchOrders(1, true);
    }
  }

  render() {
    const {orders, isFetching, recipesMap} = this.props

    if (isFetching) {
      return <LoadingPage />
    } else if (orders.length === 0) {
      return <div>Nothing to see here yet!</div>
    } else {
      return <OrderList orders={orders} recipesMap={recipesMap} />
    }
  }
}

const mapStateToProps = (state: ReduxState) => {
  const orderState = state.api[OrderResource.name]
  const recipeState = state.api[RecipeResource.name]
  return {
    isFetching: orderState.isFetching,
    hasFetched: orderState.hasFetched,
    orders: orderState.data as Order[],
    recipesMap: recipeState.byId as {[key: number]: Recipe}
  }
};

export default connect(mapStateToProps, {fetchOrders, fetch})(OrderListContainer)
