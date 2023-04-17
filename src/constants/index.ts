export enum GENDER {
  "M" = "Male",
  "F" = "Female",
}

export const VALIDATION_RULES = {
  ALPHABETS_ONLY: /^[a-zA-Z]*$/,
  LK_PHONE_NUMBERS: /^(?:\+94)[0-9]{9}$/,
  EMAIL: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
};

export const DEFAULT_IMAGE = "https://placehold.jp/30/707070/ffffff/180x180.png?text=image";
