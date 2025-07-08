import { Apis } from "./api";

interface LoginRequest {
    username: string;
    password: string;
}

interface LoginResposne {
    message: string;
    username: string;
    token: string;
}

interface SignupRequest {
    username: string;
    email: string;
    password: string;
}

interface SignupResponse {
  id: string;
  username: string;
  email: string;
  createdAt: string;
}

export const authApi = Apis.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation<LoginResposne, LoginRequest>({
            query: (body) => ({
                url: '/auth/login',
                method: "POST",
                body,
            }),
            invalidatesTags: [],
        }),
        signup: builder.mutation<SignupResponse, SignupRequest>({
            query: (body) => ({
                url: '/auth/register',
                method: "POST",
                body,
            }),
            invalidatesTags: [],
        }),
    })
})

export const { useLoginMutation, useSignupMutation } = authApi