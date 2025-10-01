export interface LoginUserResult {
  user: {
    id: number;
    email: string;
    name: string;
  };
  refreshToken?: string;
  accessToken: string;
}
