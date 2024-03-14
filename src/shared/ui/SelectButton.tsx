import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { Box } from "@mui/material";
interface IMenuItem {
  label: string;
  value: string;
}

export const SelectButton = ({
  value,
  onChangeValue,
  items,
  label,
}: {
  value: string;
  onChangeValue: (e: SelectChangeEvent) => void;
  items: IMenuItem[];
  label: string;
}) => {
  return (
    <>
      <Box sx={{ minWidth: 100 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">{label}</InputLabel>
          <Select className="block" onChange={onChangeValue} value={value}>
            {items.map((el) => (
              <MenuItem key={el.label} value={el.value}>
                {el.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </>
  );
};
