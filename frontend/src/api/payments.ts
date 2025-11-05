// src/api/payments.ts
import type { CreatePreferenceRequest, CreatePreferenceResponse } from "@/types/api"

const BACK_URL = import.meta.env.VITE_BACK_URL || "http://127.0.0.1:8000"

export const createPreference = async ({
  raceId,
  userId,
  title,
  price,
}: CreatePreferenceRequest): Promise<CreatePreferenceResponse> => {
  const res = await fetch(`${BACK_URL}/payments/create-preference`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ raceId, userId, title, price }),
  })

  if (!res.ok) {
    const text = await res.text()
    throw new Error(`Create preference failed: ${res.status} ${text}`)
  }

  return res.json()
}
