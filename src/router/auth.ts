import express from "express";
import "express-async-errors";
import { body } from "express-validator";
import * as authController from "../controller/auth";
import { validate } from "../middleware/validator";
import { isAuth } from "../middleware/auth";

const router = express.Router();

const validateAuth = [
  body("username")
    .isLength({ min: 3, max: 10 })
    .withMessage("Username must be between 3 to 10 characters")
    .matches(/^[a-zA-Z0-9_]+$/)
    .withMessage(
      "Only alphabet, numbers and underscore are allowed for username"
    ),
  body("password")
    .isLength({ min: 5, max: 10 })
    .withMessage("Password must be between 3 to 10 characters")
    .matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).*$/)
    .withMessage(
      "Password must include at least 1 uppercase, 1 lowercase alphabet and 1 numeric character"
    ),
  validate,
];

router.post("/signup", validateAuth, authController.signup);

router.post("/signin", validateAuth, authController.signin);

//[DELETE] /auth/:username  ...remove username & base genie info [todo]
router.delete("/:username", authController.remove);

router.get("/me", isAuth, authController.me);

export default router;
