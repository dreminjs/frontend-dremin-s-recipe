import { CharacteristicsTabs } from "@/features/characteristics";
import Image from "next/image";
import Link from "next/link";
import {
  useCheckLikeQuery,
  useDislikeRecipeMutation,
  useLikeRecipeMutation,
} from "../api/gradeRecipeApi";
import { useEffect } from "react";
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
}) => {
  const [
    sendLike,
    { isLoading: sendingLikeIsLoading, isError: sendingLikeIsError },
  ] = useLikeRecipeMutation();
  const [sendDislike, { isLoading: sendingDislikeIsLoading }] =
    useDislikeRecipeMutation();

  const {
    data: checkLikeData,
    isLoading: checkLikeIsLoading,
    isSuccess: checkLikeIsSuccess,
    refetch: refrechCheckLike,
  } = useCheckLikeQuery(recipeId);

  useEffect(() => {
    refrechCheckLike();
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
      <div className="flex justify-between">
        <p className="text-xl w-1/2">{description}</p>
        <Image
          width={300}
          height={100}
          src={`http://localhost:3000/${imgName}`}
          alt={"recipe photo"}
        />
      </div>

      <CharacteristicsTabs ingredients={ingredients} steps={steps} />

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
    </>
  );
};
