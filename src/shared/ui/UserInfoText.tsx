export const UserInfoText = ({
  title,
  text,
}: {
  title: string;
  text: string;
}) => {
  return (
    <li>
      <p>
        {title} : {text}
      </p>
    </li>
  );
};
