import { setAdmin, setAuth, useRefreshQuery } from "@/features/auth";
import { HeaderNav } from "@/features/header";
import { useAppDispatch } from "@/shared";
import Link from "next/link";
import { useEffect } from "react";
import { useLogoutMutation } from "@/features/auth";

export const Header = () => {
  const { data, isLoading, isSuccess } = useRefreshQuery("");

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (data?.authStatus) {
      dispatch(setAuth(data.authStatus));
    }
    if (data?.adminStatus) {
      dispatch(setAdmin(data.adminStatus));
    }
  }, [isSuccess]);

  const [logout, { isSuccess: logoutIsSuccess }] = useLogoutMutation();

  useEffect(() => {
    if (logoutIsSuccess) {
      dispatch(setAuth(false));
      dispatch(setAdmin(false));
    }
  }, [logoutIsSuccess]);

  return (
    <header className="flex justify-between px-24 py-5 mb-5">
      <Link href={"/"}>recipes</Link>
      <HeaderNav logout={() => logout("")} />
    </header>
  );
};
