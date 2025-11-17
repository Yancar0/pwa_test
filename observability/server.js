// observability/server.js
const express = require("express");
const client = require("prom-client");
const { trace, context } = require("@opentelemetry/api");

const app = express();

// ----- Prometheus -----
const register = new client.Registry();
client.collectDefaultMetrics({ register });

const httpRequestCounter = new client.Counter({
  name: "http_requests_total",
  help: "Total HTTP requests",
});
register.registerMetric(httpRequestCounter);

app.use((req, res, next) => {
  httpRequestCounter.inc();
  console.log(`Request received: ${req.url}`);
  next();
});

// ----- Métricas -----
app.get("/metrics", async (req, res) => {
  res.set("Content-Type", register.contentType);
  res.send(await register.metrics());
});

// ----- Endpoint simulado -----
app.get("/", (req, res) => {
  res.send({ status: "ok", timestamp: Date.now() });
});

// ----- Start -----
app.listen(3000, () => {
  console.log("Metrics server running on port 3000");
});
