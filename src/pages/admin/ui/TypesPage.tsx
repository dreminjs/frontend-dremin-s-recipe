import { EditCharacteristicModal } from "@/features/characteristics";
import { usePostTypeMutation } from "../../../shared/api/adminApi";
import {
  AddItemForm,
  MessageModal,
  useEditTypeMutation,
  useGetTypesQuery,
} from "@/shared";
import { useEffect, useState } from "react";
import { clear } from "console";
import {
  CharacteristicsFilterItem,
  CharacteristicsList,
} from "@/entities/characteristics";

export const TypesPage = () => {
  const [isMessageModalVisible, setIsMessageModalVisible] = useState(false);

  const [isEditModalVisible, setIsEditModalVisible] = useState(false);

  const [typeName, setTypeName] = useState("");

  const [type, setType] = useState({ name: "", id: "" });

  const [page, setPage] = useState(1);

  const [message, setMessage] = useState("");

  const [
    editType,
    {
      isError: editTypeIsError,
      isLoading: editTypeIsLoading,
      isSuccess: editTypeIsSuccess,
    },
  ] = useEditTypeMutation();

  const handleChangePage = (_: any, page: number) => setPage(page);

  const handleChangeInputValue = (e: any) => {
    setTypeName(e.target.value);
    setPage(1);
  };

  const handleOpenEditTypeModal = (e: any) => {
    setIsEditModalVisible(true);
    setType({
      name: e.target.name,
      id: e.target.id,
    });
  };

  const {
    data: typesData,
    isSuccess: typesIsSuccess,
    isLoading: typesIsLoading,
    isError: typesIsError,
  } = useGetTypesQuery({ search: typeName, page });

  const [
    postType,
    {
      isSuccess: postTypeIsSuccess,
      isLoading: postTypeIsLoading,
      isError: postTypeIsError,
    },
  ] = usePostTypeMutation();

  const handlePostCharacteristic = (name: string) => {
    postType({ name: name });
  };

  useEffect(() => {
    if (postTypeIsLoading || editTypeIsLoading) {
      setIsMessageModalVisible(true);
      setMessage("Loading...");
      const timer = setTimeout(() => {
        setIsMessageModalVisible(false);
        setMessage("");
      }, 3000);

      return () => clearTimeout(timer);
    }
    if (postTypeIsSuccess || editTypeIsSuccess) {
      setIsMessageModalVisible(true);
      setMessage("Успех!");
      const timer = setTimeout(() => {
        setIsMessageModalVisible(false);
        location.reload();
      }, 3000);

      return () => clearTimeout(timer);
    }
    if (postTypeIsError || editTypeIsError) {
      setIsMessageModalVisible(true);
      setMessage("Ошибка!");
      const timer = setTimeout(() => {
        setIsMessageModalVisible(false);
        setMessage("");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [
    postTypeIsLoading,
    postTypeIsError,
    postTypeIsSuccess,
    editTypeIsError,
    editTypeIsLoading,
    editTypeIsSuccess,
  ]);

  return (
    <>
      <h3 className="text-2xl mb-5"> Управление типами!</h3>
      <AddItemForm maxLength={25} handleAddItem={handlePostCharacteristic} />

      <CharacteristicsList
        onChangeInputValue={handleChangeInputValue}
        onChangePage={handleChangePage}
        count={typesData?.count}
        isError={typesIsError}
        isLoading={typesIsLoading}
        isSuccess={typesIsSuccess}
      >
        {typesData?.characteristics.map((el: any) => (
          <CharacteristicsFilterItem
            type="ADMIN_VERSION"
            name={el.name}
            key={el.id}
            elementId={el.id}
            onClickHandler={handleOpenEditTypeModal}
          />
        ))}
      </CharacteristicsList>

      <MessageModal
        message={message}
        onCloseModal={() => setIsMessageModalVisible(false)}
        isLoading={postTypeIsLoading || editTypeIsLoading}
        isSuccess={postTypeIsSuccess || editTypeIsSuccess}
        isOpen={isMessageModalVisible}
      />

      <EditCharacteristicModal
        onCloseModal={() => setIsEditModalVisible(false)}
        isOpen={isEditModalVisible}
        handleEditCharacteristic={editType}
        characteristic={type}
      />
    </>
  );
};
