export type User = {
  id: number;
  username: string;
  email: string;
  avatar: string;
};

export type Profile = User & {
  authorities: string[];
};
