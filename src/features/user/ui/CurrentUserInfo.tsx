import { UserInfoText } from "@/shared";

export const CurrentUserInfo = ({
  username,
  email,
  isActivated,
  isError,
  isLoading,
  isSuccess,
}: {
  username: string;
  email: string;
  isActivated: boolean;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
}) => {
  console.log("Account status ", isActivated);

  return (
    <div>
      {isSuccess && (
        <ul>
          <UserInfoText title="ваш email " text={email} />
          <UserInfoText title="ваш username " text={username} />
          <UserInfoText
            title="Статус актавации вашего аккаунта"
            text={(isActivated && " Активирован") || " Не активирован"}
          />
        </ul>
      )}
      {isError && <p>Ошибка!</p>}
      {isLoading && <p>Loading...</p>}
    </div>
  );
};
