import useSWR from 'swr'
import { fetcher } from 'app/utils/fetcher'
import { Kitchen } from 'app/models/user'
import { Ingredient } from 'app/models/ingredient'
import { IngredientResource } from '../../resources/IngredientResource'

export const useIngredients = (currentKitchen?: Kitchen) => {
  const { data, error, mutate } = useSWR(
    currentKitchen
      ? IngredientResource.indexUrl({ kitchen_id: currentKitchen.id })
      : null,
    fetcher
  )

  const ingredientData: Ingredient[] = data
  const ingredientError = error
  const mutateIngredient = mutate

  return {
    ingredientData,
    ingredientError,
    mutateIngredient,
  }
}
