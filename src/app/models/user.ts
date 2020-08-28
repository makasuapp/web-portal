import { ID } from "app/common/duck/types"

export type Role = "user" | "owner" 

export interface User {
  id: ID,
  first_name?: string,
  last_name?: string,
  email: string,
  phone_number?: string,
  organizations: Organization[]
}

export interface Organization {
  id: ID,
  name: string
  role: Role
  kitchen_id?: ID
  kitchens: Kitchen[]
}

export interface Kitchen {
  id: ID
  name: string
}

export const isDefined = (user: UserState) => user !== undefined && user !== null
export const isOwner = (user: UserState) => {
  if (isDefined(user)) {
    //TODO(multi-org): check against organization
    const organizations = user?.organizations.filter((org) => org.role === "owner")
    return organizations && organizations.length > 0
  }

  return false
}

//undefined = initial state, null = unauthed
export type UserState = User | null | undefined

export type Token = string

export interface UserResponse {
  token: Token,
  user: User
}

export interface SignupRequestData {
  user: {
    first_name: string
    last_name?: string
    email: string
    phone_number?: string
    password: string
    password_confirmation: string
  },
}