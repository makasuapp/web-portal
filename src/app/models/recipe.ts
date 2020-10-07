export interface Tool {
  id: number
  name: string
}

export interface DetailedInstruction {
  id: number
  instruction: string
}

export type StepInputType = 'Recipe' | 'Ingredient' | 'RecipeStep'

export interface StepInput {
  id: number
  name: string
  inputable_type: StepInputType
  inputable_id: number
  unit?: string
  quantity: number
}

export interface RecipeStep {
  id: number
  recipe_id: number
  instruction: string
  number: number
  duration_sec?: number
  max_before_sec?: number
  min_before_sec?: number
  tools: Tool[]
  detailed_instructions: DetailedInstruction[]
  inputs: StepInput[]
}

export interface Recipe {
  id: number
  name: string
  publish: boolean
  unit?: string
  output_qty: number
  current_price_cents?: number
  volume_weight_ratio?: number
  step_ids: number[]
}
