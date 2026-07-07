import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
const aiServiceUrl = process.env.AI_SERVICE_URL || "http://localhost:8000";
const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";

app.use(cors({ origin: frontendUrl }));
app.use(express.json({ limit: "1mb" }));
app.use(morgan("dev"));

async function callAiService(path, body) {
  const response = await fetch(`${aiServiceUrl}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const message = data.detail || "AI service request failed";
    const error = new Error(message);
    error.status = response.status;
    throw error;
  }

  return data;
}

app.get("/health", async (_req, res, next) => {
  try {
    const response = await fetch(`${aiServiceUrl}/health`);
    const data = await response.json();
    res.json({ status: "ok", ai_service: data.status });
  } catch (error) {
    next(error);
  }
});

app.post("/api/process", async (req, res, next) => {
  try {
    const { source, language = "english" } = req.body;
    const data = await callAiService("/process", { source, language });
    res.json(data);
  } catch (error) {
    next(error);
  }
});

app.post("/api/ask", async (req, res, next) => {
  try {
    const { session_id, question } = req.body;
    const data = await callAiService("/ask", { session_id, question });
    res.json(data);
  } catch (error) {
    next(error);
  }
});

app.use((error, _req, res, _next) => {
  const status = error.status || 500;
  res.status(status).json({ error: error.message || "Server error" });
});

app.listen(port, () => {
  console.log(`Backend running on http://localhost:${port}`);
});
