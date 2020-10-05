import React from 'react'
import { connect } from 'react-redux'
import { ReduxState } from 'reducers'
import { Link } from 'react-router-dom'

import { RecipeResource } from '../resource'
import IndexView from 'app/common/containers/IndexView'
import TopBar from 'app/common/components/TopBar'
import { Kitchen } from 'app/models/user'
import RecipeList from '../components/RecipeList'

interface StateProps {
  currentKitchen?: Kitchen
}

type Props = StateProps

class RecipesIndex extends React.Component<Props> {
  render() {
    const { currentKitchen } = this.props

    if (currentKitchen === undefined) {
      return <div>No kitchen selected</div>
    }

    return (
      <div>
        <TopBar
          items={[
            <Link
              key="new"
              className={'btn btn-primary'}
              to={RecipeResource.newPath}>
              New Recipe
            </Link>,
          ]}
        />
        <IndexView
          resource={RecipeResource}
          params={{ kitchen_id: currentKitchen.id }}>
          <RecipeList />
        </IndexView>
      </div>
    )
  }
}

const mapStateToProps = (state: ReduxState): StateProps => {
  return {
    currentKitchen: state.auth.currentKitchen,
  }
}

export default connect(mapStateToProps, {})(RecipesIndex)
