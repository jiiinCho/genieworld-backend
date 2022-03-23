export type MusicT = { label: string; audioURL: string };

export type GenieKeyT =
  | "id"
  | "username"
  | "today"
  | "dotori"
  | "createdAt"
  | "friends"
  | "userMusic";
export type GenieInfo = {
  [key in GenieKeyT]?: string | number | Date | MusicT[] | UpdateRequestI[];
};

export type CharacterColors = {
  [key in CharacterKeys]?: string;
};

export type CharacterNames = "genie" | "tiger" | "lazy" | "hipster" | "base";
export type CharacterKeys =
  | "body"
  | "face"
  | "hair"
  | "top"
  | "pants"
  | "shoes"
  | "pattern"
  | "cap"
  | "accessories";

export interface UpdateRequestI extends CharacterColors {
  username: string;
  type: CharacterNames;
}

export interface DefaultCharacterSet extends CharacterColors {
  id: string;
  type: CharacterNames;
}

export interface CharacterI extends UpdateRequestI {
  id: string;
}

export type ProductT = {
  id: number;
  audioURL?: string;
  category: string;
  imageURL: string;
  price: number;
  productName: string;
  type: ItemNames;
};

export type ItemNames = BackgroundNames | CharacterNames;
export type BackgroundNames =
  | "room"
  | "carpet"
  | "bed"
  | "stand"
  | "imac"
  | "floorW"
  | "floorT"
  | "music"
  | "chair"
  | "cat";

export interface UserReqT {
  username: string;
  password: string;
}

export interface UserT extends UserReqT {
  id: string;
}
