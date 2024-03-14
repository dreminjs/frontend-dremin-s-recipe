import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";

import { useState } from "react";
import {
  CharacteristicsItem,
  CharacteristicsList,
} from "@/entities/characteristics";
import {
  useAppDispatch,
  useGetHolidaysQuery,
  useGetNationalCuisinesQuery,
  useGetTypesQuery,
  addHolidayForFilter,
  addNationalCuisineForFilter,
  addTypeForFilter,
} from "@/shared";
import { TabPanel } from "@mui/lab";

export const CharacteristicsNestedTabs = ({
  onAddHoliday,
  onAddNationalCuisine,
  onAddType,
}: {
  onAddType: (e: any) => void;
  onAddHoliday: (e: any) => void;
  onAddNationalCuisine: (e: any) => void;
}) => {
  const [tab, setTab] = useState("1");

  const [typeInputValue, setTypeInputValue] = useState("");
  const [holidayInputValue, setHolidayInputValue] = useState("");
  const [nationalCuisineInputValue, setNationalCuisineInputValue] =
    useState("");

  const [typePage, setTypePage] = useState(1);

  const [nationalCuisinePage, setnNationalCuisinePage] = useState(1);

  const [holidayPage, setHolidayPage] = useState(1);

  const handleChangeTab = (_: any, tab: any) => setTab(tab);

  const handleChangeTypePage = (_: any, tab: any) => {
    setTypePage(tab);
  };

  const handleChangeHolidayPage = (_: any, tab: any) => setHolidayPage(tab);

  const handleChangeNationalCuisinePage = (_: any, tab: any) =>
    setnNationalCuisinePage(tab);

  const handleChangeInputValue = (setInputValue: Function) => (e: any) => {
    setInputValue(e.target.value);
  };

  const dispatch = useAppDispatch();

  const {
    data: types,
    isSuccess: typesIsSuccess,
    isLoading: typesisLoading,
    isError: typesIsError,
  } = useGetTypesQuery({ page: typePage, search: typeInputValue });

  const {
    data: holidays,
    isSuccess: holidaysIsSuccess,
    isLoading: holidaysIsLoading,
    isError: holidaysIsError,
  } = useGetHolidaysQuery({ page: holidayPage, search: holidayInputValue });

  const {
    data: nationalCuisines,
    isSuccess: nationalCuisinesIsSuccess,
    isLoading: nationalCuisinesIsLoading,
    isError: nationalCuisinesIsError,
  } = useGetNationalCuisinesQuery({
    page: nationalCuisinePage,
    search: nationalCuisineInputValue,
  });

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
            <Tab label="Типы" value="1" />
            <Tab label="Национальные кухни" value="2" />
            <Tab label="Праздники" value="3" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <CharacteristicsList
            isError={typesIsError}
            isLoading={typesisLoading}
            isSuccess={typesIsSuccess}
            count={types?.count}
            onChangeInputValue={handleChangeInputValue(setTypeInputValue)}
            onChangePage={handleChangeTypePage}
          >
            {types?.characteristics.length === 0 && <li>пусто!</li>}
            {types?.characteristics.map((el: any) => (
              <CharacteristicsItem
                type="USER_VERSION"
                key={el.id}
                name={el.name}
                elementId={el.id}
                onClickHandler={onAddType}
              />
            ))}
          </CharacteristicsList>
        </TabPanel>
        <TabPanel value="2">
          <CharacteristicsList
            isError={nationalCuisinesIsError}
            isLoading={nationalCuisinesIsLoading}
            isSuccess={nationalCuisinesIsSuccess}
            onChangeInputValue={handleChangeInputValue(
              setNationalCuisineInputValue
            )}
            count={nationalCuisines?.count}
            onChangePage={handleChangeNationalCuisinePage}
          >
            {nationalCuisines?.characteristics.length === 0 && <li>пусто!</li>}
            {nationalCuisines?.characteristics.map((el: any) => (
              <CharacteristicsItem
                type="USER_VERSION"
                key={el.id}
                name={el.name}
                elementId={el.id}
                onClickHandler={onAddNationalCuisine}
              />
            ))}
          </CharacteristicsList>
        </TabPanel>
        <TabPanel value="3">
          <CharacteristicsList
            isError={holidaysIsError}
            isLoading={holidaysIsLoading}
            isSuccess={holidaysIsSuccess}
            onChangeInputValue={handleChangeInputValue(setHolidayInputValue)}
            count={holidays?.count}
            onChangePage={handleChangeHolidayPage}
          >
            {holidays?.characteristics.length === 0 && <li>пусто!</li>}
            {holidays?.characteristics.map((el: any) => (
              <CharacteristicsItem
                type="USER_VERSION"
                key={el.id}
                name={el.name}
                elementId={el.id}
                onClickHandler={onAddHoliday}
              />
            ))}
          </CharacteristicsList>
        </TabPanel>
      </TabContext>
    </Box>
  );
};
