export enum GENDER {
  "M" = "Male",
  "F" = "Female",
}

export const VALIDATION_RULES = {
  ALPHABETS_ONLY: /^[a-zA-Z]*$/,
  LK_PHONE_NUMBERS:
    /^(?:\+94)(?:(11|21|23|24|25|26|27|31|32|33|34|35|36|37|38|41|45|47|51|52|54|55|57|63|65|66|67|81|91)(0|2|3|4|5|7|9)|7(0|1|2|4|5|6|7|8)\d)\d{6}$/,
  EMAIL: /^\w+([.-]\w+)*@\w+([.-]\w+)*(\.\w{2,3})+$/,
};

export const DEFAULT_IMAGE = "https://via.placeholder.com/300x200?text=Image";
