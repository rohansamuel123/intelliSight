import bcrypt

def hash_password(plain_password: str) -> str:
    """Hash a plain-text password and return the bcrypt hash."""
    # bcrypt requires bytes, so we encode the string to utf-8 first
    salt = bcrypt.gensalt()
    hashed_bytes = bcrypt.hashpw(plain_password.encode('utf-8'), salt)
    # decode back to string to store in the database
    return hashed_bytes.decode('utf-8')


def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Return True if the plain password matches the stored hash."""
    try:
        return bcrypt.checkpw(
            plain_password.encode('utf-8'),
            hashed_password.encode('utf-8')
        )
    except ValueError:
        return False
