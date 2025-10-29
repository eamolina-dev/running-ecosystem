# app/seeds/seed_runner.py
from app.db.session import SessionLocal
from app.models import User, Runner, Organization, Event, Race, Registration
from datetime import datetime, date
import random

db = SessionLocal()

def run_seed():
    # Crear superadmin
    superadmin = User(
        email="admin@runhub.com",
        username="superadmin",
        hashed_password="hashed_admin_pwd",
        role="superadmin",
    )
    db.add(superadmin)

    # Crear organizaciones
    orgs = []
    for i in range(1, 4):
        org_admin = User(
            email=f"org{i}@mail.com",
            username=f"org_admin_{i}",
            hashed_password="hashed_pwd",
            role="org_admin",
        )
        org = Organization(
            name=f"Trail Org {i}",
            description=f"Organización {i} especializada en carreras de montaña",
            logo_url=f"https://example.com/logo_{i}.png",
            admin=org_admin
        )
        orgs.append(org)
        db.add(org)

    # Crear runners
    runners = []
    for i in range(1, 11):
        user = User(
            email=f"runner{i}@mail.com",
            username=f"runner_{i}",
            hashed_password="hashed_pwd",
            role="runner",
        )
        runner = Runner(
            full_name=f"Runner {i}",
            birth_date=date(1990 + i % 10, random.randint(1, 12), random.randint(1, 28)),
            city="Ciudad X",
            avatar_url=f"https://example.com/avatar_{i}.jpg",
            user=user,
        )
        db.add(runner)
        runners.append(runner)

    db.commit()

    # Crear eventos y carreras
    for org in orgs:
        for j in range(1, 3):
            event = Event(
                name=f"{org.name} Event {j}",
                year=2025,
                start_date=date(2025, 3, j * 2),
                end_date=date(2025, 3, j * 2 + 1),
                description=f"Evento {j} de {org.name}",
                location="Cordoba, Argentina",
                organization=org
            )
            db.add(event)
            db.commit()

            for k in [10, 21, 42]:
                race = Race(
                    name=f"{k}K Race",
                    distance_km=float(k),
                    price=5000 + k * 10,
                    start_datetime=datetime(2025, 3, j * 2, 8, 0),
                    max_participants=300,
                    event_id=event.id
                )
                db.add(race)
                db.commit()

                # Inscriptos aleatorios
                selected_runners = random.sample(runners, k=random.randint(3, 6))
                for r in selected_runners:
                    registration = Registration(
                        runner_id=r.id,
                        race_id=race.id,
                        payment_status="paid",
                        registered_at=datetime.utcnow()
                    )
                    db.add(registration)

    db.commit()
    db.close()
    print("✅ Seed completo cargado correctamente.")

if __name__ == "__main__":
    run_seed()
