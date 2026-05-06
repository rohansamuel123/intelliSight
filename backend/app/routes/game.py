from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.game import Game
from app.schemas.game import GameCreate, GameResponse
from typing import List

router = APIRouter(prefix="/games", tags=["Games"])

@router.post("/", response_model=GameResponse)
def create_game(game: GameCreate, db: Session = Depends(get_db)):
    new_game = Game(**game.dict())
    db.add(new_game)
    db.commit()
    db.refresh(new_game)
    return new_game

@router.get("/", response_model=List[GameResponse])
def get_all_games(db: Session = Depends(get_db)):
    return db.query(Game).all()

@router.get("/{game_id}", response_model=GameResponse)
def get_game(game_id: int, db: Session = Depends(get_db)):
    game = db.query(Game).filter(Game.game_id == game_id).first()
    if not game:
        raise HTTPException(status_code=404, detail="Game not found")
    return game