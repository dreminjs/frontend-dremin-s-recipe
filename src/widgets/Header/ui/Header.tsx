import {
  setActivate,
  setAdmin,
  setAuth,
  useRefreshQuery,
} from "@/features/auth";
import { HeaderNav, MenuModal } from "@/features/header";
import { useAppDispatch } from "@/shared";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useLogoutMutation } from "@/features/auth";
import MenuBurger from "../../../../public/meny_burger.svg";
import Image from "next/image";
import { useRouter } from "next/router";
export const Header = () => {
  const { data, isLoading, isSuccess } = useRefreshQuery("");

  const router = useRouter();

  const dispatch = useAppDispatch();

  const [isWarningVisbile, setIsWarningVisible] = useState(false);

  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const [logout, { isSuccess: logoutIsSuccess }] = useLogoutMutation();

  useEffect(() => {
    if (isSuccess) {
      setIsWarningVisible(!data.isActivated);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (logoutIsSuccess) {
      dispatch(setAuth(false));
      dispatch(setAdmin(false));
      router.push("/");
    }
  }, [logoutIsSuccess]);

  const handleCloseWarningTable = () => setIsWarningVisible(false);

  const handleCloseMenu = () => setIsMenuVisible(false);

  return (
    <>
      <header className="flex justify-between min-[320px]:px-5 sm:px-24 py-5 mb-5">
        <Link href={"/"}>recipes</Link>
        <HeaderNav logout={() => logout("")} />
        <button onClick={() => setIsMenuVisible(true)} className="md:hidden">
          <Image width={35} height={30} alt="menu" src={MenuBurger} />
        </button>
      </header>
      {isWarningVisbile && (
        <div className="min-[600px]:w-1/2 max-[600px]:w-11/12 mx-auto border-2 border-amber-400 py-5 mb-5 items-center justify-center gap-5 flex px-5">
          <p>
            Пожалуйста,подтвердите свой email,чтобы весь функционал сайта мог
            быть доступен
          </p>
          <button onClick={handleCloseWarningTable} className="border-2 px-5">
            X
          </button>
        </div>
      )}
      <MenuModal
        onCloseModal={handleCloseMenu}
        isOpen={isMenuVisible}
        logout={() => logout("")}
      />
    </>
  );
};
