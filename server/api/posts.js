const express = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const router = express.Router();

// Get all posts
router.get("/posts", async (req, res) => {
  const posts = await prisma.post.findMany();
  res.json(posts);
});

// Get single post by ID
router.get("/posts/:id", async (req, res) => {
  const post = await prisma.post.findUnique({
    where: { id: parseInt(req.params.id) }
  });
  res.json(post);
});

// Create a new post
router.post("/posts", async (req, res) => {
  if (!req.user) return res.status(401).send('Unauthorized');
  const { title, content } = req.body;
  const newPost = await prisma.post.create({
    data: { title, content, userId: req.user.id }
  });
  res.status(201).json(newPost);
});

// Update a post
router.put("/posts/:id", async (req, res) => {
  if (!req.user) return res.status(401).send('Unauthorized');
  const { title, content } = req.body;
  const updatedPost = await prisma.post.update({
    where: { id: parseInt(req.params.id) },
    data: { title, content }
  });
  res.json(updatedPost);
});

// Delete a post
router.delete("/posts/:id", async (req, res) => {
  if (!req.user) return res.status(401).send('Unauthorized');
  const deletedPost = await prisma.post.delete({
    where: { id: parseInt(req.params.id) }
  });
  res.json(deletedPost);
});

module.exports = router;
