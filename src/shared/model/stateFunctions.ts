export const handleChangeInputValue =
  (setInputValue: React.Dispatch<React.SetStateAction<string>>) =>
  (e: React.ChangeEvent<HTMLInputElement>) =>
    setInputValue(e.target.value);
