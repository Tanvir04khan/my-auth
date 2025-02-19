export enum APIRoutes {
  USER_SIGNUP = "/v1/signup",
  LOGIN = "/v1/login",
  AUTHORIZED_USER_LOOKUP = "/v1/authorizeduser-lookup",
}

export const baseUrl = import.meta.env.VITE_BACKEND_URL;

export const saveAccessTokenAndRefreshToken = (
  accessToken: string,
  refreshToken: string,
  userId: string
) => {
  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("myAuthUserId", userId);
  const expires = new Date();
  expires.setTime(expires.getTime() + 30 * 24 * 60 * 60 * 1000);
  document.cookie = `my-auth-refreshToken=${refreshToken}; expires=${expires.toUTCString()}; path=/`;
};
