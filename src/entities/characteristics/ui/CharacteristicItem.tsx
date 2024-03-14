export const CharacteristicsItem = ({
  elementId,
  name,
  onClickHandler,
  type,
}: {
  elementId: number;
  name: string;
  onClickHandler: (e?: any) => void;
  type: "ADMIN_VERSION" | "USER_VERSION";
}) => {
  return (
    <li
      className="mb-2 border-2 w-full mx-auto py-2 flex justify-center"
      key={elementId}
    >
      {type === "USER_VERSION" && (
        <button id={String(elementId)} onClick={onClickHandler}>
          {name}
        </button>
      )}
      {type === "ADMIN_VERSION" && (
        <>
          <p>{name}</p>
          <button
            onClick={onClickHandler}
            id={String(elementId)}
            name={name}
            className="ml-2 border-2 px-2"
          >
            edit
          </button>
        </>
      )}
    </li>
  );
};
