import { RecipeComponentsTabs } from "@/features/recipeComponents";
import Image from "next/image";
import Link from "next/link";
import {
  useCheckLikeQuery,
  useDislikeRecipeMutation,
  useLikeRecipeMutation,
} from "../api/gradeRecipeApi";
import { useEffect, useState } from "react";
import { useAppSelector } from "@/shared";

export const RecipePage = ({
  title,
  description,
  ingredients,
  steps,
  typeName,
  nationalCuisineName,
  holidayName,
  authorId,
  authorName,
  imgName,
  recipeId,
  countOfLikes,
}: {
  title: string;
  description: string;
  ingredients: any[];
  steps: any[];
  typeName: string;
  nationalCuisineName: string;
  holidayName: string;
  authorId: number;
  authorName: string;
  imgName: string;
  recipeId: string | string[] | undefined;
  countOfLikes: number;
}) => {
  const [likes, setLikes] = useState(0);

  const [
    sendLike,
    {
      isLoading: sendingLikeIsLoading,
      isSuccess: sendingLikeIsSuccess,
      isError: sendingLikeIsError,
      data: sendingLikeData,
    },
  ] = useLikeRecipeMutation();
  const [
    sendDislike,
    {
      isLoading: sendingDislikeIsLoading,
      isSuccess: sendingDislikeIsSuccess,
      data: sendingDislikeData,
    },
  ] = useDislikeRecipeMutation();

  const {
    data: checkLikeData,
    isLoading: checkLikeIsLoading,
    isSuccess: checkLikeIsSuccess,

    refetch: refrechCheckLike,
  } = useCheckLikeQuery(recipeId);

  useEffect(() => {
    refrechCheckLike();

    if (checkLikeIsSuccess) {
      setLikes(checkLikeData.countLikes);
    }
  }, [sendingDislikeIsLoading, sendingLikeIsLoading]);

  const { isAuth } = useAppSelector((state) => state.authSlice);

  return (
    <>
      <h3 className="text-2xl mb-2">Рецепт : {title}</h3>
      <h4 className="text-2xl mb-5">
        Автор :{" "}
        <Link className="underline" href={`/profile/${authorId}`}>
          {authorName}
        </Link>
      </h4>
      <ul className="mb-2">
        <li>
          <p>национальная кухня : {nationalCuisineName}</p>
        </li>
        <li>
          <p>праздник : {holidayName}</p>
        </li>
        <li>
          <p>тип : {typeName}</p>
        </li>
      </ul>
      <div className="flex justify-between flex-wrap">
        <p className="text-xl min-[320px]:w-8/12 min-[600px]:w-1/2 mb-2">
          {description}dsa d ad sad sad sad as
        </p>
        <Image
          width={300}
          height={100}
          className="min-[320px]:w-full min-[880px]:w-1/2 h-full object-cover mb-5"
          src={`http://localhost:3000/${imgName}`}
          alt={"recipe photo"}
        />
      </div>

      <RecipeComponentsTabs ingredients={ingredients} steps={steps} />

      <div className="flex gap-5 items-center mb-5">
        {isAuth && !checkLikeData?.isLiked ? (
          <button
            className="border-2 px-5 py-2"
            onClick={() => sendLike(recipeId)}
          >
            Добавить в понравевшиеся
          </button>
        ) : (
          <button
            className="border-2 px-5 py-2"
            onClick={() => sendDislike(recipeId)}
          >
            убрать из понравевшиеся
          </button>
        )}
        <p>Кол-во лайков: {checkLikeData?.countLikes}</p>
      </div>
    </>
  );
};
