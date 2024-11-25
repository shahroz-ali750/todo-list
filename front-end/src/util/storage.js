export const getStorage = (key) => {
  const data = localStorage.getItem(key);
  if (data) {
    return JSON.parse(data);
  }
  return null;
};

export const setStorage = (key, data) => {
  if (key && data) {
    localStorage.setItem(key, JSON.stringify(data));
  };
}
