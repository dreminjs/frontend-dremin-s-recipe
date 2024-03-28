import Link from "next/link";

import Image from "next/image";

export const UserOwnRecipeItem = ({
  recipeId,
  imgName,
  authorId,
  title,
  description,
  isRejected,
  isChecked,
  username,
  onDeleteRecipe,
}: {
  title: string;
  username: string;
  recipeId: string;
  authorId: string;
  imgName: string;
  description: string;
  isRejected?: boolean;
  isChecked?: boolean;
  onDeleteRecipe: () => void;
}) => {
  return (
    <li
      className={`mb-5 border-2 flex justify-between items-center py-5 px-2 w-full ${
        !isRejected && !isChecked && "border-slate-200"
      } ${isRejected ? "border-rose-500" : ""}
      ${isChecked ? "border-lime-500" : ""} `}
    >
      <Link
        className="flex gap-2 items-center  flex-wrap"
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
      <div className="min-[320px]:ml-2">
        <Link
          className="block border-2 p-2 mb-2 text-center"
          href={`/editRecipe/${recipeId}`}
        >
          edit
        </Link>

        <button onClick={onDeleteRecipe} className="block border-2 p-2">
          delete
        </button>
      </div>
    </li>
  );
};
