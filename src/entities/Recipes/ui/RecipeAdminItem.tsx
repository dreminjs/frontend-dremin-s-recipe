import Link from "next/link";
import Image from "next/image";
export const RecipesAdminItem = ({
  recipeId,
  imgName,
  authorId,
  title,
  description,
  username,
  isRejected,
  isChecked,
  onCheckRecipe,
  onRejectRecipe,
  onDeleteRecipe,
}: {
  recipeId: string;
  imgName: string;
  authorId: number;
  username: string;
  title: string;
  description: string;
  isRejected: boolean;
  isChecked: boolean;
  onRejectRecipe: () => void;
  onCheckRecipe: () => void;
  onDeleteRecipe: () => void;
}) => {
  return (
    <li className="mb-2 border-2 w-full pt-2 px-2">
      <Link
        className="flex gap-2 flex-wrap items-center mb-2"
        href={`recipes/${recipeId}`}
      >
        <Image
          height={200}
          width={150}
          className="object-cover h-full w-52"
          src={`http://localhost:3000/${imgName}`}
          alt="alt"
        />
        <div>
          <p className="text-xl">{title}</p>
          <p className="mb-2">{description.substring(0, 100)}</p>
          <Link href={`/profile/${authorId}`}>Автор : {username}</Link>
        </div>
      </Link>
      <div className="flex gap-2 items-center flex-wrap">
        {!isChecked && (
          <button
            className="block text-center border-2 p-2 mb-2 "
            onClick={() => onCheckRecipe()}
          >
            Check
          </button>
        )}

        {!isRejected && (
          <button
            className="block text-center border-2 p-2 mb-2 "
            onClick={() => onRejectRecipe()}
          >
            Reject
          </button>
        )}
        <button onClick={() => onDeleteRecipe()} className="border-2 p-2 mb-2">
          Delete
        </button>
        <Link href={`/editRecipe/${recipeId}`} className="border-2 p-2 mb-2">
          Edit
        </Link>
      </div>
    </li>
  );
};
