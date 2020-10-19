import { Ingredient, IngredientCost } from 'app/models/ingredient'
import { Recipe, RecipeStep, StepInput } from 'app/models/recipe'
import { resourcesToMap } from 'app/resources/ResourceHelper'
import UnitConverter from './UnitConverter'

class CostCalculator {
  ingredientsMap: { [key: number]: Ingredient } = {}

  recipesMap: { [key: number]: Recipe } = {}

  recipeStepsMap: { [key: number]: RecipeStep } = {}

  ingredientCostsMap: { [key: number]: IngredientCost[] | undefined } = {}

  recipeCostsMap: { [key: number]: number } = {}

  recipeFullyCalculatedMap: { [key: number]: boolean } = {}

  constructor(
    recipes: Recipe[],
    ingredients: Ingredient[],
    costs: IngredientCost[],
    recipeSteps: RecipeStep[]
  ) {
    this.ingredientsMap = resourcesToMap(ingredients)
    this.recipesMap = resourcesToMap(recipes)
    this.recipeStepsMap = resourcesToMap(recipeSteps)

    this.ingredientCostsMap = costs.reduce(
      (
        map: { [key: number]: IngredientCost[] | undefined },
        cost: IngredientCost
      ) => {
        if (map[cost.ingredient_id] === undefined) {
          map[cost.ingredient_id] = []
        }
        map[cost.ingredient_id] = map[cost.ingredient_id]?.concat(cost)

        return map
      },
      {}
    )

    recipes.forEach((recipe) => this.calculateCost(recipe))
  }

  ingredientCostForInput = (input: StepInput): IngredientCost | undefined => {
    const ingredientCosts = this.ingredientCostsMap[input.inputable_id]
    if (ingredientCosts !== undefined) {
      const ingredient = this.ingredientsMap[input.inputable_id]
      // assumes they're already sorted in order of latest
      return ingredientCosts.find((c) =>
        UnitConverter.canConvert(
          c.got_unit,
          input.unit,
          ingredient.volume_weight_ratio
        )
      )
    }
    return undefined
  }

  costOfInput = (
    input: StepInput,
    priceCents: number,
    priceForQty: number,
    priceForUnit: string | undefined,
    volumeWeightRatio: number | undefined
  ) => {
    const costPerUnit =
      priceCents /
      UnitConverter.convert(
        priceForQty,
        priceForUnit,
        input.unit,
        volumeWeightRatio
      )
    return costPerUnit * input.quantity
  }

  calculateCost = (recipe: Recipe) => {
    if (this.recipeCostsMap[recipe.id] !== undefined) {
      return
    }

    let cost = 0
    let isFullyCalculated = true

    const inputs = recipe.step_ids
      .map((id) => this.recipeStepsMap[id].inputs)
      .reduce((a, b) => a.concat(b), [])
    inputs.forEach((input) => {
      if (input.inputable_type === 'Recipe') {
        const inputRecipe = this.recipesMap[input.inputable_id]
        this.calculateCost(inputRecipe)

        const inputRecipeCost = this.recipeCostsMap[inputRecipe.id]
        cost += this.costOfInput(
          input,
          inputRecipeCost,
          inputRecipe.output_qty,
          inputRecipe.unit,
          inputRecipe.volume_weight_ratio
        )
        isFullyCalculated =
          isFullyCalculated && this.recipeFullyCalculatedMap[inputRecipe.id]
      } else if (input.inputable_type === 'Ingredient') {
        const ingredientCost = this.ingredientCostForInput(input)

        if (ingredientCost !== undefined) {
          const ingredient = this.ingredientsMap[input.inputable_id]
          cost += this.costOfInput(
            input,
            ingredientCost.price_cents,
            ingredientCost.got_qty,
            ingredientCost.got_unit,
            ingredient.volume_weight_ratio
          )
        } else {
          isFullyCalculated = false
        }
      }
    })

    this.recipeCostsMap[recipe.id] = cost
    this.recipeFullyCalculatedMap[recipe.id] = isFullyCalculated
  }

  getCostForRecipe = (id: number): number | undefined => this.recipeCostsMap[id]

  isFullyCalculated = (recipe: Recipe): boolean =>
    this.recipeFullyCalculatedMap[recipe.id] ?? false
}

export default CostCalculator
