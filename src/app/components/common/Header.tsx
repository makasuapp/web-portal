import { Nav, Navbar } from 'react-bootstrap'
import React, { Component, ReactNode } from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom'

import { ReduxState } from 'reducers'
import { UserState } from 'app/models/user'
import { connect } from 'react-redux'
import { logout } from 'app/components/auth/duck/actions'

interface StateProps {
  user: UserState
}

interface DispatchProps {
  logout: () => void
}

type Props = DispatchProps & StateProps & RouteComponentProps

class Header extends Component<Props> {
  handleLogout() {
    this.props.logout()
    this.nav('/')
  }

  nav(url: string) {
    this.props.history.push(url)
  }

  render() {
    let leftLinks: ReactNode[] = []
    let rightLinks: ReactNode[] = []

    if (this.props.user !== null) {
      rightLinks.push(
        <Nav.Link key="logout" onClick={this.handleLogout.bind(this)}>
          Logout
        </Nav.Link>
      )
    } else {
      rightLinks.push(
        <Nav.Link key="login" onClick={() => this.nav('/login')}>
          Login
        </Nav.Link>
      )
    }

    return (
      <Navbar bg="dark" variant="dark">
        <Nav className="mr-auto">
          <Nav.Link key="home" onClick={() => this.nav('/')}>
            Dashboard
          </Nav.Link>
          {leftLinks}
        </Nav>
        <Nav>{rightLinks}</Nav>
      </Navbar>
    )
  }
}

const mapStateToProps = (state: ReduxState): StateProps => {
  return {
    user: state.auth.currentUser,
  }
}

export default connect(mapStateToProps, { logout })(withRouter(Header))
