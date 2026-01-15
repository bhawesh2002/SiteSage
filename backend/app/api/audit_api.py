from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from uuid import UUID
from typing import List

from app.db.session import get_db
from app.services.crawler_service import crawl_url
from app.services.seo_analysis_service import analyze_seo
from app.models.audit_report import AuditReport
from app.schemas.audit import AuditCreateRequest, AuditResponse, AuditListItem
from app.services.ai.client_factory import get_ai_client
from app.utils.urls import normalize_url

router = APIRouter(prefix="/audit", tags=["Audit"])


@router.post("/", response_model=AuditResponse)
async def create_audit(
    audit_request: AuditCreateRequest, db: Session = Depends(get_db)
):
    normalized = normalize_url(audit_request.url)
    existing = (
        db.query(AuditReport).filter(AuditReport.normalized_url == normalized).first()
    )

    if existing:
        return existing

    try:
        metrics = await crawl_url(audit_request.url)
    except Exception as exc:
        raise HTTPException(status_code=400, detail=str(exc))

    seo_score, issues = analyze_seo(metrics)

    ai_payload = {
        "url": audit_request.url,
        "seo_score": seo_score,
        "issues": issues,
        "metrics": metrics,
    }
    ai_client = get_ai_client()
    ai_result = ai_client.analyze_audit(ai_payload)
    ai_summary = ai_result["summary"]
    ai_recommendations = ai_result["recommendations"]

    report = AuditReport(
        url=audit_request.url,
        normalized_url=normalized,
        seo_score=seo_score,
        issues=issues,
        metrics=metrics,
        ai_summary=ai_summary,
        ai_recommendations=ai_recommendations,
    )

    db.add(report)
    db.commit()
    db.refresh(report)

    return report


@router.get("/list", response_model=List[AuditListItem])
def list_audits(
    db: Session = Depends(get_db),
):
    audits = db.query(AuditReport).order_by(AuditReport.created_at.desc()).all()

    return audits


@router.get("/{audit_id}", response_model=AuditResponse)
def get_audit(
    audit_id: UUID,
    db: Session = Depends(get_db),
):
    report = db.query(AuditReport).filter(AuditReport.id == audit_id).first()

    if not report:
        raise HTTPException(
            status_code=404,
            detail="Audit report not found",
        )

    return report
