import React from 'react'
import { ReduxState } from 'reducers'
import { connect } from 'react-redux'

import { UserState, isOwner, Kitchen, User } from 'app/models/user'
import { setKitchen } from 'app/components/auth/duck/actions'
import SelectKitchen from '../components/SelectKitchen'
import { OwnerDashboard, UserDashboard } from '../components/Dashboards'

interface StateProps {
  user: UserState
  currentKitchen?: Kitchen
}

interface DispatchProps {
  setKitchen: (kitchen: Kitchen) => void
}

type Props = StateProps & DispatchProps

class LandingPage extends React.Component<Props> {
  renderUserView(user: User) {
    const { currentKitchen, setKitchen } = this.props

    if (currentKitchen === undefined) {
      return <SelectKitchen user={user} setKitchen={setKitchen} />
    } else {
      if (isOwner(user)) {
        return <OwnerDashboard user={user} kitchen={currentKitchen} />
      } else {
        return <UserDashboard user={user} kitchen={currentKitchen} />
      }
    }
  }

  render() {
    const { user } = this.props

    if (user === null) {
      return <div>Welcome to Makasu! Please log in to continue.</div>
    } else if (user !== undefined) {
      return this.renderUserView(user)
    } else {
      return (
        <div>
          Nothing to see here. Please make sure you're logged into the right
          account or have been given access.
        </div>
      )
    }
  }
}

const mapStateToProps = (state: ReduxState) => {
  return {
    user: state.auth.currentUser,
    currentKitchen: state.auth.currentKitchen,
  }
}

export default connect(mapStateToProps, { setKitchen })(LandingPage)
