import {
  CharacteristicsNestedTabs,
  ChoosedCharacteristicsNestedTabs,
} from "@/features/characteristics";
import { ModalLayout } from "@/shared";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Tab } from "@mui/material";
import { useState } from "react";

export const RecipeCharacteristicsModal = ({
  isOpen,
  onCloseModal,
  onAddHoliday,
  onAddNationalCuisine,
  onAddType,
}: {
  isOpen: boolean;
  onCloseModal: () => void;
  onAddType: (e: any) => void;
  onAddHoliday: (e: any) => void;
  onAddNationalCuisine: (e: any) => void;
}) => {
  const [tab, setTab] = useState("1");

  const handleChangeTab = (_: any, tab: string) => setTab(tab);

  return (
    <ModalLayout width="w-1/2" isOpen={isOpen} onCloseModal={onCloseModal}>
      <TabContext value={tab}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            borderColor: "divider",
          }}
        >
          <TabList onChange={handleChangeTab} aria-label="lab API tabs example">
            <Tab label="характеристики" value="1" />
            <Tab label="выбранные харк-стики" value="2" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <CharacteristicsNestedTabs
            onAddHoliday={onAddHoliday}
            onAddNationalCuisine={onAddNationalCuisine}
            onAddType={onAddType}
          />
        </TabPanel>
        <TabPanel value="2">
          <ChoosedCharacteristicsNestedTabs />
        </TabPanel>
      </TabContext>
    </ModalLayout>
  );
};
