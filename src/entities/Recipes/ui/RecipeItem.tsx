import Link from "next/link";

import Image from "next/image";

export const RecipeItem = ({
  recipeId,
  imgName,
  authorId,
  title,
  description,
  isRejected,
  isChecked,
  username,
}: {
  title: string;
  username: string;
  recipeId: string;
  authorId: string;
  imgName: string;
  description: string;
  isRejected?: boolean;
  isChecked?: boolean;
}) => {
  return (
    <li
      className={`mb-5 border-2 py-5 px-2 w-full flex items-center  ${
        !isRejected && !isChecked && "border-slate-200"
      } ${isRejected ? "border-rose-500" : ""}
      ${isChecked ? "border-lime-500" : ""} `}
    >
      <Link
        className="flex w-full flex-wrap gap-2"
        href={`/recipes/${recipeId}`}
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
    </li>
  );
};
