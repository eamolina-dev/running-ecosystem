// src/types/api.ts
export interface CreatePreferenceRequest {
  raceId: number
  userId: number
  title: string
  price: number
}

export interface CreatePreferenceResponse {
  init_point?: string
  // si tu backend devuelve otra cosa, añadila acá
  [k: string]: any
}
