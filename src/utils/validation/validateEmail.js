// validates email address
// returns error message if invalid or null if valid
export const validateEmail = (ref) => {
  if (ref?.current) {
    const curr = ref.current;
    const regExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const valid = regExp.test(curr.value);
    if (curr.value.length > 250) {
      return "Field value is too long.";
    } else if (!valid) {
      return "Field value must be a valid email.";
    } else {
      return null;
    }
  }
};
