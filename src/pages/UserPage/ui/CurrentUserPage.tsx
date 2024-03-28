import { CurrentUserInfo } from "@/features/user";
import { useGetCurrentUserInfoQuery } from "../api/profileApi";

import { UsersOwnRecipeTabs } from "@/widgets/Recipe";
import { useEffect } from "react";

export const CurrentUserProfile = () => {
  const {
    data: userInfo,
    isLoading: userInfoIsLoading,
    isSuccess: userInfoIsSuccess,
    isError: userInfoIsError,
    refetch: userInfoRefetch,
  } = useGetCurrentUserInfoQuery("");

  useEffect(() => {
    userInfoRefetch();
  }, []);

  return (
    <>
      <CurrentUserInfo
        username={userInfo?.username}
        email={userInfo?.email}
        isActivated={userInfo?.isActivated}
        isError={userInfoIsError}
        isLoading={userInfoIsLoading}
        isSuccess={userInfoIsSuccess}
      />
      <UsersOwnRecipeTabs />
    </>
  );
};
