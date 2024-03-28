import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
export const AddItemForm = ({
  handleAddItem,
  maxLength,
}: {
  handleAddItem: (data: any) => void;
  maxLength: number;
}) => {
  const schema = yup.object({
    name: yup
      .string()
      .required("пожалуйста,введите имя характеристики")
      .min(3, "минимум 3 символа")
      .max(maxLength, `максимум ${maxLength} символов`),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: any) => {
    handleAddItem(data.name);
    reset();
  };

  return (
    <form
      className="border-2  min-[1200px]:w-1/2 mx-auto text-center py-5 mb-12"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div>
        <input
          className="border-b-2 outline-none mb-2 max-[700px]:w-full"
          placeholder="имя"
          type="text"
          {...register("name")}
        />
        {errors.name && <p className="mb-2">{errors.name.message}</p>}
      </div>
      <button className="border-2 max-[700px]:w-full px-5 py-2 text-center">
        Отправить!
      </button>
    </form>
  );
};
