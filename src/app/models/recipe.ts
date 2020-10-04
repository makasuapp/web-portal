export interface Recipe {
  id: number
  name: string
  publish: boolean
  unit?: string
  output_qty: number
  volume_weight_ratio: number
  step_ids: number[]
}
