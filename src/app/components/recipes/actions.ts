import useSWR from 'swr'
import { fetcher } from 'app/utils/fetcher'
import { Kitchen } from 'app/models/user'
import { Recipe, RecipeStep } from 'app/models/recipe'
import { Ingredient } from 'app/models/ingredient'
import { RecipeResource } from '../../resources/RecipeResource'

interface RecipesResponse {
  recipes: Recipe[]
  ingredients: Ingredient[]
}

interface RecipeResponse {
  recipe: Recipe
  recipe_steps: RecipeStep[]
}

export const recipeUrl = (id: number, currentKitchen: Kitchen) =>
  RecipeResource.showUrl(id, { kitchen_id: currentKitchen.id })

export const useRecipe = (id: number, currentKitchen?: Kitchen) => {
  const { data, error, mutate } = useSWR(
    currentKitchen ? recipeUrl(id, currentKitchen) : null,
    fetcher
  )

  const recipeData: RecipeResponse = data
  const recipeError = error
  const mutateRecipe = mutate

  return {
    recipeData,
    recipeError,
    mutateRecipe,
  }
}

export const useRecipes = (currentKitchen?: Kitchen) => {
  const { data, error, mutate } = useSWR(
    currentKitchen
      ? RecipeResource.indexUrl({ kitchen_id: currentKitchen.id })
      : null,
    fetcher
  )

  const recipesData: RecipesResponse = data
  const recipesError = error
  const mutateRecipes = mutate

  return {
    recipesData,
    recipesError,
    mutateRecipes,
  }
}
