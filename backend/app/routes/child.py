from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from app.database import get_db
from app.models.user import User
from app.models.child import Child
from app.schemas.child import ChildCreate, ChildResponse
from app.auth.dependencies import get_current_user

router = APIRouter(prefix="/children", tags=["Children"])


# ── Create a child profile (parent must be authenticated) ─────────────────────

@router.post("/", response_model=ChildResponse, status_code=status.HTTP_201_CREATED)
def create_child(
    child: ChildCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Add a child profile under the authenticated parent's account."""
    new_child = Child(
        parent_id=current_user.user_id,
        name=child.name,
        age=child.age,
        gender=child.gender,
        avatar=child.avatar,
    )
    db.add(new_child)
    db.commit()
    db.refresh(new_child)
    return new_child


# ── List all children for the authenticated parent ────────────────────────────

@router.get("/", response_model=List[ChildResponse])
def get_my_children(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Return all child profiles belonging to the authenticated parent."""
    return db.query(Child).filter(Child.parent_id == current_user.user_id).all()


# ── Get a single child (must belong to the authenticated parent) ──────────────

@router.get("/{child_id}", response_model=ChildResponse)
def get_child(
    child_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    child = db.query(Child).filter(Child.child_id == child_id).first()
    if not child:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Child not found.")
    if child.parent_id != current_user.user_id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Access denied.")
    return child


# ── Update a child profile ────────────────────────────────────────────────────

@router.put("/{child_id}", response_model=ChildResponse)
def update_child(
    child_id: int,
    updates: ChildCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    child = db.query(Child).filter(Child.child_id == child_id).first()
    if not child:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Child not found.")
    if child.parent_id != current_user.user_id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Access denied.")

    child.name   = updates.name
    child.age    = updates.age
    child.gender = updates.gender
    child.avatar = updates.avatar
    db.commit()
    db.refresh(child)
    return child


# ── Delete a child profile ────────────────────────────────────────────────────

@router.delete("/{child_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_child(
    child_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    child = db.query(Child).filter(Child.child_id == child_id).first()
    if not child:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Child not found.")
    if child.parent_id != current_user.user_id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Access denied.")

    db.delete(child)
    db.commit()
