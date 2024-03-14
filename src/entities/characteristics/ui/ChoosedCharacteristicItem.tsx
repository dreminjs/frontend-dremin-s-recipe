export const ChoosedCharacteristicsItem = ({
  elementId,
  name,
  onRemoveCharacteristic,
}: {
  elementId: number;
  name: string;
  onRemoveCharacteristic: (e: any) => void;
}) => {
  return (
    <li
      className="mb-2 border-2 w-full mx-auto py-2 flex justify-center items-center gap-5 "
      key={elementId}
    >
      <p>{name}</p>
      <button
        className="text-rose-500 border-2 px-2 border-rose-500 rounded"
        id={String(elementId)}
        onClick={onRemoveCharacteristic}
      >
        X
      </button>
    </li>
  );
};
