import psycopg2
import os
from dotenv import load_dotenv

load_dotenv()
db_url = os.environ.get("DATABASE_URL")

try:
    conn = psycopg2.connect(db_url)
    cursor = conn.cursor()
    # Add the column
    cursor.execute("ALTER TABLE users ADD COLUMN IF NOT EXISTS password VARCHAR(255);")
    # Set a dummy hash so we can make it NOT NULL
    cursor.execute("UPDATE users SET password = '$2b$12$dummyhashplaceholderdummyhash' WHERE password IS NULL;")
    cursor.execute("ALTER TABLE users ALTER COLUMN password SET NOT NULL;")
    conn.commit()
    print("Database schema successfully updated!")
except Exception as e:
    print(f"Error: {e}")
finally:
    if 'conn' in locals():
        conn.close()
