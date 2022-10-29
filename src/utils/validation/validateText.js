// validates text with first name/last name or similar type of fields
// returns error message if invalid or null if valid
export const validateText = (ref) => {
  if (ref?.current) {
    const curr = ref.current;
    if (curr.value === "") {
      return "Field is required.";
    } else if (curr.value.length > 250) {
      return "Field value is too long.";
    } else {
      return null;
    }
  }
};
