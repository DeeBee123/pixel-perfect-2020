// validates a password
// returns error message if invalid or null if valid
export const validatePassword = (ref) => {
  if (ref?.current) {
    const curr = ref.current;
    if (curr.value.length < 8) {
      return "Password should be at least 8 symbols.";
    } else if (curr.value.length > 250) {
      return "Field value is too long.";
    } else {
      return null;
    }
  }
};

// checks if repeated password matches the first password input
// returns error message if invalid or null if valid
export const validatePasswordRepeat = (pass1, pass2) => {
  if (pass1?.current && pass2?.current) {
    const curr1 = pass1.current;
    const curr2 = pass2.current;
    return curr1.value !== curr2.value ? "Passwords must be identical." : null;
  }
};
