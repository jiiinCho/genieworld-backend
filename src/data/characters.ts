import { getCharacters } from "../database/database";
import { DefaultCharacterSet } from "./interface";

// let characterDB: CharacterI[] = [];

const defaultCharacterSet: DefaultCharacterSet[] = [
  {
    id: Math.floor(Date.now() * Math.random()).toString(),
    type: "base",
    body: "#edc5a9",
    hair: "#573626",
    face: "#513e3a",
    top: "#f9f9f9",
    pants: "#353535",
    shoes: "#eaeaea",
  },
];

export async function getByUsername(username: string) {
  return getCharacters()
    .find({ username }, { projection: { _id: 0 } })
    .toArray();
}

export async function createDefault(username: string): Promise<void> {
  defaultCharacterSet.forEach((character) => {
    const newCharacter = { ...character, username };
    getCharacters().insertOne(newCharacter);
  });
  return;
}

export async function create(newCharacters: any) {
  let created: any[] = [];
  newCharacters.forEach((char: any) => {
    const character = {
      ...char,
      id: Math.floor(Date.now() * Math.random()).toString(),
    };
    created.push(character);
    getCharacters().insertOne(character);
  });
  return created;
}

export async function update(id: string, update: any) {
  getCharacters().deleteOne({ id });
  return getCharacters()
    .insertOne(update)
    .then((data) => {
      if (data.acknowledged) {
        return update;
      } else {
        return;
      }
    });
}

export async function remove(username: string) {
  return getCharacters().deleteMany({ username });
}
