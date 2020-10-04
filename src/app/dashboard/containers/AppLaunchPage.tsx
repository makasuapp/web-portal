import React from 'react'
// import queryString from "query-string";
import { RouteComponentProps } from 'react-router-dom'

type Props = RouteComponentProps

export default class AppLaunchPage extends React.Component<Props> {
  componentDidMount() {
    // const values = queryString.parse(this.props.location.search);
  }

  //TODO(app)
  render() {
    return (
      <div>
        Please download the app below and open the link on your mobile device.
      </div>
    )
  }
}
