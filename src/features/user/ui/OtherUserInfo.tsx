import { UserInfoText } from "@/shared";

export const OtherUserInfo = ({
  username,
  email,

  isError,
  isLoading,
  isSuccess,
}: {
  username: string;
  email: string;

  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
}) => {
  return (
    <div>
      {isSuccess && (
        <ul>
          <UserInfoText title="email " text={email} />
          <UserInfoText title="username " text={username} />
        </ul>
      )}
      {isError && <p>Ошибка!</p>}
      {isLoading && <p>Loading...</p>}
    </div>
  );
};
