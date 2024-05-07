import express from "express";
import {
  addUser,
  deleteUser,
  getUsers,
  getUser,
  updateUser,
} from "../controllers/users.js";

const router = express.Router();

router.get("/", getUsers);

router.get("/:id", getUser);

router.post("/", addUser);

router.put("/:id", updateUser);

router.delete("/:id", deleteUser);

export default router;

//podemos chamar de userRoutes para criar o meu projeto
