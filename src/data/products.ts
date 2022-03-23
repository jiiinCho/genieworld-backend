import { ProductT } from "./interface";

const productDB: ProductT[] = [
  {
    id: 1,
    productName: "Genie",
    category: "character",
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/business-card-maker-56361.appspot.com/o/char_genie.svg?alt=media&token=425fe1d2-e3d2-4ea9-bd36-06ea1dfc7137",
    price: 120,
    type: "genie",
  },
  {
    id: 2,
    productName: "Hipster",
    category: "character",
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/business-card-maker-56361.appspot.com/o/char_hipster.svg?alt=media&token=a42ab1a8-395f-4a61-bae7-53e988d84a8d",
    price: 120,
    type: "hipster",
  },
  {
    id: 3,
    productName: "Lazy",
    category: "character",
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/business-card-maker-56361.appspot.com/o/char_lazy.svg?alt=media&token=0822395e-949b-4709-8166-6b4f358a392b",
    price: 120,
    type: "lazy",
  },
  {
    id: 4,
    productName: "Tiger",
    category: "character",
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/business-card-maker-56361.appspot.com/o/char_tiger.svg?alt=media&token=283895fe-84bb-4b98-af05-35d336f85280",
    price: 120,
    type: "tiger",
  },
  {
    id: 5,
    productName: "Bed",
    category: "furniture",
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/business-card-maker-56361.appspot.com/o/fur_bed.svg?alt=media&token=d3487fc6-81ad-4650-95f1-1d3867e6869b",
    price: 120,
    type: "bed",
  },
  {
    id: 6,
    productName: "Cats",
    category: "furniture",
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/business-card-maker-56361.appspot.com/o/fur_cat.svg?alt=media&token=fc9b59fc-308e-440d-9b90-2a7a74849b89",
    price: 120,
    type: "cat",
  },
  {
    id: 7,
    productName: "Chair",
    category: "furniture",
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/business-card-maker-56361.appspot.com/o/fur_chair.svg?alt=media&token=ebe81934-0707-4863-8057-5dee679b9553",
    price: 120,
    type: "chair",
  },
  {
    id: 8,
    productName: "Wooden Floor",
    category: "furniture",
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/business-card-maker-56361.appspot.com/o/fur_floorB.png?alt=media&token=9c195988-7f66-49e2-95ec-234b6cd53648",
    price: 120,
    type: "floorW",
  },
  {
    id: 9,
    productName: "Tile Floor",
    category: "furniture",
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/business-card-maker-56361.appspot.com/o/fur_floorA.png?alt=media&token=6d576458-e3b3-4ad1-a41a-e68b0196f5df",
    price: 120,
    type: "floorT",
  },
  {
    id: 10,
    productName: "Music 1",
    category: "music",
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/business-card-maker-56361.appspot.com/o/note.svg?alt=media&token=519bf693-8634-4c5b-95c1-5766d2c5c451",
    audioURL:
      "https://firebasestorage.googleapis.com/v0/b/business-card-maker-56361.appspot.com/o/bg1.mp3?alt=media&token=c7b20fa8-cd30-44cf-ae68-50aefb4a4f77",
    price: 120,
    type: "music",
  },
  {
    id: 11,
    productName: "Music 2",
    category: "music",
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/business-card-maker-56361.appspot.com/o/note.svg?alt=media&token=519bf693-8634-4c5b-95c1-5766d2c5c451",
    audioURL:
      "https://firebasestorage.googleapis.com/v0/b/business-card-maker-56361.appspot.com/o/bg4.mp3?alt=media&token=f688d184-9528-4a69-ab8f-3b64149a7e06",
    price: 120,
    type: "music",
  },
];

export async function getAll(): Promise<ProductT[]> {
  return productDB;
}

export async function searchByCategory(category: string): Promise<ProductT[]> {
  if (category === "all") {
    return productDB;
  }
  const found = productDB.filter((product) => product.category === category);
  return found;
}

export async function searchByKeyword(keyword: string): Promise<ProductT[]> {
  const found = productDB.filter(
    (product) => product.productName.toLowerCase().search(keyword) > -1
  );
  return found;
}
