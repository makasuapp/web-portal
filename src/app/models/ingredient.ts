export interface Ingredient {
  id: number
  name: string
  volume_weight_ratio?: number
  default_vendor_id?: number
}

export interface IngredientCost {
  id: number
  ingredient_id: number
  got_qty: number
  got_unit: string
  price_cents: number
}
