import { baseApi } from "@/shared";

export const gradeRecipeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    likeRecipe: builder.mutation({
      query: (id) => ({
        url: `recipes/like/${id}`,
        method: "POST",
      }),
    }),
    dislikeRecipe: builder.mutation({
      query: (id) => ({
        method: "DELETE",
        url: `recipes/dislike/${id}`,
      }),
    }),
    checkLike: builder.query({
      query: (id) => ({
        url: `recipes/checkLike/${id}`,
      }),
    }),
  }),
});

export const {
  useDislikeRecipeMutation,
  useLikeRecipeMutation,
  useCheckLikeQuery,
} = gradeRecipeApi;
