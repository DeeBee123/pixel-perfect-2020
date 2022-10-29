// Creates clean paths from strings

export const createPathFromString = (linkString) => {
  return linkString
    .normalize("NFKD") //lithuanian characters
    .replace(/[\u0300-\u036F]/g, "") //removes special characters
    .replace(/[,(){}[\]]/g, "") //removes ,(){}[] symbols
    .replace(/\s+/g, "-") //spaces to dashes
    .toLowerCase() //to lowercase
    .replaceAll("---", "-"); // remove repetitive dashes
};
