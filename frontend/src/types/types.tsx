// src/types/types.ts

// 🔹 Tipos básicos
export type EventStatus = "upcoming" | "finished" | "cancelled"
export type UserRole = "runner" | "organization" | "admin"

// 🔹 Interfaces principales
export interface Event {
  id: number
  name: string
  description?: string
  location?: string
  start_date: string
  end_date: string
  year?: number
  status: EventStatus
}

export interface Race {
  id: number
  event_id?: number
  name: string
  description?: string
  distance_km: number
  terrain_type?: string
  elevation_gain?: number
  price?: number
  start_datetime: string
  max_participants?: number
  status: EventStatus
}

export interface User {
  id: number
  username: string
  role: UserRole
  email: string
  organization_id?: number
  runner_id?: number
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

export interface Organization {
  id: number
  user_id: number
  name: string
  website?: string
  instagram?: string
  logoUrl?: string
}

export interface Event {
  id: number
  name: string
  description?: string
  location?: string
  start_date: string
  end_date: string
  year?: number
  status: EventStatus
  organization_id?: number
  organization?: Organization
}
