TRUNCATE TABLE
  results,
  registrations,
  races,
  events,
  organizations,
  runners,
  users
RESTART IDENTITY CASCADE;

-- psql -U agustin -d running_ecosystem < app/db/reset.sql
