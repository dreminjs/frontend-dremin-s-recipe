import { OtherUserInfo } from "@/features/user";
import {
  useCheckOwnerProfileQuery,
  useGetUserInfoQuery,
} from "../api/profileApi";

import { OtherUserRecipesTabs, UsersOwnRecipeTabs } from "@/widgets/Recipe";
import { useEffect } from "react";
import { useRouter } from "next/router";
export const OtherUserProfile = ({
  id,
}: {
  id: string | string[] | undefined;
}) => {
  const {
    data: userInfo,
    isLoading: userInfoIsLoading,
    isSuccess: userInfoIsSuccess,
    isError: userInfoIsError,
    refetch: userInfoRefetch,
  } = useGetUserInfoQuery(id, { skip: !Boolean(id) });

  const router = useRouter();

  const { data, isLoading, isSuccess } = useCheckOwnerProfileQuery(id, {
    skip: !Boolean(id),
  });

  useEffect(() => {
    if (userInfoIsSuccess) {
      userInfoRefetch();
    }
  }, []);

  useEffect(() => {
    if (isSuccess) {
      if (data.isItMineProfile) {
        router.push("/profile");
      }
    }
  }, [isSuccess]);

  return (
    <>
      <OtherUserInfo
        username={userInfo?.username}
        email={userInfo?.email}
        isError={userInfoIsError}
        isLoading={userInfoIsLoading}
        isSuccess={userInfoIsSuccess}
      />
      <OtherUserRecipesTabs id={id} />
    </>
  );
};
