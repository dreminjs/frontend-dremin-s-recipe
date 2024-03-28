import { MenuItem, Select, SelectChangeEvent } from "@mui/material";

export const SelectSortButton = ({
  value,
  onChangeLabel,
}: {
  value: string;
  onChangeLabel: (event: SelectChangeEvent<string>) => void;
}) => {
  return (
    <Select
      labelId="demo-simple-select-label"
      id="demo-simple-select"
      value={value}
      title="выбирте"
      label="сортировка"
      className="w-[100px]"
      onChange={onChangeLabel}
    >
      <MenuItem value={"desc"}>больше всего лайков</MenuItem>
      <MenuItem value={"asc"}>меньше всего лайков</MenuItem>
      <MenuItem value={"none"}>none</MenuItem>
    </Select>
  );
};
