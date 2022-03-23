import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import * as authRepository from "../data/auth";
import { config } from "../config";

const jwtSecretKey = config.jwt.secretKey;
const jwtExpiresInSec = config.jwt.expiresInSec;
const bcryptSaltRounds = config.bcrypt.saltRounds;

export async function signup(req: Request, res: Response) {
  const { username, password } = req.body;
  if (username) {
    const found = await authRepository.getByUsername(username.toString());
    if (found) {
      res.status(409).json({ message: `${username} already exist` });
    } else {
      const hashed = await bcrypt.hash(password, bcryptSaltRounds);
      const id = await authRepository.create({
        username,
        password: hashed,
      });
      //token is encrypt value
      //if we decrpyt token it contains username and password information
      const token = createJwtToken(id);
      res.status(201).json({ username, token, id });
    }
  }
}

export async function signin(req: Request, res: Response) {
  const { username, password } = req.body;
  if (username) {
    const user = await authRepository.getByUsername(username.toString());
    if (!user) {
      res.status(401).json({ message: "Invalid username or password" });
    } else {
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        res.status(401).json({ message: "Invalid username or passwwrd" });
      } else {
        const id = user.id;
        const token = createJwtToken(id);
        res.status(200).json({ token, username, id });
      }
    }
  }
}

export async function remove(req: Request, res: Response) {
  const username = req.params.username;
  if (username) {
    await authRepository.remove(username.toString());
    res.sendStatus(204);
  }
}

export async function me(req: Request, res: Response) {
  if (req.userId) {
    const user = await authRepository.getById(req.userId);
    user
      ? res
          .status(200)
          .json({ token: req.token, username: user.username, id: user.id })
      : res.status(404).json({ message: "User not found" });
  } else {
    res.status(404).json({ message: "User not found" });
  }
}

function createJwtToken(id: string) {
  return jwt.sign({ id }, jwtSecretKey, { expiresIn: jwtExpiresInSec });
}
