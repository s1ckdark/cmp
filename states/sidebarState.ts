import { atom } from "recoil";

const isOpenState = atom({
  key: "isOpenState",
  default: false
});

export { isOpenState } 