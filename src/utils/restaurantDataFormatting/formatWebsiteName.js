// cleans up website name
export const formatWebsiteName = (name) => {
  return name.endsWith("/")
    ? name
        .slice(0, -1)
        .replace("http://", "")
        .replace("https://", "")
        .replace("www.", "")
    : name.replace("http://", "").replace("https://", "").replace("www.", "");
};
