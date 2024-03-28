import { ModalLayout, useAppSelector } from "@/shared";
import Link from "next/link";

export const MenuModal = ({
  isOpen,
  onCloseModal,
  logout,
}: {
  isOpen: boolean;
  logout: () => void;
  onCloseModal: () => void;
}) => {
  const { isAuth, isAdmin, isActivated } = useAppSelector(
    (state) => state.authSlice
  );

  return (
    <ModalLayout onCloseModal={onCloseModal} isOpen={isOpen}>
      <nav className="text-center">
        <Link
          onClick={onCloseModal}
          className="block min-[320px]:text-xl sm:text-xl mb-3"
          href={"/"}
        >
          Главная
        </Link>

        {isAdmin && (
          <Link
            onClick={onCloseModal}
            className="block min-[320px]:text-xl sm:text-xl mb-3"
            href={"/admin"}
          >
            Админ панель
          </Link>
        )}

        {isAuth && (
          <>
            <Link
              onClick={onCloseModal}
              className="block min-[320px]:text-xl sm:text-xl mb-3"
              href={"/profile"}
            >
              профиль
            </Link>
            {isActivated && (
              <Link
                onClick={onCloseModal}
                className="min-[320px]:text-xl block mb-3"
                href={"/postRecipe"}
              >
                создать рецепт
              </Link>
            )}
            <button
              className="block min-[320px]:text-xl mx-auto sm:text-xl mb-3"
              onClick={logout}
            >
              выйти
            </button>
          </>
        )}

        {!isAuth && (
          <>
            <Link
              onClick={onCloseModal}
              className="block min-[320px]:text-xl sm:text-xl mb-3"
              href={"/signin"}
            >
              войти
            </Link>
            <Link
              onClick={onCloseModal}
              className="block min-[320px]:text-xl sm:text-xl mb-3"
              href={"/signup"}
            >
              зарегистрироваться
            </Link>
          </>
        )}
      </nav>
    </ModalLayout>
  );
};
