export interface LoginUserResult {
  user: {
    id: number;
    email: string;
    name: string;
  };
  accessToken: string;
}
