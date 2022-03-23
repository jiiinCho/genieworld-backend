import { Request, Response } from "express";
import * as genieRepository from "../data/genie";

export async function getByUsername(req: Request, res: Response) {
  const username = req.query.username;
  if (username) {
    const found = await genieRepository.getByUsername(username.toString());
    found
      ? res.status(200).json(found)
      : res.status(404).json({ message: `Username ${username} is not exist` });
  }
}

export async function create(req: Request, res: Response) {
  const username = req.body.userame;
  req.userId
    ? res.status(201).json(await genieRepository.create(username, req.userId))
    : res.status(403).json({ message: "userId is missing in request header" });
}

export async function update(req: Request, res: Response) {
  const username = req.query.username; //req.body = { dotori : 200 }
  if (username) {
    const genie = await genieRepository.getByUsername(username.toString());
    if (!genie) {
      res.sendStatus(404); //Not found
    } else {
      const updated = await genieRepository.update(
        username.toString(),
        req.body
      );
      res.status(200).json(updated);
    }
  }
}

export async function remove(req: Request, res: Response) {
  const username = req.params.username;
  if (username) {
    const genie = await genieRepository.getByUsername(username.toString());
    if (!genie) {
      res.sendStatus(404); //Not found
    } else {
      if (genie.id !== req.userId) {
        res.sendStatus(403); //Forbidden
      } else {
        await genieRepository.remove(username.toString());
        res.sendStatus(204);
      }
    }
  }
}
