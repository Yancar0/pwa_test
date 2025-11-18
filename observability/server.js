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
  labelNames: ['method', 'route', 'status']
});

const httpRequestDuration = new client.Histogram({
  name: "http_request_duration_seconds",
  help: "HTTP request duration in seconds",
  labelNames: ['method', 'route', 'status'],
  buckets: [0.001, 0.005, 0.01, 0.05, 0.1, 0.5, 1, 2, 5]
});

register.registerMetric(httpRequestCounter);
register.registerMetric(httpRequestDuration);

app.use((req, res, next) => {
  const start = Date.now();
  const method = req.method;
  const route = req.route ? req.route.path : req.path;
  
  res.on('finish', () => {
    const duration = (Date.now() - start) / 1000;
    const status = res.statusCode;
    
    httpRequestCounter.inc({ method, route, status: status.toString() });
    httpRequestDuration.observe({ method, route, status: status.toString() }, duration);
  });
  
  console.log(`Request received: ${req.method} ${req.url}`);
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