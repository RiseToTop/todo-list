// 存储数据
const saveDataToLocalStorage = <T>(key: string, value: T): void => {
  localStorage.setItem(key, JSON.stringify(value));
};

// 获取数据
const getDataFromLocalStorage = <T>(key: string): T | null => {
  const value = localStorage.getItem(key);
  return value ? JSON.parse(value) : null;
};

export { saveDataToLocalStorage, getDataFromLocalStorage };
