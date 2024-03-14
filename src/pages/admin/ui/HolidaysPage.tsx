import { EditCharacteristicModal } from "@/features/characteristics";
import { usePostHolidayMutation } from "../api/adminApi";
import {
  MessageModal,
  useEditHolidayMutation,
  useGetHolidaysQuery,
  AddItemForm,
} from "@/shared";
import { useEffect, useState } from "react";

import {
  CharacteristicsItem,
  CharacteristicsList,
} from "@/entities/characteristics";

export const HolidaysPage = () => {
  const [isMessageModalVisible, setIsMessageModalVisible] = useState(false);

  const [isEditModalVisible, setIsEditModalVisible] = useState(false);

  const [holidayName, setHolidayName] = useState("");

  const [holiday, setHoliday] = useState({ name: "", id: "" });

  const [page, setPage] = useState(1);

  const [message, setMessage] = useState("");

  const [
    editHoliday,
    {
      isError: editHolidayIsError,
      isLoading: editHolidayIsLoading,
      isSuccess: editHolidayIsSuccess,
    },
  ] = useEditHolidayMutation();

  const handleChangePage = (_: any, page: number) => setPage(page);

  const handleChangeInputValue = (e: any) => {
    setHolidayName(e.target.value);
    setPage(1);
  };

  const handleOpenEditHolidayModal = (e: any) => {
    setIsEditModalVisible(true);
    setHoliday({
      name: e.target.name,
      id: e.target.id,
    });
  };

  const {
    data: holidaysData,
    isSuccess: holidaysIsSuccess,
    isLoading: holidaysIsLoading,
    isError: holidaysIsError,
  } = useGetHolidaysQuery({ search: holidayName, page });

  const [
    postHoliday,
    {
      isSuccess: postHolidayIsSuccess,
      isLoading: postHolidayIsLoading,
      isError: postHolidayIsError,
    },
  ] = usePostHolidayMutation();

  const handlePostCharacteristic = (name: string) => {
    postHoliday({ name: name });
  };

  useEffect(() => {
    if (postHolidayIsLoading || editHolidayIsLoading) {
      setIsMessageModalVisible(true);
      setMessage("Loading...");
      const timer = setTimeout(() => {
        setIsMessageModalVisible(false);
        setMessage("");
      }, 3000);

      return () => clearTimeout(timer);
    }
    if (postHolidayIsSuccess || editHolidayIsSuccess) {
      setIsMessageModalVisible(true);
      setMessage("Успех!");
      const timer = setTimeout(() => {
        setIsMessageModalVisible(false);
        location.reload();
      }, 3000);

      return () => clearTimeout(timer);
    }
    if (postHolidayIsError || editHolidayIsError) {
      setIsMessageModalVisible(true);
      setMessage("Ошибка!");
      const timer = setTimeout(() => {
        setIsMessageModalVisible(false);
        setMessage("");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [
    postHolidayIsLoading,
    postHolidayIsError,
    postHolidayIsSuccess,
    editHolidayIsError,
    editHolidayIsLoading,
    editHolidayIsSuccess,
  ]);

  return (
    <>
      <h3 className="text-2xl mb-5"> Управление типами!</h3>
      <AddItemForm maxLength={30} handleAddItem={handlePostCharacteristic} />

      <CharacteristicsList
        onChangeInputValue={handleChangeInputValue}
        onChangePage={handleChangePage}
        count={holidaysData?.count}
        isError={holidaysIsError}
        isLoading={holidaysIsLoading}
        isSuccess={holidaysIsSuccess}
      >
        {holidaysData?.characteristics.map((el: any) => (
          <CharacteristicsItem
            type="ADMIN_VERSION"
            name={el.name}
            key={el.id}
            elementId={el.id}
            onClickHandler={handleOpenEditHolidayModal}
          />
        ))}
      </CharacteristicsList>

      <MessageModal
        message={message}
        onCloseModal={() => setIsMessageModalVisible(false)}
        isLoading={postHolidayIsLoading || editHolidayIsLoading}
        isSuccess={postHolidayIsSuccess || editHolidayIsSuccess}
        isOpen={isMessageModalVisible}
      />

      <EditCharacteristicModal
        onCloseModal={() => setIsEditModalVisible(false)}
        isOpen={isEditModalVisible}
        handleEditCharacteristic={editHoliday}
        characteristic={holiday}
      />
    </>
  );
};
