import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8081/' }),
  endpoints: (builder) => ({


    // Authentication
    register: builder.mutation({
      query: (credentials) => ({
        url: 'auth/register',
        method: 'POST',
        body: credentials,
      }),
    }),
    login: builder.mutation({
      query: (credentials) => ({
        url: 'auth/login',
        method: 'POST',
        body: credentials,
      }),
    }),

    // Posts
    createPost: builder.mutation({
      query: (newPost) => ({
        url: 'api/posts',
        method: 'POST',
        body: newPost,
      }),
    }),
    getPosts: builder.query({
      query: () => 'api/posts',
    }),
    getPostById: builder.query({
      query: (id) => `api/posts/${id}`,
    }),
    updatePost: builder.mutation({
      query: ({ id, ...fields }) => ({
        url: `api/posts/${id}`,
        method: 'PUT',
        body: fields,
      }),
    }),
    deletePost: builder.mutation({
      query: (id) => ({
        url: `api/posts/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useCreatePostMutation,
  useGetPostsQuery,
  useGetPostByIdQuery,
  useUpdatePostMutation,
  useDeletePostMutation,
} = api;


