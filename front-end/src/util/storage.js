export const getStorage = (key) => {
  const data = localStorage.getItem(key);
  console.log("storage data=>",data)
  if (data) {
    return JSON.parse(data);
  }
  return null;
};

export const setStorage = (key, data) => {
  console.log("set Storage", key);
  if (key && data) {
    localStorage.setItem(key, JSON.stringify(data));
  }
};
