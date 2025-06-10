import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { VITE_API_URL } from "../../config/config";
import { IPrompt, LlmResponse } from "../../features/ai/types/llm.types";
import { usePrepareHeaders } from "../../lib/headers";

export const ApiLLM = createApi({
  reducerPath: "apiLlm",
  baseQuery: fetchBaseQuery({
    baseUrl: VITE_API_URL,
    credentials: "include",
    prepareHeaders: usePrepareHeaders,
  }),
  endpoints: (builder) => ({
    PostMutationLLM: builder.mutation<LlmResponse, IPrompt>({
      query: (body) => ({
        url: "/tools/query",
        method: "POST",
        body: body,
      }),
    }),
  }),
});

export const { usePostMutationLLMMutation } = ApiLLM;
