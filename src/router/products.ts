import express from "express";
import "express-async-errors";
import * as productsController from "../controller/products";

const router = express.Router();

//[GET] /products
router.get("/", productsController.getAll);

export default router;
