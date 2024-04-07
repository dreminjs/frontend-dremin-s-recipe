import {
  InputFileUpload,
  MessageModal,
  addHolidayToRecipe,
  addNationalCuisineToRecipe,
  addTypeToRecipe,
  clearCharacteristics,
  useAppDispatch,
  useAppSelector,
  useEditRecipeMutation,
  useGetRecipeQuery,
} from "@/shared/";
import {
  clearRecipeComponents,
  setIngredients,
  setSteps,
} from "@/widgets/Recipe";
import { RecipeCharacteristicsModal } from "@/widgets/Characteristics";
import { RecipeComponentsModal } from "@/widgets/RecipeComponents";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import Image from "next/image";

export const EditRecipePage = ({
  id,
}: {
  id: string | string[] | undefined;
}) => {
  const {
    data: recipeData,
    isLoading: recipeIsLoading,
    isError: recipeIsError,
    isSuccess: recipeIsSuccess,
    refetch: refetchRecipeData,
  } = useGetRecipeQuery(id, {
    skip: !Boolean(id),
  });

  const [
    editRecipe,
    {
      isLoading: editingRecipeIsLoading,
      isSuccess: editingRecipeIsSuccess,
      isError: editingRecipeIsError,
    },
  ] = useEditRecipeMutation();

  const [ingredientError, setIngredientError] = useState(false);

  const [holidayError, setHolidayError] = useState(false);

  const [nationalCuisineError, setNationalCuisineError] = useState(false);

  const [typeError, setTypeError] = useState(false);

  const [stepError, setStepError] = useState(false);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const [message, setMessage] = useState("");

  const [photo, setPhoto] = useState(null);

  const [isCharacteristicModalVisible, setIsCharacteristicModalVisible] =
    useState(false);

  const [isRecipeComponentsModalVisible, setIsRecipeComponentsModalVisible] =
    useState(false);

  const schema = yup.object({
    title: yup.string().required("пожалуйста введите название рецепта!"),
    description: yup.string().required("пожалуйста введите описание рецепта!"),
    photo: yup
      .mixed()
      .notRequired()
      .test("fileSize", "File is too large", (value: any) => {
        return value || (value[0] && value[0].size <= 5242880); // Maximum file size 5MB
      }),
    // .test("fileType", "Invalid file format", (value: any) => {
    //   return (
    //     !value ||
    //     (value && ["image/jpeg", "image/png"].includes(value[0]?.type))
    //   ); // Allowed file types: JPEG and PNG
    // }),
  });

  const { steps, ingredients } = useAppSelector(
    (state) => state.recipeComponentsSlice
  );

  const { holidays, nationalCuisines, types } = useAppSelector(
    (state) => state.characteristicSlice
  );

  const dispatch = useAppDispatch();

  const handleImageChange = (event: any) => {
    const file = event.target.files[0];

    if (file) {
      const reader: any = new FileReader();
      reader.onload = () => {
        setPhoto(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  function handleAddHoliday(e: any): void {
    dispatch(addHolidayToRecipe({ name: e.target.innerHTML, id: e.target.id }));
  }

  function handleAddNationalCuisine(e: any): void {
    dispatch(
      addNationalCuisineToRecipe({ name: e.target.innerHTML, id: e.target.id })
    );
  }

  function handleAddType(e: any): void {
    dispatch(addTypeToRecipe({ name: e.target.innerHTML, id: e.target.id }));
  }

  function handleCloseCharacteristicModal(): void {
    setIsCharacteristicModalVisible(false);
  }

  function handleOpenRecipeComponentsModal() {
    setIsRecipeComponentsModalVisible(true);
    setStepError(false);
    setIngredientError(false);
  }
  function handleOpenCharacteristicsModal() {
    setIsCharacteristicModalVisible(true);
    setTypeError(false);
    setHolidayError(false);
    setNationalCuisineError(false);
  }

  function handleCloseMessageModal() {
    setIsModalVisible(false);
  }

  const onSubmit = (data: any) => {
    if (!types[0]?.name) {
      setTypeError(true);
    }
    if (!holidays[0]?.name) {
      setHolidayError(true);
    }
    if (!nationalCuisines[0]?.name) {
      setNationalCuisineError(true);
    }
    if (steps.length === 0) {
      setStepError(true);
    }
    if (ingredients.length === 0) {
      setIngredientError(true);
    }

    if (
      !typeError &&
      !nationalCuisineError &&
      !ingredientError &&
      !stepError &&
      !holidayError
    ) {
      const formData = new FormData();

      formData.append("title", data.title);

      formData.append("description", data.description);

      if (photo) {
        formData.append("file", data.photo[0]);
      }

      formData.append("steps", JSON.stringify(steps));

      formData.append("ingredients", JSON.stringify(ingredients));

      formData.append("typeId", types[0].id);

      formData.append("holidayId", holidays[0].id);

      formData.append("nationalCuisineId", nationalCuisines[0].id);

      editRecipe({ data: formData, id });
    }
  };

  useEffect(() => {
    if (editingRecipeIsSuccess) {
      const timeoutId = setTimeout(() => {
        location.reload();
      }, 3000);
      return () => clearTimeout(timeoutId);
    }
  }, [editingRecipeIsSuccess]);

  useEffect(() => {
    if (recipeIsSuccess) {
      dispatch(setIngredients(recipeData.ingredients));
      dispatch(setSteps(recipeData.steps));
      dispatch(
        addTypeToRecipe({ name: recipeData.type.name, id: recipeData.type.id })
      );
      dispatch(
        addHolidayToRecipe({
          name: recipeData.holiday.name,
          id: recipeData.holiday.id,
        })
      );
      dispatch(
        addNationalCuisineToRecipe({
          name: recipeData.nationalCuisine.name,
          id: recipeData.nationalCuisine.id,
        })
      );
    }
  }, [recipeIsSuccess]);

  useEffect(() => {
    if (
      ingredientError ||
      nationalCuisineError ||
      stepError ||
      holidayError ||
      typeError
    ) {
      setIsModalVisible(true);
      setMessage("");
      setMessage("Пожалуйста добавте:");
    }

    if (ingredientError) {
      setMessage((prevState) => `${prevState} ,ингредиенты`);
    }
    if (stepError) {
      setMessage((prevState) => `${prevState} ,шаги`);
    }
    if (nationalCuisineError) {
      setMessage((prevState) => `${prevState} ,национальные кухни`);
    }
    if (typeError) {
      setMessage((prevState) => `${prevState} ,типы`);
    }
    if (holidayError) {
      setMessage((prevState) => `${prevState} ,праздники`);
    }

    const timer = setTimeout(() => {
      setMessage("");
      setHolidayError(false);
      setTypeError(false);
      setNationalCuisineError(false);
      setIngredientError(false);
      setStepError(false);
      setIsModalVisible(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [
    ingredientError,
    nationalCuisineError,
    stepError,
    holidayError,
    typeError,
  ]);

  useEffect(() => {
    if (editingRecipeIsSuccess) {
      setIsModalVisible(true);
      setMessage("Успех");
      const timer = setTimeout(() => {
        setMessage("");
        setIsModalVisible(false);
        dispatch(clearRecipeComponents());
        setPhoto(null);
        dispatch(clearCharacteristics());
        reset();
      }, 3000);

      return () => clearTimeout(timer);
    }
    if (editingRecipeIsError) {
      setIsModalVisible(true);
      setMessage("Ошибка");
      const timer = setTimeout(() => {
        setMessage("");
        setIsModalVisible(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
    if (editingRecipeIsLoading) {
      setIsModalVisible(true);
      setMessage("Загрузка");
      const timer = setTimeout(() => {
        setMessage("");
        setIsModalVisible(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [editingRecipeIsError, editingRecipeIsLoading, editingRecipeIsSuccess]);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
    // eslint-disable-next-line react-hooks/rules-of-hooks
  } = useForm({
    resolver: yupResolver(schema),
    values: {
      title: recipeData?.title || "загрузка...",
      description: recipeData?.description || "загрузка...",
    },
  });

  return (
    <>
      <div>
        <h3 className="text-2xl mb-5">Редактирование рецепта!</h3>
        <form onSubmit={handleSubmit(onSubmit)} className="mx-auto w-1/2">
          <div className="mb-5">
            <input
              type="text"
              placeholder="название"
              className="border-b-2 outline-none"
              {...register("title")}
            />
            {errors.title && <p>{errors.title.message?.toString()}</p>}
          </div>
          <div className="mb-5">
            <textarea
              cols={30}
              rows={3}
              placeholder="Описание"
              className="outline-none border-b-2"
              {...register("description")}
            />
            {errors.description && (
              <p>{errors.description.message?.toString()}</p>
            )}
          </div>
          <div className="mb-5">
            <label className="block mb-5">Добавте фото рецепту!</label>
            {!photo && (
              <Image
                width={550}
                className="h-[350px] w-[550px] mb-5"
                height={250}
                alt="photo"
                src={`http://localhost:3000/${recipeData?.img}`}
              />
            )}
            {photo && (
              <Image
                width={550}
                className="h-[350px] w-[550px] mb-5"
                height={250}
                alt="photo"
                src={photo}
              />
            )}
            <InputFileUpload
              onChangePhoto={handleImageChange}
              register={register}
            />
          </div>
          <button
            onClick={handleOpenRecipeComponentsModal}
            type="button"
            className="border-2 text-center px-5 py-2 mb-5"
          >
            Добавить компонеты к рецепту
          </button>
          <button
            onClick={handleOpenCharacteristicsModal}
            type="button"
            className="border-2 block px-5 py-2 mb-5"
          >
            Добавить характеристики к рецепту
          </button>
          <button className="block border-2 text-center px-5 py-2 mb-5">
            Отправить
          </button>
        </form>
      </div>
      <RecipeCharacteristicsModal
        onAddHoliday={handleAddHoliday}
        onAddNationalCuisine={handleAddNationalCuisine}
        onAddType={handleAddType}
        isOpen={isCharacteristicModalVisible}
        onCloseModal={handleCloseCharacteristicModal}
      />
      <RecipeComponentsModal
        isOpen={isRecipeComponentsModalVisible}
        onCloseModal={() => setIsRecipeComponentsModalVisible(false)}
      />
      <MessageModal
        message={message}
        isLoading={editingRecipeIsLoading}
        isSuccess={editingRecipeIsSuccess}
        isOpen={isModalVisible}
        onCloseModal={handleCloseMessageModal}
      />
    </>
  );
};
