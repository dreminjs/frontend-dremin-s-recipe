export const RecipeComponentsList = ({
  recipeComponents,
  onShowEditInput,
  onHideEditInput,
  onChangeComponentInputValue,
  onRemoveComponent,
}: {
  recipeComponents: any[];
  onShowEditInput: (e: any) => void;
  onHideEditInput: (e: any) => void;
  onChangeComponentInputValue: (e: any) => void;
  onRemoveComponent: (e: any) => void;
}) => {
  return (
    <ul className="text-center">
      {recipeComponents?.map((el: any, idx: number) => (
        <li
          key={idx}
          className="flex items-center justify-center border-2 w-full py-2 mb-2 mx-auto"
        >
          {el.isVisible && (
            <>
              <input
                className="border-b-2 outline-none"
                defaultValue={el.name}
                onChange={onChangeComponentInputValue}
                type="text"
              />
              <button id={el.id} onClick={onHideEditInput}>
                ✅
              </button>
            </>
          )}
          {!el.isVisible && (
            <>
              <p className="mr-5">{el.name}</p>
              <button onClick={onShowEditInput} name={el.name} id={el.id}>
                edit
              </button>
            </>
          )}
          <button
            onClick={onRemoveComponent}
            className="ml-5 text-rose-500"
            id={el.id}
          >
            X
          </button>
        </li>
      ))}
      {recipeComponents?.length === 0 && <li>пусто!</li>}
    </ul>
  );
};
