import { useEffect } from "react";
import { redirect } from "next/navigation";
import { useCheckAdminQuery } from "../api/rolesApi";

export function isAdmin(Component: any) {
  return function isAdmin(props: any) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { data, isLoading, isSuccess } = useCheckAdminQuery("");

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      if (isSuccess && !data.isAdmin) {
        redirect("/");
      }
    }, [isSuccess]);

    return <Component {...props} />;
  };
}
