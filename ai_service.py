import uuid

from dotenv import load_dotenv

load_dotenv()

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from core.rag_engine import ask_question
from main import run_pipeline


app = FastAPI(title="AI Video Assistant Service")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

rag_sessions = {}


class ProcessRequest(BaseModel):
    source: str
    language: str = "english"


class AskRequest(BaseModel):
    session_id: str
    question: str


@app.get("/health")
def health():
    return {"status": "ok"}


@app.post("/process")
def process_video(request: ProcessRequest):
    if not request.source.strip():
        raise HTTPException(status_code=400, detail="source is required")

    try:
        result = run_pipeline(request.source.strip(), request.language)
    except ValueError as exc:
        raise HTTPException(status_code=422, detail=str(exc)) from exc
    except RuntimeError as exc:
        raise HTTPException(status_code=400, detail=str(exc)) from exc

    session_id = str(uuid.uuid4())
    rag_sessions[session_id] = result.pop("rag_chain")

    return {"session_id": session_id, **result}


@app.post("/ask")
def ask(request: AskRequest):
    rag_chain = rag_sessions.get(request.session_id)
    if rag_chain is None:
        raise HTTPException(status_code=404, detail="session not found")

    if not request.question.strip():
        raise HTTPException(status_code=400, detail="question is required")

    try:
        return {"answer": ask_question(rag_chain, request.question.strip())}
    except ValueError as exc:
        raise HTTPException(status_code=422, detail=str(exc)) from exc
    except RuntimeError as exc:
        raise HTTPException(status_code=400, detail=str(exc)) from exc
