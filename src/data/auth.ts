import { UserReqT } from "./interface";
import * as genieRepository from "./genie";
import * as charactersRepository from "./characters";
import { getUsers } from "../database/database";
import { ObjectId } from "mongodb";

export async function getByUsername(username: string) {
  return getUsers().findOne({ username }).then(mapOptionalUser);
}

export async function getById(id: string) {
  //mongodb usese _id instead of id
  const objectId = new ObjectId(id);
  return getUsers().findOne({ _id: objectId }).then(mapOptionalUser);
}

export async function create(user: UserReqT) {
  //[todo] insert default character in character repository when user create new account
  return getUsers()
    .insertOne(user)
    .then((data) => {
      const id = data.insertedId.toString();
      //[note] do not use _id field in genies table!
      genieRepository.create(user.username, id);
      charactersRepository.createDefault(user.username);
      return id;
    });
}

export async function remove(username: string) {
  //[todo] delete chacters if user delete account
  genieRepository.remove(username);
  charactersRepository.remove(username);
  return getUsers().deleteOne({ username });
}

function mapOptionalUser(user: any) {
  return user ? { ...user, id: user._id.toString() } : user;
}
