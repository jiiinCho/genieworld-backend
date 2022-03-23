import express from "express";
import "express-async-errors";
import { body } from "express-validator";
import * as genieController from "../controller/genie";
import { validate } from "../middleware/validator";
import { isAuth } from "../middleware/auth";

const router = express.Router();
//[GET] /genie?username=:username
router.get("/", isAuth, genieController.getByUsername);

//[POST] /genie  ... create new genie [todo with signUp] => req.body ={userName : 'leona'}
router.post(
  "/",
  isAuth,
  [
    body("username")
      .isLength({ min: 3 })
      .withMessage("username should be at least 3 characters"),
    validate,
  ],
  genieController.create
);

//[PUT] /genie?username=:username
router.put(
  "/",
  isAuth,
  [
    body("dotori")
      .optional()
      .isNumeric()
      .withMessage("dotori should be numeric"),
    validate,
  ],
  genieController.update
);

//[DELETE] /genie/:username  ...remove genie info if your delete account [todo with signUp]
router.delete("/:username", isAuth, genieController.remove);

export default router;
