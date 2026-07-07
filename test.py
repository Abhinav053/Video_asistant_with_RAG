from dotenv import load_dotenv
load_dotenv()   # MUST be before any core/ imports

from utils.audio_processor import process_input
from core.transcriber import transcribe_all
from core.summarizer import generate_title, summarize

source = "https://www.youtube.com/watch?v=hnQgHIgQqZM"
language = "english"   # "english" → Whisper, "hinglish" → Sarvam

print("Processing video...")
chunks = process_input(source)

print("Transcribing...")
transcript = transcribe_all(chunks, language=language)

if not transcript.strip():
    raise RuntimeError(
        "Transcript is empty. The audio may contain no clear speech, the wrong language mode may be selected, "
        "or Whisper could not understand the audio. Try another video or use language='hinglish' for Hindi/Hinglish speech."
    )

print("Generating title...")
title = generate_title(transcript)

print("Generating summary...")
summary = summarize(transcript)

# Print results
print("\n" + "=" * 60)
print("transcript")
print("=" * 60)
print(transcript)

print("\n" + "=" * 60)
print("SUMMARY")
print("=" * 60)
print(summary)
