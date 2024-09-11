import express from "express";
import { PrismaClient } from "@prisma/client";
import cors from "cors";

const prisma = new PrismaClient();

const app = express();
app.use(cors());  // Adicione esta linha
app.use(express.json());

const port = 3000;

app.post("/usuarios", async (req, res) => {
  try {
    await prisma.user.create({
      data: {
        email: req.body.email,
        name: req.body.name,
        age: req.body.age,
      },
    });
    res.status(201).json(req.body);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao criar usuário." });
  }
});

app.get("/usuarios", async (req, res) => {
  try {
    let users = [];
    if (req.query.name || req.query.email || req.query.age) {
      users = await prisma.user.findMany({
        where: {
          name: req.query.name || undefined,
          email: req.query.email || undefined,
          age: req.query.age ? parseInt(req.query.age) : undefined,
        },
      });
    } else {
      users = await prisma.user.findMany();
    }
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar usuários." });
  }
});

app.put("/usuarios/:id", async (req, res) => {
  try {
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
    res.status(200).json(req.body);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao atualizar usuário." });
  }
});

app.delete("/usuarios/:id", async (req, res) => {
  try {
    await prisma.user.delete({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ message: "Usuário deletado com sucesso!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao deletar usuário." });
  }
});

app.listen(port);

// Senha de usuario no mongodb: ef2Ejq7Tck9QIzQ3
//Usuario do mongodb: Dinei
// Para rodar o prisma: npx prisma studio
// Para rodar o servidor: node server.js