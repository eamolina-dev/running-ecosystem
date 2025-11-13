# app/db/base.py
from sqlalchemy.orm import declarative_base

Base = declarative_base()

import app.modules.users.user_model
import app.modules.runners.runner_schema
import app.modules.organizations.organization_model 
import app.modules.events.event_model
import app.modules.races.race_model
import app.modules.registrations.registration_model
import app.modules.results.result_model
