export interface UserType {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
}

export type TokenType = {
  accessToken: string;
  refreshToken: string;
};

export type LoginAndSignupResponse = {
  status: string;
  statusCode: number;
  message: string;
  data: UserType & TokenType;
};
