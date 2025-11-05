import axios from "axios"

const BASE_URL = "http://localhost:8000" // Cambiar si usás otro puerto

// Axios instance base
const api = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
})

// ---------------------------
// 🔹 HELPERS
// ---------------------------

async function testEndpoint(path: string, method: "get" | "post" | "put" | "delete", data?: any) {
  try {
    const response =
      method === "get" || method === "delete"
        ? await api[method](path)
        : await api[method](path, data)

    console.log(`✅ ${method.toUpperCase()} ${path}`, response.status, response.data)
    return response.data
  } catch (error: any) {
    if (error.response) {
      console.error(`❌ ${method.toUpperCase()} ${path}`, error.response.status, error.response.data)
    } else {
      console.error(`🚫 ${method.toUpperCase()} ${path}`, error.message)
    }
  }
}

// ---------------------------
// 🔹 TEST SUITE
// ---------------------------

export async function runApiTests() {
  console.log("🚀 Iniciando tests de API...\n")

  // ORGANIZATIONS
  await testEndpoint("/organizations", "get")
  await testEndpoint("/organizations", "post", { name: "Org Front", description: "Creada desde React" })
  await testEndpoint("/organizations/1", "get")
  await testEndpoint("/organizations/1/events", "get")

  // EVENTS
  await testEndpoint("/events", "get")
  await testEndpoint("/events", "post", {
    name: "Trail Patagonia",
    description: "Evento desde Front",
    location: "Bariloche",
    date: "2025-12-01",
    org_id: 1,
  })
  await testEndpoint("/events/1", "get")
  await testEndpoint("/events/1/races", "get")

  // RACES
  await testEndpoint("/races", "get")
  await testEndpoint("/races", "post", {
    name: "21K React",
    distance_km: 21,
    price: 15000,
    event_id: 1,
  })
  await testEndpoint("/races/1", "get")

  // RUNNERS
  await testEndpoint("/runners", "get")
  await testEndpoint("/runners", "post", {
    name: "React Tester",
    email: "tester@example.com",
    age: 27,
  })
  await testEndpoint("/runners/1", "get")

  console.log("\n✅ Tests finalizados.")
}
