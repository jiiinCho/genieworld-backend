import { Request, Response } from "express";
import * as characterRepository from "../data/characters";

export async function getByUsername(req: Request, res: Response) {
  const username = req.query.username;
  if (username) {
    const found = await characterRepository.getByUsername(username.toString());
    found ? res.status(200).json(found) : res.sendStatus(404);
  }
}

export async function create(req: Request, res: Response) {
  const created = await characterRepository.create(req.body);
  res.status(201).json(created);
}

export async function update(req: Request, res: Response) {
  const id = req.params.id;
  if (id) {
    const updated = await characterRepository.update(id.toString(), req.body);
    if (updated) {
      res.status(200).json(updated);
    } else {
      res.status(400).json({ message: `update item ${id} failed` });
    }
  }
}
