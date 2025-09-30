export type User = {
  id: number
  email: string
  name: string
  avatar: string
}

export type Profile = User & {
  authorities: string[]
}
