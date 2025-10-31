export interface User {
  id: number
  username: string
  role: "runner" | "organization" | "admin"
  email: string
  avatarUrl?: string
}

export interface RunnerProfile {
  nationality?: string
  age?: number
  totalRaces?: number
  favoriteDistance?: string
  bestTime?: string
}

export interface OrganizationProfile {
  name: string
  founded?: number
  totalEvents?: number
  website?: string
  instagram?: string
  twitter?: string
  logoUrl?: string
}

