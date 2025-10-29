# app/db/base.py
from sqlalchemy.orm import declarative_base

Base = declarative_base()

import app.models.user
import app.models.runner
import app.models.organization 
import app.models.event
import app.models.race
import app.models.registration
import app.models.result
