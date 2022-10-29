// cleans up restaurant work hours
export const formatOpenHours = (time) => {
  return `${time.slice(0, 2)}:00 ${time.slice(2)}:00`;
};
