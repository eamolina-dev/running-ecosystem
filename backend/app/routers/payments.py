from fastapi import APIRouter, HTTPException, Request
from pydantic import BaseModel
import requests
import os

router = APIRouter(prefix="/payments", tags=["Payments"])

MP_ACCESS_TOKEN = os.getenv("MP_ACCESS_TOKEN")


# ✅ Modelo de entrada (para que Swagger y FastAPI validen bien)
class PreferenceRequest(BaseModel):
    raceId: int
    userId: int
    title: str
    price: float


@router.post("/create-preference")
def create_preference(data: PreferenceRequest):
    try:
        preference_data = {
            "items": [
                {
                    "title": data.title,
                    "quantity": 1,
                    "unit_price": float(data.price),
                }
            ],
            # ⚠️ Mercado Pago no acepta un "payer.id" numérico si no es su ID de cuenta
            # Lo dejamos por ahora para mantener tu estructura
            "metadata": {
                "raceId": data.raceId,
                "userId": data.userId,
            },
            "back_urls": {
                "success": f"{os.getenv('FRONT_URL')}/payment/success",
                "failure": f"{os.getenv('FRONT_URL')}/payment/failure",
                "pending": f"{os.getenv('FRONT_URL')}/payment/pending",
            },
            "auto_return": "approved",
            "notification_url": f"{os.getenv('BACK_URL')}/payments/webhook",
        }

        headers = {"Authorization": f"Bearer {MP_ACCESS_TOKEN}"}
        response = requests.post(
            "https://api.mercadopago.com/checkout/preferences",
            json=preference_data,
            headers=headers,
        )

        if response.status_code != 201:
            raise HTTPException(status_code=response.status_code, detail=response.text)

        return {"init_point": response.json()["init_point"]}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/webhook")
async def webhook(request: Request):
    data = await request.json()
    print("📩 Webhook recibido:", data)
    return {"status": "ok"}
