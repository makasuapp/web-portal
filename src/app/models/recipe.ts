export interface Recipe {
    id: number    
    name: string
    publish: boolean
    unit?: string
    output_qty: number
    volume_weight_ratio: number
    prep_step_ids: number[]
    cook_step_ids: number[]
}