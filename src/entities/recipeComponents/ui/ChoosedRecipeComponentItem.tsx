export const ChoosedRecipeComponentItem = ({
  onShowEditInput,
  onChangeComponentInputValue,
  onHideEditInput,
  onRemoveComponent,
  name,
  id,
  isVisible,
}: {
  onShowEditInput: any;
  onChangeComponentInputValue: any;
  onHideEditInput: any;
  onRemoveComponent: any;
  isVisible: boolean;
  name: string;
  id: string;
}) => {
  return (
    <li className="flex items-center justify-center border-2 w-full flex-wrap py-2 mb-2 mx-auto">
      {isVisible && (
        <>
          <input
            className="border-b-2 outline-none"
            defaultValue={name}
            onChange={onChangeComponentInputValue}
            type="text"
          />
          <button id={id} onClick={onHideEditInput}>
            ✅
          </button>
        </>
      )}
      <div>
        {!isVisible && (
          <>
            <p className="mr-5">{name}</p>
            <button
              onClick={onShowEditInput}
              className="border-2 px-5 py-2"
              name={name}
              id={id}
            >
              edit
            </button>
          </>
        )}
        <button
          onClick={onRemoveComponent}
          className="ml-5 text-rose-500 border-2 px-5 py-2"
          id={id}
        >
          X
        </button>
      </div>
    </li>
  );
};
