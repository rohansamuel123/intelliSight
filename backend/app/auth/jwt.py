from datetime import datetime, timedelta, timezone
from typing import Optional

from jose import JWTError, jwt

import os

# ── Configuration ──────────────────────────────────────────────────────────────
# Generate a strong secret with: python -c "import secrets; print(secrets.token_hex(32))"
# Store it in your .env file as JWT_SECRET_KEY
SECRET_KEY: str = os.getenv("JWT_SECRET_KEY", "change-me-in-production-use-a-long-random-secret")
ALGORITHM: str = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES: int = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", "60"))


# ── Token creation ─────────────────────────────────────────────────────────────

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None) -> str:
    """
    Create a signed JWT access token.

    Args:
        data:          Payload dict. Should contain at least ``{"sub": str(user_id)}``.
        expires_delta: How long the token is valid. Defaults to ACCESS_TOKEN_EXPIRE_MINUTES.

    Returns:
        A signed JWT string.
    """
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + (
        expires_delta if expires_delta else timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    )
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)


# ── Token verification ─────────────────────────────────────────────────────────

def decode_access_token(token: str) -> Optional[dict]:
    """
    Decode and verify a JWT token.

    Returns:
        The decoded payload dict, or ``None`` if the token is invalid / expired.
    """
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except JWTError:
        return None
