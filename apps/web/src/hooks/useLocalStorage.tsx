'use client';

const useLocalStorage = (key: string) => {
  const setValue = (value: any) => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
      return value;
    } catch (error) {
      return error;
    }
  };

  const getValue = () => {
    try {
      const value = window.localStorage.getItem(key);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      return error;
    }
  };

  const removeValue = () => {
    try {
      window.localStorage.removeItem(key);
      return key;
    } catch (error) {
      return error;
    }
  };

  return { getValue, setValue, removeValue, value: getValue() };
};

export default useLocalStorage;
