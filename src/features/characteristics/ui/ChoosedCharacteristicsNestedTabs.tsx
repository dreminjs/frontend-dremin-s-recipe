import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import { useAppDispatch, useAppSelector } from "@/shared";
import { useState } from "react";
import {
  CharacteristicsList,
  ChoosedCharacteristicsItem,
} from "@/entities/characteristics";
import {
  removeHoliday,
  removeNationalCuisine,
  removeType,
} from "@/shared/model/characteristicsSlice";
import { TabPanel } from "@mui/lab";

export const ChoosedCharacteristicsNestedTabs = () => {
  const [tab, setTab] = useState("1");

  const handleChangeTab = (_: any, tab: string) => setTab(tab);

  const dispatch = useAppDispatch();

  const { holidays, types, nationalCuisines } = useAppSelector(
    (state) => state.characteristicSlice
  );

  const handleRemoveType = (e: any) => {
    dispatch(removeType(e.target.id));
  };

  const handleRemoveNationalCuisine = (e: any) => {
    dispatch(removeNationalCuisine(e.target.id));
  };
  const handleRemoveHoliday = (e: any) => {
    dispatch(removeHoliday(e.target.id));
  };

  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <TabContext value={tab}>
        <Box
          sx={{
            borderBottom: 1,
            display: "flex",
            justifyContent: "center",
            borderColor: "divider",
          }}
        >
          <TabList onChange={handleChangeTab} aria-label="lab API tabs example">
            <Tab label="Национальные кухни" value="3" />
            <Tab label="Типы" value="2" />
            <Tab label="Праздники" value="1" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <CharacteristicsList>
            {holidays.length === 0 && <li>пусто!</li>}
            {holidays.map((el) => (
              <ChoosedCharacteristicsItem
                key={el.id}
                elementId={el.id}
                onRemoveCharacteristic={handleRemoveHoliday}
                name={el.name}
              />
            ))}
          </CharacteristicsList>
        </TabPanel>
        <TabPanel value="2">
          <CharacteristicsList>
            {types.length === 0 && <li>пусто!</li>}
            {types.map((el) => (
              <ChoosedCharacteristicsItem
                key={el.id}
                elementId={el.id}
                onRemoveCharacteristic={handleRemoveType}
                name={el.name}
              />
            ))}
          </CharacteristicsList>
        </TabPanel>
        <TabPanel value="3">
          <CharacteristicsList>
            {nationalCuisines.length === 0 && <li>пусто!</li>}
            {nationalCuisines.map((el) => (
              <ChoosedCharacteristicsItem
                key={el.id}
                elementId={el.id}
                onRemoveCharacteristic={handleRemoveNationalCuisine}
                name={el.name}
              />
            ))}
          </CharacteristicsList>
        </TabPanel>
      </TabContext>
    </Box>
  );
};
