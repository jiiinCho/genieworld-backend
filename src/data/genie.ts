import { GenieInfo } from "./interface";
import { getGenies } from "../database/database";

const defaultGenieSetting: GenieInfo = {
  today: "What's in your mind today?",
  dotori: 300,
  createdAt: new Date(),
  friends: [
    {
      body: "#feeac1",
      cap: "#e3d0e1",
      face: "#a59886",
      hair: "#06c2ff",
      shoes: "#baa4b9",
      top: "#e1d1e1",
      type: "lazy",
      username: "Lulu",
    },
  ],
  userMusic: [
    {
      label: "spring",
      audioURL:
        "https://firebasestorage.googleapis.com/v0/b/business-card-maker-56361.appspot.com/o/bg1.mp3?alt=media&token=c7b20fa8-cd30-44cf-ae68-50aefb4a4f77",
    },
    {
      label: "summer",
      audioURL:
        "https://firebasestorage.googleapis.com/v0/b/business-card-maker-56361.appspot.com/o/bg4.mp3?alt=media&token=f688d184-9528-4a69-ab8f-3b64149a7e06",
    },
  ],
};

export async function getByUsername(username: string): Promise<GenieInfo> {
  return getGenies()
    .findOne({ username })
    .then((data) => {
      return data as GenieInfo;
    });
}

export async function create(username: string, id: string) {
  const newGenie = { ...defaultGenieSetting, username, id };
  getGenies().insertOne(newGenie);
  return newGenie;
}

export async function update(username: string, update: GenieInfo) {
  const { dotori, today } = update;
  const curr = await getGenies().findOne({ username });
  if (curr) {
    const updatedDotori = dotori ? dotori : curr.dotori;
    const updatedToday = today ? today : curr.today;
    return getGenies()
      .findOneAndUpdate(
        { username },
        { $set: { dotori: updatedDotori, today: updatedToday } },
        { returnDocument: "after" }
      )
      .then((result) => result.value);
  } else {
    return;
  }
}

export async function remove(username: string) {
  return getGenies().deleteOne({ username });
}
