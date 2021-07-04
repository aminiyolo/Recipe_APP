import { useState } from "react";

const useInput = (initialValue) => {
  const [value, setValue] = useState(initialValue);
  const changeHandler = (e) => {
    setValue(e.target.value);
  };
  return [value, changeHandler, setValue];
};

export default useInput;
