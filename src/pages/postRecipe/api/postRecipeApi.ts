import { baseApi } from "@/shared";

const postRecipeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    postRecipe: builder.mutation({
      query: (body) => ({
        url: "recipes",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { usePostRecipeMutation } = postRecipeApi;
