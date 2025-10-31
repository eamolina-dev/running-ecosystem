import json
from app.db.session import SessionLocal
from app.models import User, Runner, Organization, Event, Race, Registration, Result
from app.core.security import get_password_hash

db = SessionLocal()

# Paths
USERS_JSON = "app/json/users.json"
RUNNERS_JSON = "app/json/runners.json"
ORGS_JSON = "app/json/organizations.json"
EVENTS_JSON = "app/json/events.json"
RACES_JSON = "app/json/races.json"
REGISTRATIONS_JSON = "app/json/registrations.json"
RESULTS_JSON = "app/json/results.json"


def seed_database():
    # Load JSONs
    users = json.load(open(USERS_JSON))
    runners = json.load(open(RUNNERS_JSON))
    orgs = json.load(open(ORGS_JSON))
    events = json.load(open(EVENTS_JSON))
    races = json.load(open(RACES_JSON))
    registrations = json.load(open(REGISTRATIONS_JSON))
    results = json.load(open(RESULTS_JSON))

    # Maps for ID remapping
    user_map = {}
    event_map = {}
    race_map = {}

    # ---- USERS ----
    for i, u in enumerate(users, start=1):
        role = "organization" if u["role"] == "org_admin" else u["role"]
        user = User(
            email=u["email"],
            username=u["username"],
            role=role,
            hashed_password=get_password_hash(u["password"]),
            is_active=u["is_active"],
            is_verified=u["is_verified"]
        )
        db.add(user)
        db.flush()
        user_map[i] = user.id
    db.commit()

    # ---- RUNNERS ----
    for r in runners:
        db.add(Runner(
            full_name=r["full_name"],
            birth_date=r["birth_date"],
            gender=r["gender"],
            city=r["city"],
            country=r["country"],
            avatar_url=r["avatar_url"],
            bio=r["bio"],
            instagram=r["instagram"],
            team_name=r["team_name"],
            user_id=user_map[r["user_id"]],
        ))
    db.commit()

    # ---- ORGS ----
    for o in orgs:
        db.add(Organization(
            name=o["name"],
            description=o["description"],
            website=o["website"],
            logo_url=o["logo_url"],
            location=o["location"],
            founded_year=o["founded_year"],
            social_links=o["social_links"],
            user_id=user_map[o["user_id"]],
        ))
    db.commit()

    # ---- EVENTS ----
    for e in events:
        event = Event(
            name=e["name"],
            description=e["description"],
            location=e["location"],
            banner_url=e["banner_url"],
            latitude=e["latitude"],
            longitude=e["longitude"],
            start_date=e["start_date"],
            end_date=e["end_date"],
            year=e["year"],
            status=e["status"],
            organization_id=e["organization_id"],
        )
        db.add(event)
        db.flush()
        event_map[e["id"]] = event.id
    db.commit()

    # ---- RACES ----
    for r in races:
        race = Race(
            event_id=event_map[r["event_id"]],
            name=r["name"],
            distance_km=r["distance_km"],
            elevation_gain=r["elevation_gain"],
            terrain_type=r["terrain_type"],
            price=r["price"],
            start_datetime=r["start_datetime"],
            max_participants=r["max_participants"],
            registration_open=r["registration_open"]
        )
        db.add(race)
        db.flush()
        # Generate new race ID map
        old_event_id = r["event_id"]
        event_races = race_map.get(old_event_id, [])
        event_races.append(race.id)
        race_map[old_event_id] = event_races
    db.commit()

    # ---- REGISTRATIONS ----
    for reg in registrations:
        db.add(Registration(
            payment_status=reg["payment_status"],
            payment_method=reg["payment_method"],
            bib_number=reg["bib_number"],
            notes=reg["notes"],
            runner_id=reg["runner_id"],
            race_id=race_map[reg["race_id"]][0]  # first race per mapping
        ))
    db.commit()

    # ---- RESULTS ----
    for res in results:
        db.add(Result(
            finish_time=res["finish_time"],
            position_overall=res["position_overall"],
            position_gender=res["position_gender"],
            position_category=res["position_category"],
            runner_id=res["runner_id"],
            race_id=race_map[res["race_id"]][0]
        ))
    db.commit()

    print("✅ Database seeded successfully")


if __name__ == "__main__":
    seed_database()
