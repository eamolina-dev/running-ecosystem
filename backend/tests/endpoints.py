import pytest
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

# ---------------------------
# 🔹 ORGANIZATIONS
# ---------------------------

def test_get_all_organizations():
    response = client.get("/organizations")
    assert response.status_code == 200
    assert isinstance(response.json(), list)


def test_get_organization_by_id():
    response = client.get("/organizations/1")
    assert response.status_code in [200, 404]  # Puede no existir
    if response.status_code == 200:
        data = response.json()
        assert "id" in data
        assert "name" in data


def test_create_organization():
    org_data = {"name": "Test Org", "description": "Org creada para pruebas"}
    response = client.post("/organizations", json=org_data)
    assert response.status_code in [200, 201]
    data = response.json()
    assert data["name"] == "Test Org"


def test_update_organization():
    org_data = {"name": "Org Actualizada"}
    response = client.put("/organizations/1", json=org_data)
    assert response.status_code in [200, 404]


def test_delete_organization():
    response = client.delete("/organizations/1")
    assert response.status_code in [200, 404]


def test_get_events_by_organization():
    response = client.get("/organizations/1/events")
    assert response.status_code in [200, 404]
    if response.status_code == 200:
        assert isinstance(response.json(), list)


# ---------------------------
# 🔹 EVENTS
# ---------------------------

def test_get_all_events():
    response = client.get("/events")
    assert response.status_code == 200
    assert isinstance(response.json(), list)


def test_get_event_by_id():
    response = client.get("/events/1")
    assert response.status_code in [200, 404]
    if response.status_code == 200:
        data = response.json()
        assert "id" in data
        assert "name" in data


def test_create_event():
    event_data = {
        "name": "Trail Test",
        "description": "Evento de prueba",
        "location": "Patagonia",
        "date": "2025-12-31",
        "org_id": 1
    }
    response = client.post("/events", json=event_data)
    assert response.status_code in [200, 201, 404]  # org_id podría no existir


def test_update_event():
    event_data = {"name": "Trail Editado"}
    response = client.put("/events/1", json=event_data)
    assert response.status_code in [200, 404]


def test_delete_event():
    response = client.delete("/events/1")
    assert response.status_code in [200, 404]


def test_get_races_by_event():
    response = client.get("/events/1/races")
    assert response.status_code in [200, 404]
    if response.status_code == 200:
        assert isinstance(response.json(), list)


# ---------------------------
# 🔹 RACES
# ---------------------------

def test_get_all_races():
    response = client.get("/races")
    assert response.status_code == 200
    assert isinstance(response.json(), list)


def test_get_race_by_id():
    response = client.get("/races/1")
    assert response.status_code in [200, 404]


def test_create_race():
    race_data = {
        "name": "15K Test",
        "distance_km": 15,
        "price": 10000,
        "event_id": 1
    }
    response = client.post("/races", json=race_data)
    assert response.status_code in [200, 201, 404]


def test_update_race():
    race_data = {"price": 12000}
    response = client.put("/races/1", json=race_data)
    assert response.status_code in [200, 404]


def test_delete_race():
    response = client.delete("/races/1")
    assert response.status_code in [200, 404]


# ---------------------------
# 🔹 RUNNERS (opcional)
# ---------------------------

def test_get_all_runners():
    response = client.get("/runners")
    assert response.status_code == 200
    assert isinstance(response.json(), list)


def test_get_runner_by_id():
    response = client.get("/runners/1")
    assert response.status_code in [200, 404]


def test_create_runner():
    runner_data = {
        "name": "Juan Perez",
        "email": "juan@example.com",
        "age": 30
    }
    response = client.post("/runners", json=runner_data)
    assert response.status_code in [200, 201]


def test_update_runner():
    runner_data = {"age": 31}
    response = client.put("/runners/1", json=runner_data)
    assert response.status_code in [200, 404]


def test_delete_runner():
    response = client.delete("/runners/1")
    assert response.status_code in [200, 404]
