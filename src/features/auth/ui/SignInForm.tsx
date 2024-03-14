import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useSigninMutation, useSignupMutation } from "../api/authApi";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { setAdmin, setAuth } from "..";
import { MessageModal, useAppDispatch } from "@/shared";

const schema = yup.object({
  email: yup
    .string()
    .required("пожалуйста введите email")
    .email("пожалуйста введите email"),
  password: yup
    .string()
    .max(72, "максимальное кол-во символов - 72")
    .min(2, "минимальное кол-во символов - 2"),
});

export const SignInForm = () => {
  const router = useRouter();

  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [signin, { isLoading, isSuccess, isError }] = useSigninMutation();

  const [isModalVisible, setIsModalVisible] = useState(false);

  const [message, setMessage] = useState("");

  useEffect(() => {
    if (isSuccess) {
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
        dispatch(setAuth(false));
      }, 3000);
      return () => clearTimeout(timer);
    }

    if (isLoading) {
      setMessage("Загрузка...");
      setIsModalVisible(true);
    }
  }, [isSuccess, isLoading]);

  const onSubmit = (data: any) => signin(data);
  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mx-auto w-1/3 flex flex-col items-center"
      >
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
