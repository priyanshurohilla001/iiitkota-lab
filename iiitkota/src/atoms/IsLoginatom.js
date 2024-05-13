import { atom } from "recoil";

export const signupDataAtom = atom({
  key: "signupData", // unique ID (with respect to other atoms/selectors)
  default: {}, // default value (aka initial value)
});
