import { idFromUrl } from 'app/resources/ResourceHelper'
import LoadingPage from 'app/components/common/LoadingPage'
import React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { Kitchen } from 'app/models/user'
import { connect } from 'react-redux'
import { ReduxState } from 'reducers'
import { useRecipe, useRecipes } from '../actions'
import ErrorPage from 'app/components/common/ErrorPage'
import RecipeForm from '../components/RecipeForm'
import UnitConverter from 'app/utils/UnitConverter'
import { edit } from 'app/components/common/form/actions'
import { RecipeResource } from 'app/resources/RecipeResource'
import { toast } from 'react-toastify'

interface Params {
  id: string
}

interface StateProps {
  currentKitchen?: Kitchen
}

type Props = RouteComponentProps<Params> & StateProps

const RecipeEdit = (props: Props) => {
  const id = idFromUrl(props)
  const { currentKitchen } = props

  const { recipeData, recipeError } = useRecipe(id, currentKitchen)
  const { recipesData, recipesError } = useRecipes(currentKitchen)

  if (recipeError || recipesError) return <ErrorPage />
  if (!recipeData || !recipesData) return <LoadingPage />
  if (!currentKitchen) {
    return <div>No kitchen found</div>
  }

  const { recipe, recipe_steps } = recipeData

  return (
    <RecipeForm
      initialValues={Object.assign({}, recipe, {
        current_price:
          recipe.current_price_cents && recipe.current_price_cents / 100.0,
        gram_per_tbsp: UnitConverter.gramsPerTbsp(recipe.volume_weight_ratio),
        recipe_steps: recipe_steps
          //go in reverse chronological first to reduce min/max
          .sort((a, b) => b.number - a.number)
          .reduce(
            (
              obj: {
                prevMinBeforeSec: number
                prevMaxBeforeSec: number
                recipeSteps: any[]
              },
              recipeStep,
              index
            ) => {
              const newRecipeStep = Object.assign({}, recipeStep, {
                number: index + 1,
                min_before_min: recipeStep.min_before_sec
                  ? (recipeStep.min_before_sec - obj.prevMinBeforeSec) / 60.0
                  : undefined,
                max_before_min: recipeStep.max_before_sec
                  ? (recipeStep.max_before_sec - obj.prevMaxBeforeSec) / 60.0
                  : undefined,
              })
              const prevMinBeforeSec = recipeStep.min_before_sec || 0
              const prevMaxBeforeSec = recipeStep.max_before_sec || 0

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
          )
          .recipeSteps //sort back in chronological
          .sort((a, b) => b.number - a.number),
      })}
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

        edit(id, RecipeResource, data)
          .then((resp) => {
            //TODO(swr): mutate recipe to be resp
            props.history.push(RecipeResource.showPath(resp.recipe.id))
            toast.success('Successfully edited recipe')
            actions.setSubmitting(false)
          })
          .catch((err) => {
            toast.error(
              "An error occurred saving this recipe. Please check that all required fields are set and you aren't converting between weight/volume without a ratio set"
            )
            actions.setSubmitting(false)
          })
      }}
      recipes={recipesData.recipes}
      ingredients={recipesData.ingredients}
    />
  )
}

const mapStateToProps = (state: ReduxState): StateProps => {
  return {
    currentKitchen: state.auth.currentKitchen,
  }
}

export default connect(mapStateToProps, {})(RecipeEdit)
