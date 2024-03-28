import { EditCharacteristicModal } from "@/features/characteristics";
import {
  usePostNationalCuisineMutation,
  usePostTypeMutation,
} from "../../../shared/api/adminApi";
import {
  MessageModal,
  useEditNationalCuisineMutation,
  useGetNationalCuisinesQuery,
  AddItemForm,
} from "@/shared";
import { useEffect, useState } from "react";

import {
  CharacteristicsFilterItem,
  CharacteristicsList,
} from "@/entities/characteristics";

export const NationalCuisinesPage = () => {
  const [isMessageModalVisible, setIsMessageModalVisible] = useState(false);

  const [isEditModalVisible, setIsEditModalVisible] = useState(false);

  const [nationalCuisineName, setNationalCuisineName] = useState("");

  const [nationalCuisine, setNationalCuisine] = useState({ name: "", id: "" });

  const [page, setPage] = useState(1);

  const [message, setMessage] = useState("");

  const [
    editType,
    {
      isError: editNationalCuisineIsError,
      isLoading: editNationalCuisineIsLoading,
      isSuccess: editNationalCuisineIsSuccess,
    },
  ] = useEditNationalCuisineMutation();

  const handleChangePage = (_: any, page: number) => setPage(page);

  const handleChangeInputValue = (e: any) => {
    setNationalCuisineName(e.target.value);
    setPage(1);
  };

  const handleOpenEditNationalCuisineModal = (e: any) => {
    setIsEditModalVisible(true);
    setNationalCuisine({
      name: e.target.name,
      id: e.target.id,
    });
  };

  const {
    data: nationalCuisinesData,
    isSuccess: nationalCuisinesIsSuccess,
    isLoading: nationalCuisinesIsLoading,
    isError: nationalCuisinesIsError,
  } = useGetNationalCuisinesQuery({ search: nationalCuisineName, page });

  const [
    postNationalCuisine,
    {
      isSuccess: postNationalCuisineIsSuccess,
      isLoading: postNationalCuisineIsLoading,
      isError: postNationalCuisineIsError,
    },
  ] = usePostNationalCuisineMutation();

  const handlePostCharacteristic = (name: string) => {
    postNationalCuisine({ name: name });
  };

  useEffect(() => {
    if (postNationalCuisineIsLoading || editNationalCuisineIsLoading) {
      setIsMessageModalVisible(true);
      setMessage("Loading...");
      const timer = setTimeout(() => {
        setIsMessageModalVisible(false);
        setMessage("");
      }, 3000);

      return () => clearTimeout(timer);
    }
    if (postNationalCuisineIsSuccess || editNationalCuisineIsSuccess) {
      setIsMessageModalVisible(true);
      setMessage("Успех!");
      const timer = setTimeout(() => {
        setIsMessageModalVisible(false);
        location.reload();
      }, 3000);

      return () => clearTimeout(timer);
    }
    if (postNationalCuisineIsError || editNationalCuisineIsError) {
      setIsMessageModalVisible(true);
      setMessage("Ошибка!");
      const timer = setTimeout(() => {
        setIsMessageModalVisible(false);
        setMessage("");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [
    postNationalCuisineIsLoading,
    postNationalCuisineIsError,
    postNationalCuisineIsSuccess,
    editNationalCuisineIsError,
    editNationalCuisineIsLoading,
    editNationalCuisineIsSuccess,
  ]);

  return (
    <>
      <h3 className="text-2xl mb-5"> Управление типами!</h3>
      <AddItemForm maxLength={40} handleAddItem={handlePostCharacteristic} />

      <CharacteristicsList
        onChangeInputValue={handleChangeInputValue}
        onChangePage={handleChangePage}
        count={nationalCuisinesData?.count}
        isError={nationalCuisinesIsError}
        isLoading={nationalCuisinesIsLoading}
        isSuccess={nationalCuisinesIsSuccess}
      >
        {nationalCuisinesData?.characteristics.map((el: any) => (
          <CharacteristicsFilterItem
            type="ADMIN_VERSION"
            name={el.name}
            key={el.id}
            elementId={el.id}
            onClickHandler={handleOpenEditNationalCuisineModal}
          />
        ))}
      </CharacteristicsList>

      <MessageModal
        message={message}
        onCloseModal={() => setIsMessageModalVisible(false)}
        isLoading={postNationalCuisineIsLoading || editNationalCuisineIsLoading}
        isSuccess={postNationalCuisineIsSuccess || editNationalCuisineIsSuccess}
        isOpen={isMessageModalVisible}
      />

      <EditCharacteristicModal
        onCloseModal={() => setIsEditModalVisible(false)}
        isOpen={isEditModalVisible}
        handleEditCharacteristic={editType}
        characteristic={nationalCuisine}
      />
    </>
  );
};
