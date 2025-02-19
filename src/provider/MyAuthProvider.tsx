import { LoginAndSignupResponse } from "@/types";
import { APIRoutes, baseUrl, saveAccessTokenAndRefreshToken } from "@/utils";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { ReactElement, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";

const MyAuthProvider = ({ children }: { children: ReactElement }) => {
  const navigator = useNavigate();
  const { pathname } = useLocation();
  const { mutate: authorizedUserLookup } = useMutation({
    mutationKey: [APIRoutes.AUTHORIZED_USER_LOOKUP],
    mutationFn: async ({
      userId,
      refreshToken,
    }: {
      userId: string;
      refreshToken: string;
    }) => {
      return await axios.post<LoginAndSignupResponse>(
        `${baseUrl}${APIRoutes.AUTHORIZED_USER_LOOKUP}`,
        {
          userId,
          refreshToken,
        }
      );
    },
    onSuccess: ({ data }) => {
      if (data.status === "success") {
        saveAccessTokenAndRefreshToken(
          data.data.accessToken,
          data.data.refreshToken,
          data.data.userId
        );
        if (pathname === "/" || pathname === "/signup") {
          navigator("/home");
        }
      }
      console.log(pathname);
    },
    onError: (error: AxiosError) => {
      if (error.status === 401) {
        navigator("/");
      }
    },
  });

  useEffect(() => {
    const userId = localStorage.getItem("myAuthUserId");
    const cookies = document.cookie.split("; ");
    const cookie = cookies.find((c) => c.startsWith("my-auth-refreshToken="));
    const refreshToken = cookie ? cookie.split("=")[1] : null;
    authorizedUserLookup({
      userId: userId ?? "",
      refreshToken: refreshToken ?? "",
    });
  }, [pathname]);
  return <>{children}</>;
};

export default MyAuthProvider;
