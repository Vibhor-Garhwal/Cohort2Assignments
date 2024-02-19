import { atom } from "recoil";
export const cardAtom = atom({
  key: "cardAtom",
  default: {
    picture: "URL",
    namefield: "Vibhor Garhwal",
    age: 23,
    location: "Kolkata",
    followers: 2700,
    likes: 4200,
    photos: 90,
  },
});
