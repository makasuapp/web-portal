import useSWR from 'swr'
import { fetcher } from 'app/utils/fetcher'
import { Kitchen } from 'app/models/user'
import { Ingredient, IngredientCost } from 'app/models/ingredient'
import { Recipe, RecipeStep } from 'app/models/recipe'
import { IngredientResource } from '../../resources/IngredientResource'

export const useIngredients = (currentKitchen?: Kitchen) => {
  const { data, error, mutate } = useSWR(
    currentKitchen
      ? IngredientResource.indexUrl({ kitchen_id: currentKitchen.id })
      : null,
    fetcher
  )

  const ingredientsData: Ingredient[] = data
  const ingredientsError = error
  const mutateIngredients = mutate

  return {
    ingredientsData,
    ingredientsError,
    mutateIngredients,
  }
}

interface CostResponse {
  costs: IngredientCost[]
  ingredients: Ingredient[]
  recipes: Recipe[]
  recipe_steps: RecipeStep[]
}

export const useIngredientCosts = (currentKitchen?: Kitchen) => {
  const { data, error, mutate } = useSWR(
    currentKitchen
      ? `/procurement/costs?kitchen_id=${currentKitchen.id}`
      : null,
    fetcher
  )

  const costData: CostResponse = data
  const costError = error
  const mutateCost = mutate

  return {
    costData,
    costError,
    mutateCost,
  }
}
