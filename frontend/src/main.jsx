import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import { Bot, FileText, Loader2, MessageSquare, Send } from "lucide-react";
import "./styles.css";

const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

function TextBlock({ title, value }) {
  if (!value) return null;

  return (
    <section className="panel">
      <h2>{title}</h2>
      <p>{value}</p>
    </section>
  );
}

function App() {
  const [source, setSource] = useState("");
  const [language, setLanguage] = useState("english");
  const [result, setResult] = useState(null);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [asking, setAsking] = useState(false);
  const [error, setError] = useState("");

  async function processSource(event) {
    event.preventDefault();
    setLoading(true);
    setError("");
    setAnswer("");
    setResult(null);

    try {
      const response = await fetch(`${backendUrl}/api/process`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ source, language }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Processing failed");
      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function askQuestion(event) {
    event.preventDefault();
    if (!result?.session_id) return;

    setAsking(true);
    setError("");
    setAnswer("");

    try {
      const response = await fetch(`${backendUrl}/api/ask`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ session_id: result.session_id, question }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Question failed");
      setAnswer(data.answer);
    } catch (err) {
      setError(err.message);
    } finally {
      setAsking(false);
    }
  }

  return (
    <main className="app-shell">
      <header className="topbar">
        <div>
          <h1>AI Video Assistant</h1>
          <p>Transcribe, summarize, extract meeting details, and ask transcript questions.</p>
        </div>
        <Bot size={32} aria-hidden="true" />
      </header>

      <form className="toolbar" onSubmit={processSource}>
        <label>
          Source
          <input
            value={source}
            onChange={(event) => setSource(event.target.value)}
            placeholder="YouTube URL or local file path"
            required
          />
        </label>

        <label>
          Language
          <select value={language} onChange={(event) => setLanguage(event.target.value)}>
            <option value="english">English</option>
            <option value="hinglish">Hinglish</option>
          </select>
        </label>

        <button type="submit" disabled={loading}>
          {loading ? <Loader2 className="spin" size={18} /> : <FileText size={18} />}
          Process
        </button>
      </form>

      {error && <div className="error">{error}</div>}

      {result && (
        <>
          <section className="result-header">
            <h2>{result.title}</h2>
          </section>

          <div className="grid">
            <TextBlock title="Summary" value={result.summary} />
            <TextBlock title="Action Items" value={result.action_items} />
            <TextBlock title="Key Decisions" value={result.key_decisions} />
            <TextBlock title="Open Questions" value={result.open_questions} />
          </div>

          <section className="panel transcript">
            <h2>Transcript</h2>
            <p>{result.transcript}</p>
          </section>

          <form className="askbar" onSubmit={askQuestion}>
            <MessageSquare size={20} aria-hidden="true" />
            <input
              value={question}
              onChange={(event) => setQuestion(event.target.value)}
              placeholder="Ask a question about the transcript"
              required
            />
            <button type="submit" disabled={asking}>
              {asking ? <Loader2 className="spin" size={18} /> : <Send size={18} />}
              Ask
            </button>
          </form>

          {answer && (
            <section className="panel">
              <h2>Answer</h2>
              <p>{answer}</p>
            </section>
          )}
        </>
      )}
    </main>
  );
}

createRoot(document.getElementById("root")).render(<App />);
