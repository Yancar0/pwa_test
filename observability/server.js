const express = require("express");
const client = require("prom-client");
const { NodeSDK } = require("@opentelemetry/sdk-node");
const { getNodeAutoInstrumentations } = require("@opentelemetry/auto-instrumentations-node");
const { OTLPTraceExporter } = require("@opentelemetry/exporter-trace-otlp-http");

const app = express();

// ----- OpenTelemetry -----
const sdk = new NodeSDK({
  traceExporter: new OTLPTraceExporter({
    url: process.env.OTEL_EXPORTER_OTLP_ENDPOINT || "http://jaeger:4317"
  }),
  instrumentations: [getNodeAutoInstrumentations()]
});
sdk.start();

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

// ----- Endpoint métricas -----
app.get("/metrics", async (req, res) => {
  res.set("Content-Type", register.contentType);
  res.send(await register.metrics());
});

// ----- Endpoint principal -----
app.get("/", (req, res) => {
  res.send({ status: "ok", timestamp: Date.now() });
});

app.listen(3000, () => {
  console.log("Metrics server running on port 3000");
});
