import { LoginAndSignupResponse, TokenType, UserType } from "@/types";
import { APIRoutes, baseUrl, saveAccessTokenAndRefreshToken } from "@/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router";

const useLogin = () => {
  const queryClient = useQueryClient();
  const navigator = useNavigate();
  return useMutation({
    mutationKey: [APIRoutes.LOGIN],
    mutationFn: async ({
      email,
      password,
    }: {
      email: string;
      password: string;
    }) => {
      const res = await axios.post<LoginAndSignupResponse>(
        `${baseUrl}${APIRoutes.LOGIN}`,
        {
          email,
          password,
        }
      );
      return res.data;
    },
    onSuccess: (data) => {
      if (data.status === "success") {
        console.log(data);
        const { accessToken, refreshToken, ...userDetails } = data.data;
        saveAccessTokenAndRefreshToken(
          accessToken,
          refreshToken,
          userDetails.userId
        );
        queryClient.setQueryData<UserType>(["userDetails"], userDetails);
        navigator("/home");
      }
    },
  });
};

export default useLogin;
