export type OrderType = "delivery" | "pickup"

export type OrderState = "new" | "started" | "done" | "delivered"

export interface Order {
    id: number
    order_type: OrderType
    created_at: number
    for_time?: number
    state: OrderState
    customer: Customer
    items: OrderItem[]
}

export interface Customer {
    id: number
    email?: string
    name?: string
    phone_number?: string
}

export interface OrderItem {
    id: number
    recipe_id: number
    price_cents: number
    quantity: number
    started_at?: number
    done_at?: number
}