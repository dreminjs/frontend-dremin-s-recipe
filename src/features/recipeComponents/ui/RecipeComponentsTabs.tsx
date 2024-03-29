import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import { useState } from "react";

import {
  CharacteristicsList,
  CharacteristicItem,
} from "@/entities/characteristics";
import { TabPanel } from "@mui/lab";
import { RecipeComponentItem } from "@/entities/recipeComponents";

export const RecipeComponentsTabs = ({
  ingredients,
  steps,
}: {
  ingredients: any[];
  steps: any[];
}) => {
  const [tab, setTab] = useState("1");

  const handleChangeTab = (_: any, tab: string) => setTab(tab);

  return (
    <TabContext value={tab}>
      <Box
        sx={{
          borderBottom: 1,
          width: "50%",
          marginRight: "auto",
          marginLeft: "auto",
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
          <Tab label="Ингредиенты" value="1" />
          <Tab label="Шаги" value="2" />
        </TabList>
      </Box>
      <TabPanel value="1">
        <ul className="text-center">
          {ingredients.map((el, idx) => (
            <RecipeComponentItem width="w-1/2" title={el.name} key={idx} />
          ))}
        </ul>
      </TabPanel>
      <TabPanel value="2">
        <ul className="text-center">
          {steps.map((el, idx) => (
            <RecipeComponentItem width="w-1/2" title={el.name} key={idx} />
          ))}
        </ul>
      </TabPanel>
    </TabContext>
  );
};
