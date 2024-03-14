import { CurrentUserInfo } from "@/features/user";
import {
  useGetCurrentUserInfoQuery,
  useGetOwnRecipesQuery,
} from "../api/profileApi";
import { useState } from "react";

export const CurrentUserProfile = () => {
  const [page, setPage] = useState(1);

  const {
    data: userInfo,
    isLoading: userInfoIsLoading,
    isSuccess: userInfoIsSuccess,
    isError: userInfoIsError,
  } = useGetCurrentUserInfoQuery("");

  const {} = useGetOwnRecipesQuery({ page });

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
    </>
  );
};
