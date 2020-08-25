import React from 'react'
import { Link } from 'react-router-dom'
import TopBar from 'app/common/components/TopBar'

export default class PredictedOrdersIndex extends React.Component {
  render() {
    //add date picker
    //based on date picker, set date for index
    return <div>
      <TopBar items={[
        <Link 
          className={"btn btn-primary"}
          to={"/predicted_orders/new"}>
            Add Predicted Orders
        </Link>
      ]} />
    </div>
  }
}