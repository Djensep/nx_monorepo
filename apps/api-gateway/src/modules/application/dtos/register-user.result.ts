export interface RegisterUserResult {
  user: {
    id: number;
    email: string;
    name: string;
  };
  accessToken: string;
}
