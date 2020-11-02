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
import { number } from 'yup'
import { RecipeStep } from 'app/models/recipe'

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
            recipe_steps: values.recipe_steps
              .map((recipeStep, index) => {
                return Object.assign({}, recipeStep, { number: index + 1 })
              })
              //go in reverse chronological first to reduce min/max
              .sort((a, b) => b.number - a.number)
              .reduce(
                (
                  obj: {
                    prevMinBeforeSec: number
                    prevMaxBeforeSec: number
                    recipeSteps: any[]
                  },
                  recipeStep
                ) => {
                  const prevMinBeforeSec =
                    obj.prevMinBeforeSec + (recipeStep.min_before_min || 0) * 60
                  const prevMaxBeforeSec =
                    obj.prevMaxBeforeSec + (recipeStep.max_before_min || 0) * 60
                  const newRecipeStep = Object.assign({}, recipeStep, {
                    min_before_min: undefined,
                    min_before_sec:
                      prevMinBeforeSec > 0 ? prevMinBeforeSec : undefined,
                    max_before_min: undefined,
                    max_before_sec:
                      prevMaxBeforeSec > 0 ? prevMaxBeforeSec : undefined,
                  })

                  return {
                    prevMinBeforeSec,
                    prevMaxBeforeSec,
                    recipeSteps: obj.recipeSteps.concat(newRecipeStep),
                  }
                },
                {
                  prevMinBeforeSec: 0,
                  prevMaxBeforeSec: 0,
                  recipeSteps: [],
                }
              ).recipeSteps,
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
