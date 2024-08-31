import express from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const app = express();
app.use(express.json());

const port = 3000;

app.post("/usuarios", async (req, res) => {
  await prisma.user.create({
    data: {
      email: req.body.email,
      name: req.body.name,
      age: req.body.age,
    },
  });

  res.status(201).json(req.body);
});

app.get("/usuarios", async (req, res) => {
  let users = [];

  if (req.query) {
    users = await prisma.user.findMany({
      where: {
        name: req.query.name,
        email: req.query.email,
        age: req.query.age,
      },
    });
  } else {
    users = await prisma.user.findMany();
  }

  res.status(200).json(users);
});

app.put("/usuarios/:id", async (req, res) => {
  console.log(req);
  await prisma.user.update({
    where: {
      id: req.params.id,
    },
    data: {
      email: req.body.email,
      name: req.body.name,
      age: req.body.age,
    },
  });

  res.status(201).json(req.body);
});

app.delete("/usuarios/:id", async (req, res) => {
  console.log(req);
  await prisma.user.delete({
    where: {
      id: req.params.id,
    },
  });

  res.status(200).json({ message: "Usuario deletado com sucesso!" });
});

app.listen(port);

// Senha de usuario no mongodb: ef2Ejq7Tck9QIzQ3
//Usuario do mongodb: Dinei
// Para rodar o prisma: npx prisma studio
// Para rodar o servidor: node server.js