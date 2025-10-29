from sqlalchemy import text
from app.db.session import SessionLocal

def clear_all_data():
    db = SessionLocal()
    try:
        # ⚠️ IMPORTANTE: usar text() para ejecutar SQL crudo
        db.execute(text("""
            TRUNCATE TABLE 
                runners, 
                users, 
                organizations, 
                events, 
                races, 
                registrations, 
                results 
            RESTART IDENTITY CASCADE;
        """))
        db.commit()
        print("✅ Datos limpiados correctamente.")
    except Exception as e:
        print(f"❌ Error al limpiar datos: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    clear_all_data()
