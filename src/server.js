const http = require("http");

const PORT = process.env.PORT || 3001;

const server = http.createServer((req, res) => {
  if (req.url === "/health") {
    res.writeHead(200, {
      "Content-Type": "application/json"
    });

    res.end(
      JSON.stringify({
        status: "ok"
      })
    );

    return;
  }

  res.writeHead(200, {
    "Content-Type": "application/json"
  });

  res.end(
    JSON.stringify({
      message: "Hello from Argo CD!",
      version: "1.0.0"
    })
  );
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
