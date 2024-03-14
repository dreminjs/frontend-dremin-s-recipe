import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useSignupMutation } from "../api/authApi";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { setAdmin, setAuth } from "..";
import { MessageModal, useAppDispatch } from "@/shared";

const schema = yup.object({
  username: yup
    .string()
    .max(50, "максимальное кол-во символов - 50")
    .min(2, "минимальное кол-во символов - 2"),
  email: yup
    .string()
    .required("пожалуйста введите email")
    .email("пожалуйста введите email"),
  password: yup
    .string()
    .max(72, "максимальное кол-во символов - 72")
    .min(2, "минимальное кол-во символов - 2"),
});

export const SignUpForm = () => {
  const router = useRouter();

  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [signup, { isLoading, isSuccess, isError }] = useSignupMutation();

  const [isModalVisible, setIsModalVisible] = useState(false);

  const [message, setMessage] = useState("");

  useEffect(() => {
    if (isSuccess) {
      setMessage("Успех");
      setIsModalVisible(true);
      const timer = setTimeout(() => {
        setIsModalVisible(false);
        dispatch(setAuth(true));
        router.push("/");
      }, 3000);

      return () => clearTimeout(timer);
    }
    if (isError) {
      const timer = setTimeout(() => {
        setIsModalVisible(false);
        setMessage("Ошибка!");
        dispatch(setAuth(false));
      }, 3000);
      return () => clearTimeout(timer);
    }

    if (isLoading) {
      setMessage("Загрузка...");
      setIsModalVisible(true);
    }
  }, [isSuccess, isLoading, isError]);

  const onSubmit = (data: any) => signup(data);
  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mx-auto w-1/3 flex flex-col items-center"
      >
        <div className="mb-2">
          <input
            {...register("username")}
            className="border-b-2 px-2 py-2 outline-none"
            type="text"
            placeholder="username"
          />
          {errors.username && <p>{errors.username.message}</p>}
        </div>
        <div className="mb-2">
          <input
            type="text"
            className="border-b-2 px-2 py-2 outline-none"
            {...register("email")}
            placeholder="email"
          />
          {errors.email && <p>{errors.email.message}</p>}
        </div>
        <div className="mb-5">
          <input
            type="password"
            className="border-b-2 px-2 py-2 outline-none"
            {...register("password")}
            placeholder="password"
          />
          {errors.password && <p>{errors.password.message}</p>}
        </div>
        <button type="submit" className="border-2 px-5 py-2">
          Отправить
        </button>
      </form>
      <MessageModal
        onCloseModal={() => setIsModalVisible(false)}
        isOpen={isModalVisible}
        message={message}
        isSuccess={isSuccess}
        isLoading={isLoading}
      />
    </>
  );
};
