import {Nav, Navbar} from 'react-bootstrap'
import React, {Component} from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import {ReduxState} from "reducers";
import { connect } from 'react-redux';


type Props = RouteComponentProps 

class Header extends Component<Props> {
  nav(url: string) {
    this.props.history.push(url)
  }

  render() {
    return <Navbar bg="dark" variant="dark">
      <Nav className="mr-auto">
        <Nav.Link key="home" onClick={() => this.nav("/")}>Dashboard</Nav.Link>
      </Nav>
    </Navbar>
  }
}

const mapStateToProps = (state: ReduxState) => {
  return {
  }
};

export default connect(mapStateToProps, {})(withRouter(Header));
