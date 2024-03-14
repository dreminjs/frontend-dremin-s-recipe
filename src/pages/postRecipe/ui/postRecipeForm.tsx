import {
  InputFileUpload,
  MessageModal,
  clearCharacteristics,
  useAppDispatch,
  useAppSelector,
} from "@/shared";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Input, InputProps } from "@mui/base/Input";
import * as yup from "yup";
import Image from "next/image";
import {
  RecipeCharacteristicsModal,
  RecipeComponentsModal,
  clearRecipeComponents,
} from "@/widgets/Recipe";
import {
  addTypeToRecipe,
  addHolidayToRecipe,
  addNationalCuisineToRecipe,
} from "@/shared";
import { usePostRecipeMutation } from "../api/postRecipeApi";

export const PostRecipeForm = () => {
  const [photo, setPhoto] = useState(null);

  const [isCharacteristicModalVisible, setIsCharacteristicModalVisible] =
    useState(false);

  const [isRecipeComponentsModalVisible, setIsRecipeComponentsModalVisible] =
    useState(false);

  const [ingredientError, setIngredientError] = useState(false);

  const [holidayError, setHolidayError] = useState(false);

  const [nationalCuisineError, setNationalCuisineError] = useState(false);

  const [typeError, setTypeError] = useState(false);

  const [stepError, setStepError] = useState(false);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const [message, setMessage] = useState("");

  const { steps, ingredients } = useAppSelector(
    (state) => state.recipeComponentsSlice
  );

  const { holidays, nationalCuisines, types } = useAppSelector(
    (state) => state.characteristicSlice
  );

  const schema = yup.object({
    title: yup.string().required("пожалуйста введите название рецепта!"),
    description: yup.string().required("пожалуйста введите описание рецепта!"),
    photo: yup
      .mixed()
      .required("Фотография обязательна")
      .test("file", "Пожалуйта добавте файл", (value: any) => {
        return value[0];
      })
      .test("fileSize", "Файл слишком большой", (value: any) => {
        return value[0] && value[0].size <= 5242880; // Максимальный размер файла 5MB
      })
      .test("fileType", "Неверный формат файла", (value: any) => {
        return value && ["image/jpeg", "image/png"].includes(value[0]?.type); // Разрешенные типы файлов: JPEG и PNG
      }),
  });

  const [postRecipe, { isLoading, isError, isSuccess }] =
    usePostRecipeMutation();

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
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
    // eslint-disable-next-line react-hooks/rules-of-hooks
  } = useForm({
    resolver: yupResolver(schema),
  });
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
    if (isSuccess) {
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
    if (isError) {
      setIsModalVisible(true);
      setMessage("Ошибка");
      const timer = setTimeout(() => {
        setMessage("");
        setIsModalVisible(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
    if (isLoading) {
      setIsModalVisible(true);
      setMessage("Загрузка");
      const timer = setTimeout(() => {
        setMessage("");
        setIsModalVisible(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isError, isLoading, isSuccess]);

  const dispatch = useAppDispatch();

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

      formData.append("file", data.photo[0]);

      formData.append("steps", JSON.stringify(steps));

      formData.append("ingredients", JSON.stringify(ingredients));

      formData.append("typeId", types[0].id);

      formData.append("holidayId", holidays[0].id);

      formData.append("nationalCuisineId", nationalCuisines[0].id);

      postRecipe(formData);
    }
  };

  return (
    <>
      <h3 className="text-2xl mb-5">Создайте рецепт!</h3>
      <form className="mx-auto w-1/2" onSubmit={handleSubmit(onSubmit)}>
        <div className=" mb-5">
          <input
            type="text"
            placeholder="название"
            className="border-b-2 outline-none"
            {...register("title")}
          />
          {errors.title && <p>{errors.title.message}</p>}
        </div>
        <div className="mb-5">
          <textarea
            cols={30}
            rows={3}
            placeholder="Описание"
            className="outline-none border-b-2"
            {...register("description")}
          />
          {errors.description && <p>{errors.description.message}</p>}
        </div>
        <div className="mb-5">
          <label className="block mb-5">Добавте фото рецепту!</label>
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
          {errors.photo && <p className="mt-2">{errors.photo.message}</p>}
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
        isLoading={isLoading}
        isSuccess={isSuccess}
        isOpen={isModalVisible}
        onCloseModal={handleCloseMessageModal}
      />
    </>
  );
};
