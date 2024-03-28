export const RecipeComponentItem = ({
  title,
  width,
}: {
  title: string;
  width: string;
}) => {
  return (
    <li className={`text-center mx-auto text-xl ${width} border-2 py-2`}>
      <p>{title}</p>
    </li>
  );
};
