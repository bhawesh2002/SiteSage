from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db.session import get_db
from sqlalchemy import text

router = APIRouter(prefix="/health")

@router.get("/")
async def health_check(db:Session=Depends(get_db)):
    try:
        db.execute(text("SELECT 1"))
    except Exception as e:
        return {"Error" : "Health Check Failed", "cause": str(e)}
    return {
        "status": "ok",
        "service": "sitesage-backend"
    }
