import { useCallback, useState } from "react";

const useInput = (initialValue: any) => {
  const [value, setValue] = useState(initialValue);
  const changeHandler = useCallback((e) => {
    setValue(e.target.value);
  }, []);
  return [value, changeHandler, setValue];
};

export default useInput;
