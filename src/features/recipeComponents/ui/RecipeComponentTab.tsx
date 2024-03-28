import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import Box from "@mui/material/Box";
import TabPanel from "@mui/lab/TabPanel";
import { useState } from "react";
import { AddItemForm } from "@/shared";
import { ChoosedRecipeComponentItem } from "@/entities/recipeComponents/ui/ChoosedRecipeComponentItem";

export const RecipeComponentTab = ({
  tabNumber,
  addComponent,
  onShowComponentInput,
  onChangeComponentInputValue,
  onHideEditInput,
  recipeComponents,
  onRemoveComponent,
}: {
  tabNumber: string;
  addComponent: (name: string) => void;
  recipeComponents: any[];
  onShowComponentInput: (e: any) => void;
  onHideEditInput: (e: any) => void;
  onChangeComponentInputValue: (e: any) => void;
  onRemoveComponent: (e: any) => void;
}) => {
  const [tab, setTab] = useState("1");

  const handleChangeTab = (_: any, tab: string) => setTab(tab);

  return (
    <TabPanel value={tabNumber} sx={{ width: "100%", typography: "body1" }}>
      <TabContext value={tab}>
        <Box
          sx={{
            borderBottom: 1,
            display: "flex",
            justifyContent: "center",
            borderColor: "divider",
          }}
        >
          <TabList
            variant="scrollable"
            scrollButtons="auto"
            onChange={handleChangeTab}
            aria-label="lab API tabs example"
          >
            <Tab label="добавить компонент" value="1" />
            <Tab label="просмотреть все компоненты" value="2" />
          </TabList>
        </Box>
        <TabPanel className="w-full" value="1">
          <AddItemForm handleAddItem={addComponent} maxLength={30} />
        </TabPanel>
        <TabPanel value="2">
          <ul className="text-center">
            {recipeComponents.map((el) => (
              <ChoosedRecipeComponentItem
                key={el.id}
                onShowEditInput={onShowComponentInput}
                onChangeComponentInputValue={onChangeComponentInputValue}
                onHideEditInput={onHideEditInput}
                onRemoveComponent={onRemoveComponent}
                isVisible={el.isVisible}
                name={el.name}
                id={el.id}
              />
            ))}
          </ul>
        </TabPanel>
      </TabContext>
    </TabPanel>
  );
};
