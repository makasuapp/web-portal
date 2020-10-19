import { Ingredient, IngredientCost } from 'app/models/ingredient'
import { Recipe, RecipeStep } from 'app/models/recipe'
import CostCalculator from './CostCalculator'

const mainRecipe: Recipe = {
  id: 1,
  name: '1',
  publish: true,
  output_qty: 2,
  step_ids: [1],
}

const subrecipe: Recipe = {
  id: 2,
  name: '2',
  publish: false,
  output_qty: 1000,
  unit: 'g',
  step_ids: [2],
}

const recipeSteps: RecipeStep[] = [
  {
    id: 1,
    recipe_id: 1,
    instruction: '1',
    number: 1,
    tools: [],
    detailed_instructions: [],
    inputs: [
      {
        id: 1,
        inputable_type: 'Recipe',
        inputable_id: 2,
        name: '2',
        quantity: 0.5,
        unit: 'kg',
      },
      {
        id: 1,
        inputable_type: 'Ingredient',
        inputable_id: 1,
        name: '1',
        quantity: 1,
        unit: 'tbsp',
      },
    ],
  },
  {
    id: 2,
    recipe_id: 2,
    instruction: '2',
    number: 1,
    tools: [],
    detailed_instructions: [],
    inputs: [
      {
        id: 2,
        inputable_type: 'Ingredient',
        inputable_id: 1,
        name: '1',
        quantity: 12,
        unit: 'g',
      },
      {
        id: 3,
        inputable_type: 'Ingredient',
        inputable_id: 1,
        name: '1',
        quantity: 2,
      },
    ],
  },
]

const ingredients: Ingredient[] = [
  {
    id: 1,
    name: '1',
    // 1 tbsp = 10g
    volume_weight_ratio: 0.6762696963549063,
  },
]

const costs: IngredientCost[] = [
  {
    id: 1,
    ingredient_id: 1,
    got_qty: 3,
    price_cents: 300,
  },
  {
    id: 2,
    ingredient_id: 1,
    got_qty: 100,
    got_unit: 'g',
    price_cents: 1200,
  },
  // this one's older since it's later
  {
    id: 3,
    ingredient_id: 1,
    got_qty: 100,
    got_unit: 'g',
    price_cents: 1000,
  },
]

test('calculates cost of recipe on instantiate', () => {
  const recipes = [subrecipe]
  const calculator = new CostCalculator(
    recipes,
    ingredients,
    costs,
    recipeSteps
  )

  expect(calculator.getCostForRecipe(subrecipe.id)).toEqual(200 + 144)
})

test('subrecipe cost is taken into account', () => {
  // subrecipe comes after but still calculated into main
  const recipes = [mainRecipe, subrecipe]
  const calculator = new CostCalculator(
    recipes,
    ingredients,
    costs,
    recipeSteps
  )

  expect(calculator.getCostForRecipe(mainRecipe.id)).toEqual(
    (200 + 144) / 2 + 120
  )
  expect(calculator.isFullyCalculated(mainRecipe)).toBeTruthy()
  expect(calculator.isFullyCalculated(subrecipe)).toBeTruthy()
})

test('not fully calculated if missing a cost', () => {
  const recipes = [subrecipe]
  const calculator = new CostCalculator(recipes, ingredients, [], recipeSteps)
  expect(calculator.isFullyCalculated(subrecipe)).toBeFalsy()
})
