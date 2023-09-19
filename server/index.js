const express = require("express");
const app = express();
const ViteExpress = require("vite-express")
const path = require("path");
const jwt = require("jsonwebtoken");
const PORT = 8081;
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const cors = require("cors");

app.use(cors());
app.use("/", express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Move this middleware up, before the routes.
app.use((req, res, next) => {
  console.log("req headers", req.headers);
  const auth = req.headers.authorization;
  const token = auth?.startsWith("Bearer ") ? auth.slice(7) : null;

  try {
    req.user = jwt.verify(token, process.env.JWT);
  } catch {
    req.user = null;
  }

  next();
});

// Now add the routes.
app.use("/api", require("./api/posts.js"));
app.use("/auth", require("./auth/auth.js"));

app.use((req, res, next) => {
  console.log("req headers", req.headers);
  const auth = req.headers.authorization;
  const token = auth?.startsWith("Bearer ") ? auth.slice(7) : null;

  try {
    req.user = jwt.verify(token, process.env.JWT);
  } catch {
    req.user = null;
  }

  next();
});

const server = app.listen(PORT, () => {
  console.log("On port" + PORT);
});

ViteExpress.bind(app, server)

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || "Internal server error.");
});