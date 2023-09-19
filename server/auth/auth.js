const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

router.post("/register", async (req, res, next) => {
  const salt_rounds = 5;

  try {
    const hashedPassword = await bcrypt.hash(req.body.password, salt_rounds);

    const user = await prisma.user.create({
      data: {
        username: req.body.username,
        password: hashedPassword,
      },
    });

    const token = jwt.sign({ id: user.id }, process.env.JWT);

    res.status(201).json({ token, user: { userId: user.id, username: user.username } });
  } catch (err) {
    next(err);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: { username: req.body.username },
    });

    if (!user) {
      return res.status(401).send("Invalid login");
    }

    const isValid = await bcrypt.compare(req.body.password, user.password);

    if (!isValid) {
      return res.status(401).send("Invalid login");
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT);

    res.json({ token, user: { userId: user.id, username: user.username } });
  } catch (err) {
    next(err);
  }
});


module.exports = router;

