const http = require("http");

const VERSION = process.env.APP_VERSION || "1.2.0";
const ENVIRONMENT = process.env.APP_ENV || "Local";
const GIT_SHA = process.env.GIT_SHA || "development";

const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>AgroCD Demo</title>
  <style>
    * {
      box-sizing: border-box;
    }

    body {
      margin: 0;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      background: #f4f7f5;
      color: #1f2937;
    }

    .header {
      background: linear-gradient(135deg, #166534, #22c55e);
      color: white;
      padding: 28px 20px;
    }

    .header-content {
      max-width: 1100px;
      margin: 0 auto;
    }

    .header h1 {
      margin: 0 0 8px;
      font-size: 32px;
    }

    .header p {
      margin: 0;
      opacity: 0.9;
    }

    .container {
      max-width: 1100px;
      margin: 30px auto;
      padding: 0 20px;
    }

    .status {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: #dcfce7;
      color: #166534;
      padding: 8px 14px;
      border-radius: 999px;
      font-weight: 600;
      margin-bottom: 24px;
    }

    .dot {
      width: 10px;
      height: 10px;
      background: #22c55e;
      border-radius: 50%;
    }

    .cards {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: 18px;
      margin-bottom: 24px;
    }

    .card {
      background: white;
      border-radius: 14px;
      padding: 22px;
      box-shadow: 0 4px 18px rgba(0, 0, 0, 0.06);
    }

    .card h3 {
      margin: 0 0 10px;
      color: #6b7280;
      font-size: 14px;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .value {
      font-size: 24px;
      font-weight: 700;
      color: #111827;
      word-break: break-word;
    }

    .section {
      background: white;
      border-radius: 14px;
      padding: 24px;
      box-shadow: 0 4px 18px rgba(0, 0, 0, 0.06);
      margin-bottom: 24px;
    }

    .section h2 {
      margin-top: 0;
      color: #166534;
    }

    .row {
      display: flex;
      justify-content: space-between;
      gap: 20px;
      padding: 13px 0;
      border-bottom: 1px solid #e5e7eb;
    }

    .row:last-child {
      border-bottom: none;
    }

    .label {
      color: #6b7280;
    }

    .footer {
      text-align: center;
      color: #6b7280;
      padding: 20px;
      font-size: 14px;
    }

    code {
      background: #f3f4f6;
      padding: 3px 7px;
      border-radius: 5px;
    }
  </style>
</head>

<body>
  <header class="header">
    <div class="header-content">
      <h1>🌱 AgroCD Demo</h1>
      <p>CI/CD + GitOps learning application</p>
    </div>
  </header>

  <main class="container">
    <div class="status">
      <span class="dot"></span>
      Application Healthy
    </div>

    <div class="cards">
      <div class="card">
        <h3>Application</h3>
        <div class="value">agrocd-demo</div>
      </div>

      <div class="card">
        <h3>Version</h3>
        <div class="value">${VERSION}</div>
      </div>

      <div class="card">
        <h3>Environment</h3>
        <div class="value">${ENVIRONMENT}</div>
      </div>

      <div class="card">
        <h3>Platform</h3>
        <div class="value">Node.js</div>
      </div>
    </div>

    <section class="section">
      <h2>🚀 Deployment Information</h2>

      <div class="row">
        <span class="label">Application status</span>
        <strong>Healthy</strong>
      </div>

      <div class="row">
        <span class="label">Version</span>
        <strong>${VERSION}</strong>
      </div>

      <div class="row">
        <span class="label">Environment</span>
        <strong>${ENVIRONMENT}</strong>
      </div>

      <div class="row">
        <span class="label">Git commit</span>
        <strong><code>${GIT_SHA}</code></strong>
      </div>
    </section>

    <section class="section">
      <h2>🔄 GitOps Pipeline</h2>

      <div class="row">
        <span class="label">Source</span>
        <strong>GitHub</strong>
      </div>

      <div class="row">
        <span class="label">CI</span>
        <strong>GitHub Actions</strong>
      </div>

      <div class="row">
        <span class="label">Container Registry</span>
        <strong>GHCR</strong>
      </div>

      <div class="row">
        <span class="label">GitOps</span>
        <strong>Argo CD</strong>
      </div>

      <div class="row">
        <span class="label">Orchestration</span>
        <strong>Kubernetes</strong>
      </div>
    </section>

    <section class="section">
      <h2>🔗 Endpoints</h2>

      <div class="row">
        <span class="label">Health check</span>
        <strong><code>/health</code></strong>
      </div>

      <div class="row">
        <span class="label">Application info</span>
        <strong><code>/api/info</code></strong>
      </div>

      <div class="row">
        <span class="label">Dashboard</span>
        <strong><code>/</code></strong>
      </div>
    </section>
  </main>

  <footer class="footer">
    AgroCD Demo · Built for CI/CD + GitOps learning
  </footer>
</body>
</html>
`;

const app = http.createServer((req, res) => {
  if (req.url === "/health") {
    res.writeHead(200, {
      "Content-Type": "application/json"
    });

    res.end(
      JSON.stringify({
        status: "ok",
        version: "1.2.0"
      })
    );

    return;
  }

  if (req.url === "/api/info") {
    res.writeHead(200, {
      "Content-Type": "application/json"
    });

    res.end(
      JSON.stringify({
        application: "agrocd-demo",
        status: "ok",
        version: VERSION,
        environment: ENVIRONMENT,
        gitSha: GIT_SHA,
        platform: "nodejs"
      })
    );

    return;
  }

  if (req.url === "/") {
    res.writeHead(200, {
      "Content-Type": "text/html; charset=utf-8"
    });

    res.end(html);

    return;
  }

  res.writeHead(404, {
    "Content-Type": "application/json"
  });

  res.end(
    JSON.stringify({
      error: "Not Found"
    })
  );
});

module.exports = app;
