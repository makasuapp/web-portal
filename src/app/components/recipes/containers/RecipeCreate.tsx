import LoadingPage from 'app/components/common/LoadingPage'
import React from 'react'
import { Kitchen } from 'app/models/user'
import { connect } from 'react-redux'
import { ReduxState } from 'reducers'
import { RouteComponentProps } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useRecipes } from '../actions'
import ErrorPage from 'app/components/common/ErrorPage'
import RecipeForm from '../components/RecipeForm'
import UnitConverter from 'app/utils/UnitConverter'
import { create } from 'app/components/common/form/actions'
import { RecipeResource } from 'app/resources/RecipeResource'

interface StateProps {
  currentKitchen?: Kitchen
}

type Props = StateProps & RouteComponentProps

const RecipeCreate = (props: Props) => {
  const { currentKitchen } = props

  const { recipesData, recipesError } = useRecipes(currentKitchen)

  if (recipesError) return <ErrorPage />
  if (!recipesData) return <LoadingPage />

  if (!currentKitchen) {
    return <div>No kitchen found</div>
  }

  return (
    <RecipeForm
      recipes={recipesData.recipes}
      ingredients={recipesData.ingredients}
      handleSubmit={(values, actions) => {
        const data = {
          recipe: Object.assign({}, values, {
            current_price_cents:
              values.current_price && values.current_price * 100.0,
            current_price: undefined,
            volume_weight_ratio: UnitConverter.getVolumeWeightRatio(
              values.gram_per_tbsp
            ),
            gram_per_tbsp: undefined,
            recipe_steps: values.recipe_steps.map((recipeStep, index) =>
              Object.assign({}, recipeStep, {
                number: index + 1,
                min_before_min: undefined,
                min_before_sec:
                  recipeStep.min_before_min && recipeStep.min_before_min * 60,
                max_before_min: undefined,
                max_before_sec:
                  recipeStep.max_before_min && recipeStep.max_before_min * 60,
              })
            ),
          }),
          kitchen_id: currentKitchen.id,
        }

        create(RecipeResource, data)
          .then((resp) => {
            //TODO(swr): mutate recipe to be resp
            props.history.push(RecipeResource.showPath(resp.recipe.id))
            toast.success('Successfully created recipe')
            actions.setSubmitting(false)
          })
          .catch((err) => {
            toast.error(
              "An error occurred saving this recipe. Please check that all required fields are set and you aren't converting between weight/volume without a ratio set"
            )
            actions.setSubmitting(false)
          })
      }}
    />
  )
}

const mapStateToProps = (state: ReduxState): StateProps => {
  return {
    currentKitchen: state.auth.currentKitchen,
  }
}

export default connect(mapStateToProps, {})(RecipeCreate)
