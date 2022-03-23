import express from "express";
import "express-async-errors";
import * as characterController from "../controller/characters";
import { isAuth } from "../middleware/auth";

const router = express.Router();

//GET /characters?username=:genie -> query
router.get("/", isAuth, characterController.getByUsername);

//POST /characters ...create characters when user purchase new character
router.post("/", isAuth, characterController.create);

//PUT /characters/:id ...update character by ID
router.put("/:id", isAuth, characterController.update);

export default router;
