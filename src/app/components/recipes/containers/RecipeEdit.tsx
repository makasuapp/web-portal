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
        recipe_steps: recipe_steps.map((recipeStep) =>
          Object.assign({}, recipeStep, {
            min_before_min:
              recipeStep.min_before_sec && recipeStep.min_before_sec / 60.0,
            max_before_min:
              recipeStep.max_before_sec && recipeStep.max_before_sec / 60.0,
          })
        ),
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

        edit(id, RecipeResource, data, (resp) => {
          //TODO(swr): mutate recipe to be resp
          props.history.push(RecipeResource.showPath(resp.recipe.id))
          toast.success('Successfully edited recipe')
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
