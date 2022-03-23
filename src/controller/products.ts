import { Request, Response } from "express";
import * as productsRepository from "../data/products";

export async function getAll(req: Request, res: Response) {
  const category = req.query.category;
  const keyword = req.query.keyword;
  if (category) {
    const found = await productsRepository.searchByCategory(
      category.toString()
    );
    res.status(200).json(found);
  } else if (keyword) {
    const found = await productsRepository.searchByKeyword(keyword.toString());
    res.status(200).json(found);
  } else {
    res.status(200).json(await productsRepository.getAll());
  }
}
