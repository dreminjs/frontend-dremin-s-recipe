import { ModalLayout } from "@/shared";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
export const EditCharacteristicModal = ({
  isOpen,
  onCloseModal,
  characteristic,
  handleEditCharacteristic,
}: {
  isOpen: boolean;
  onCloseModal: () => void;
  handleEditCharacteristic: (body: any) => void;
  characteristic: {
    name: string;
    id: string;
  };
}) => {
  const schema = yup.object({
    name: yup
      .string()
      .required("пожалуйста,введите имя характеристики")
      .min(3, "минимум 3 символа")
      .max(25, "максимум 25 символов"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    values: {
      name: characteristic.name,
    },
  });

  const onSubmit = (data: any) =>
    handleEditCharacteristic({ name: data.name, id: characteristic.id });

  return (
    <ModalLayout width="w-1/3" isOpen={isOpen} onCloseModal={onCloseModal}>
      <form className="mx-auto w-1/2" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input
            placeholder="имя характеристики"
            className="border-b-2 w-10/12 mb-2 outline-none"
            type="text"
            {...register("name")}
          />
          {errors.name && <p className="mb-2">{errors.name.message}</p>}
        </div>

        <button className="border-2 px-5 mr-5" type="submit">
          Отправить
        </button>
        <button className="border-2 px-5" onClick={onCloseModal} type="button">
          Закрыть
        </button>
      </form>
    </ModalLayout>
  );
};
