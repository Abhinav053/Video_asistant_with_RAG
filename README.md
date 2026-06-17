# 🎬 AI Video Assistant - RAG-Powered Meeting Intelligence

A cutting-edge AI-powered application that transforms video content and meetings into actionable intelligence using advanced transcription, summarization, and Retrieval-Augmented Generation (RAG) technology.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Core Components](#core-components)
- [API Reference](#api-reference)
- [Examples](#examples)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)

---

## 🎯 Overview

**AI Video Assistant** is an intelligent meeting transcription and analysis platform that automatically processes video and audio content to extract meaningful insights. It leverages state-of-the-art AI models to:

- **Transcribe** audio content with multilingual support (English, Hinglish)
- **Summarize** meetings into concise, actionable summaries
- **Extract** action items, key decisions, and open questions
- **Enable Conversational Search** via RAG (Retrieval-Augmented Generation) to ask natural language questions about meeting content

Perfect for professionals, researchers, educators, and teams who need to extract maximum value from recorded meetings and video content.

---

## ✨ Features

### Core Capabilities

- **🎥 Multi-Source Input Support**
  - YouTube URLs
  - Local video files (MP4, WebM, etc.)
  - Audio files (MP3, WAV, etc.)
  - Real-time audio capture

- **🗣️ Advanced Speech Recognition**
  - OpenAI Whisper for local, privacy-preserving transcription
  - Sarvam AI integration for Hindi/Hinglish transcription and translation
  - Automatic language detection
  - Speaker diarization support

- **📝 Intelligent Content Analysis**
  - **Smart Summarization**: Map-reduce summarization for comprehensive meeting overviews
  - **Action Item Extraction**: Automatically identify tasks with owners and deadlines
  - **Decision Tracking**: Extract key decisions made during meetings
  - **Question Mining**: Identify open questions and discussion points
  - **Title Generation**: Auto-generate descriptive meeting titles

- **🤖 RAG-Powered Chat Interface**
  - Ask natural language questions about meeting content
  - Context-aware responses based on meeting transcript
  - Vector-based semantic search for precise information retrieval
  - Multi-turn conversation support

- **🎨 Modern Web UI**
  - Built with Streamlit for rapid development
  - Beautiful dark theme with gradient animations
  - Real-time processing feedback
  - Export capabilities (PDF, TXT)

---

## 🛠️ Technology Stack

### Core Technologies

| Component | Technology | Purpose |
|-----------|-----------|---------|
| **LLM** | Mistral AI (mistral-small-latest) | Language understanding and generation |
| **Speech-to-Text** | OpenAI Whisper + Sarvam AI | Audio transcription |
| **Vector Store** | ChromaDB | Semantic search and retrieval |
| **Embeddings** | Sentence Transformers (HuggingFace) | Text vectorization |
| **Framework** | LangChain (LCEL) | LLM orchestration |
| **UI** | Streamlit | Web interface |
| **Audio Processing** | PyDub + FFmpeg | Media file handling |

### Key Dependencies

```
Python ≥ 3.10

Audio/Video:
- yt-dlp (YouTube downloads)
- pydub (audio manipulation)
- ffmpeg-python (FFmpeg bindings)

Speech-to-Text:
- openai-whisper
- torch, torchaudio
- deep-translator

LLM & RAG:
- langchain, langchain-core, langchain-community
- langchain-mistralai, mistralai
- chromadb
- sentence-transformers
- huggingface-hub, langchain-huggingface

UI:
- streamlit, streamlit-extras
- watchdog

Utilities:
- python-dotenv, numpy, tqdm, requests
- reportlab, fpdf2
```

---

## 📦 Prerequisites

### System Requirements

- **Python**: 3.10 or higher
- **OS**: Windows, macOS, or Linux
- **RAM**: 8GB minimum (16GB recommended for smooth performance)
- **GPU** (optional): CUDA-compatible GPU for faster Whisper transcription

### External Dependencies

1. **FFmpeg** - Required for audio processing
   - Windows: Download from [ffmpeg.org](https://ffmpeg.org/download.html)
   - macOS: `brew install ffmpeg`
   - Linux: `sudo apt-get install ffmpeg`

2. **API Keys**
   - Mistral AI API key (for LLM access)
   - Sarvam AI API key (optional, for Hindi transcription)

---

## 🚀 Installation

### Step 1: Clone the Repository

```bash
git clone https://github.com/Abhinav053/Ai_video_Assistant_RAG.git
cd AI-Video-Assistant-
```

### Step 2: Create a Virtual Environment

```bash
# Using venv (recommended)
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate

# On macOS/Linux:
source venv/bin/activate
```

### Step 3: Install Dependencies

```bash
pip install -r Requirements.txt
```

This will install all required packages specified in the requirements file, including:
- Audio processing libraries
- LLM and RAG components
- Streamlit UI framework
- All utility libraries

### Step 4: Install FFmpeg

**Windows:**
- Download FFmpeg from [ffmpeg.org](https://ffmpeg.org/download.html)
- Add FFmpeg `/bin` directory to PATH
- Verify: `ffmpeg -version`

**macOS:**
```bash
brew install ffmpeg
```

**Linux:**
```bash
sudo apt-get install ffmpeg
```

---

## ⚙️ Configuration

### Step 1: Create Environment File

Create a `.env` file in the project root directory:

```bash
# .env file template

# ─── Mistral AI Configuration ──────────────────────────────────────
MISTRAL_API_KEY=your_mistral_api_key_here

# ─── Sarvam AI Configuration (Optional) ────────────────────────────
SARVAM_API_KEY=your_sarvam_api_key_here
SARVAM_STT_MODEL=saaras:v2.5

# ─── Whisper Model Size ───────────────────────────────────────────
# Options: tiny, base, small, medium, large
# Larger models are more accurate but slower
WHISPER_MODEL=small

# ─── Vector Store Configuration ────────────────────────────────────
CHROMA_DB_PATH=./chroma_db
```

### Step 2: Obtain API Keys

**Mistral AI:**
1. Visit [Mistral AI Console](https://console.mistral.ai)
2. Sign up or log in
3. Generate an API key
4. Add to `.env` file

**Sarvam AI (Optional for Hindi support):**
1. Visit [Sarvam AI](https://www.sarvam.ai)
2. Sign up and create an API key
3. Add to `.env` file

### Step 3: Configure Model Size

Adjust `WHISPER_MODEL` based on your hardware:

- **tiny** (39M): Fastest, least accurate
- **base** (74M): Good balance
- **small** (244M): Recommended for good accuracy
- **medium** (769M): High accuracy, slower
- **large** (2.9B): Highest accuracy, requires significant resources

---

## 💻 Usage

### Option 1: Web Interface (Recommended)

```bash
streamlit run app.py
```

Access the application at `http://localhost:8501`

**Using the Web UI:**
1. Enter a YouTube URL or upload a video/audio file
2. Select language (English or Hinglish)
3. Click "Process" and wait for analysis
4. View results including:
   - Transcript
   - Summary
   - Action items
   - Key decisions
   - Open questions
5. Chat with the meeting using the RAG interface

### Option 2: CLI (Command Line Interface)

```bash
python main.py
```

**CLI Workflow:**
1. Enter YouTube URL or local file path when prompted
2. Choose language (english/hinglish)
3. System processes the video and displays:
   - Title
   - Summary
   - Action items
   - Key decisions
   - Open questions
4. Chat interactively with the meeting assistant
   - Type your questions
   - Type 'exit', 'quit', or 'q' to end

**Example CLI Session:**
```
Enter YouTube URL or local file path: https://www.youtube.com/watch?v=dQw4w9WgXcQ
Language (english/hinglish): english

starting AI Video Assistant
Loading Whisper model: small ...
Whisper model loaded.
Processing audio...
[Processing complete]

════════════════════════════════════════════════════════════════
📌 Title: Key Insights from the Meeting
📋 Summary: [Meeting summary here...]
✅ Action Items: [Items here...]
🔑 Key Decisions: [Decisions here...]
❓ Open Questions: [Questions here...]
════════════════════════════════════════════════════════════════

💬 Chat with your meeting (type 'exit' to quit)

You: What were the main topics discussed?
🤖 Assistant: [Response based on transcript...]

You: exit
👋 Goodbye!
```

### Option 3: Python API

```python
from main import run_pipeline

# Process video and get results
result = run_pipeline(
    source="https://www.youtube.com/watch?v=example",
    language="english"
)

# Access extracted information
print(f"Title: {result['title']}")
print(f"Summary: {result['summary']}")
print(f"Action Items: {result['action_items']}")
print(f"Key Decisions: {result['key_decisions']}")
print(f"Open Questions: {result['open_questions']}")

# Chat with the meeting
from core.rag_engine import ask_question
rag_chain = result['rag_chain']
answer = ask_question(rag_chain, "What was the main decision?")
print(answer)
```

---

## 📁 Project Structure

```
AI-Video-Assistant-/
│
├── 📄 app.py                          # Streamlit web interface (main entry point)
├── 📄 main.py                         # CLI entry point and core pipeline
├── 📄 test.py                         # Unit tests and testing utilities
├── 📄 Requirements.txt                # Python dependencies
├── 📄 README.md                       # This file
│
├── 📁 core/                           # Core processing modules
│   ├── transcriber.py                 # Speech-to-text transcription
│   ├── summarizer.py                  # Meeting summarization & title generation
│   ├── extractor.py                   # Action items, decisions, questions extraction
│   ├── rag_engine.py                  # RAG pipeline and Q&A system
│   └── vector_store.py                # Vector store management (ChromaDB)
│
└── 📁 utils/                          # Utility modules
    └── audio_processor.py             # Audio/video input handling

```

---

## 🔧 Core Components

### 1. **Audio Processor** (`utils/audio_processor.py`)

Handles input validation and conversion of various media formats.

**Key Functions:**
- `process_input(source: str) -> list`: Converts video/audio to processable chunks
  - Supports YouTube URLs via `yt-dlp`
  - Handles local files (MP4, MP3, WAV, etc.)
  - Chunks audio into manageable pieces

```python
from utils.audio_processor import process_input
chunks = process_input("https://www.youtube.com/watch?v=example")
```

### 2. **Transcriber** (`core/transcriber.py`)

Performs speech-to-text conversion with multilingual support.

**Key Functions:**
- `load_model()`: Loads and caches Whisper model
- `transcribe_chunk_whisper(chunk_path: str) -> str`: Transcribes using Whisper
- `transcribe_all(chunks: list, language: str) -> str`: Orchestrates full transcription

**Features:**
- Local Whisper for English transcription
- Sarvam AI integration for Hindi/Hinglish
- Automatic language detection
- Handles audio chunks up to 30 seconds

```python
from core.transcriber import transcribe_all
transcript = transcribe_all(audio_chunks, language="english")
```

### 3. **Summarizer** (`core/summarizer.py`)

Generates concise summaries and titles from meeting transcripts.

**Key Functions:**
- `summarize(transcript: str) -> str`: Creates comprehensive summary using map-reduce pattern
  - Chunks transcript into segments
  - Generates summary for each chunk
  - Combines summaries for final output
- `generate_title(transcript: str) -> str`: Creates descriptive meeting title

**Architecture:**
- Uses LangChain's LCEL for chaining
- Mistral AI for natural language processing
- Handles large transcripts efficiently

```python
from core.summarizer import summarize, generate_title
summary = summarize(transcript)
title = generate_title(transcript)
```

### 4. **Extractor** (`core/extractor.py`)

Extracts structured information from meeting content.

**Key Functions:**
- `extract_action_items(transcript: str) -> str`: Identifies tasks, owners, deadlines
- `extract_key_decisions(transcript: str) -> str`: Extracts decisions made
- `extract_questions(transcript: str) -> str`: Identifies open questions

**Output Format:**
- Numbered lists
- Structured with metadata (owner, deadline, context)
- Fallback messages if nothing found

```python
from core.extractor import extract_action_items, extract_key_decisions
actions = extract_action_items(transcript)
decisions = extract_key_decisions(transcript)
```

### 5. **Vector Store** (`core/vector_store.py`)

Manages ChromaDB vector store for semantic search.

**Key Functions:**
- `build_vector_store(transcript: str)`: Creates new vector store from transcript
- `load_vector_store()`: Loads existing vector store
- `get_retriever(vector_store, k: int)`: Creates retriever for similarity search

**Details:**
- Uses Sentence Transformers for embeddings
- ChromaDB for persistence
- Configurable number of results (k)

```python
from core.vector_store import build_vector_store, get_retriever
vector_store = build_vector_store(transcript)
retriever = get_retriever(vector_store, k=4)
```

### 6. **RAG Engine** (`core/rag_engine.py`)

Implements the Retrieval-Augmented Generation pipeline.

**Key Functions:**
- `build_rag_chain(transcript: str)`: Constructs the full RAG chain
- `ask_question(rag_chain, question: str) -> str`: Answers questions about transcript

**Pipeline:**
1. User asks a question
2. Retriever searches vector store for relevant passages
3. Passages + question sent to Mistral AI
4. LLM generates contextual answer
5. Response returned to user

```python
from core.rag_engine import build_rag_chain, ask_question
rag_chain = build_rag_chain(transcript)
answer = ask_question(rag_chain, "What are the main action items?")
```

### 7. **Streamlit App** (`app.py`)

Modern web interface for the entire pipeline.

**Features:**
- Beautiful dark theme with animations
- Real-time processing status
- File upload and YouTube URL input
- Language selection
- Results display with formatting
- RAG chat interface
- Export functionality

---

## 📚 API Reference

### Main Pipeline Function

```python
def run_pipeline(source: str, language: str = "english") -> dict:
```

**Parameters:**
- `source` (str): YouTube URL or local file path
- `language` (str): "english" or "hinglish" (default: "english")

**Returns:**
```python
{
    "title": str,                    # Generated meeting title
    "transcript": str,               # Full transcription
    "summary": str,                  # Meeting summary
    "action_items": str,             # Extracted action items
    "key_decisions": str,            # Key decisions made
    "open_questions": str,           # Open questions raised
    "rag_chain": RunnableSequence    # RAG pipeline for Q&A
}
```

**Example:**
```python
from main import run_pipeline

result = run_pipeline(
    source="https://www.youtube.com/watch?v=example",
    language="english"
)

print(result["title"])
print(result["summary"])
print(result["action_items"])
```

### RAG Question Answering

```python
def ask_question(rag_chain: RunnableSequence, question: str) -> str:
```

**Parameters:**
- `rag_chain`: RAG pipeline from `build_rag_chain()`
- `question` (str): Natural language question

**Returns:**
- Contextual answer based on transcript

**Example:**
```python
from core.rag_engine import build_rag_chain, ask_question

rag_chain = build_rag_chain(transcript)
answer = ask_question(rag_chain, "What were the deadlines mentioned?")
print(answer)
```

---

## 📖 Examples

### Example 1: Process YouTube Video

```python
from main import run_pipeline
from core.rag_engine import ask_question

# Process video
result = run_pipeline(
    source="https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    language="english"
)

# Display results
print("=" * 60)
print(f"MEETING TITLE: {result['title']}\n")
print(f"SUMMARY:\n{result['summary']}\n")
print(f"ACTION ITEMS:\n{result['action_items']}\n")
print(f"KEY DECISIONS:\n{result['key_decisions']}\n")
print(f"OPEN QUESTIONS:\n{result['open_questions']}")
print("=" * 60)

# Ask questions
rag_chain = result['rag_chain']
print("\n--- Interactive Q&A ---")
print(ask_question(rag_chain, "Who is responsible for the first action item?"))
print(ask_question(rag_chain, "What was the main decision made?"))
```

### Example 2: Process Local Audio File

```python
from main import run_pipeline

# Process local file
result = run_pipeline(
    source="/path/to/meeting_recording.mp3",
    language="hinglish"  # For Hindi/Hinglish content
)

# Access individual components
transcript = result['transcript']
summary = result['summary']
rag_chain = result['rag_chain']

print(f"Transcript length: {len(transcript)} characters")
print(f"Summary: {summary}")
```

### Example 3: Integrate with External Systems

```python
from main import run_pipeline
import json

# Process and export
result = run_pipeline("https://youtube.com/watch?v=example")

# Export to JSON
output = {
    "meeting": {
        "title": result["title"],
        "summary": result["summary"],
        "action_items": result["action_items"],
        "decisions": result["key_decisions"],
        "questions": result["open_questions"]
    }
}

with open("meeting_analysis.json", "w") as f:
    json.dump(output, f, indent=2)
```

---

## 🐛 Troubleshooting

### Common Issues and Solutions

#### 1. **ModuleNotFoundError: No module named 'whisper'**

**Solution:**
```bash
pip install openai-whisper torch torchaudio
```

#### 2. **FFmpeg not found**

**Error:** `FileNotFoundError: [WinError 2] The system cannot find the file specified.`

**Solution:**
- Verify FFmpeg installation
- Check PATH environment variable includes FFmpeg `/bin` directory
- Restart terminal/IDE after adding to PATH

#### 3. **CUDA out of memory (GPU users)**

**Solution:**
```python
# Use smaller Whisper model
import os
os.environ['WHISPER_MODEL'] = 'tiny'  # or 'base', 'small'
```

#### 4. **Mistral API key not found**

**Error:** `ValueError: MISTRAL_API_KEY not set`

**Solution:**
- Verify `.env` file exists in project root
- Check API key is correctly set
- Reload environment: `from dotenv import load_dotenv; load_dotenv()`

#### 5. **YouTube download fails**

**Error:** `yt-dlp` error when downloading

**Solution:**
```bash
# Update yt-dlp
pip install --upgrade yt-dlp
```

#### 6. **Slow transcription**

**Performance Tips:**
- Use smaller Whisper model (tiny, base)
- Ensure sufficient RAM (16GB+ recommended)
- For GPU: check CUDA availability
- Process audio in parallel chunks

#### 7. **ChromaDB persistence issues**

**Solution:**
```bash
# Clear cache
rm -rf ./chroma_db

# Rebuild vector store
python main.py  # Re-process your content
```

---

## 🤝 Contributing

Contributions are welcome! Here's how to contribute:

### Development Setup

```bash
# Clone repo
git clone https://github.com/Abhinav053/Ai_video_Assistant_RAG.git
cd AI-Video-Assistant-

# Create feature branch
git checkout -b feature/your-feature-name

# Make changes and test
pytest test.py

# Commit changes
git add .
git commit -m "Add descriptive commit message"

# Push to GitHub
git push origin feature/your-feature-name

# Create Pull Request
```

### Code Style Guidelines

- Use meaningful variable and function names
- Add docstrings to functions
- Follow PEP 8 style guide
- Include type hints where possible
- Test your changes before submitting PR

### Areas for Contribution

- 🐛 Bug fixes
- ✨ New features (language support, export formats, etc.)
- 📚 Documentation improvements
- 🧪 Tests and test coverage
- 🎨 UI/UX enhancements
- ⚡ Performance optimizations

---

## 📄 License

This project is licensed under the MIT License - see LICENSE file for details.

---

## 🙏 Acknowledgments

- **OpenAI Whisper** - Speech recognition model
- **Mistral AI** - Language model and API
- **LangChain** - LLM orchestration framework
- **ChromaDB** - Vector database
- **Streamlit** - Web framework
- **HuggingFace** - Embedding models
- **Sarvam AI** - Hindi transcription support

---

## 📞 Support & Contact

For issues, questions, or suggestions:

- **GitHub Issues:** [Project Issues](https://github.com/Abhinav053/Ai_video_Assistant_RAG/issues)
- **Email:** Contact project maintainers
- **Discussions:** Join our community discussions

---

## 🚀 Roadmap

### Upcoming Features

- [ ] Real-time transcription from camera/microphone
- [ ] Support for more languages (Spanish, French, German, etc.)
- [ ] Advanced speaker identification and attribution
- [ ] Integration with calendar systems
- [ ] Slack/Teams notifications for action items
- [ ] Custom prompt templates for extraction
- [ ] Batch processing for multiple videos
- [ ] Sentiment analysis
- [ ] Meeting cost calculator
- [ ] API endpoint deployment

---

## 📊 Performance Metrics

| Operation | Time (approx.) | Notes |
|-----------|---|---|
| YouTube Download (5 min video) | 10-15s | Depends on internet speed |
| Transcription (5 min audio) | 20-30s | With "small" model, varies by hardware |
| Summarization | 5-10s | LLM processing time |
| Extraction (Actions/Decisions) | 3-5s | Per extraction type |
| RAG Query Response | 2-5s | Depends on query complexity |
| **Total Pipeline (5 min video)** | **~1-2 min** | End-to-end processing |

---

**Last Updated:** June 2024  
**Version:** 1.0.0  
**Status:** Active Development

---

Made with ❤️ by the AI Video Assistant Team
