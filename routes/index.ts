import { Router } from "express";
import {
  getUsers,
  getUserById,
  addUser,
  deleteUser,
  editUser
} from "../controllers/index.controllers";
const router = Router();

router.get("/users", getUsers);
router.get("/users/:id", getUserById);

router.post("/users", addUser);
router.put("/users/:id", editUser);
router.delete("/users/:id", deleteUser);

export default router;
