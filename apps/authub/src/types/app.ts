export type AppBase = {
  id: number;
  name: string;
  appKey: string;
  memo: string;
  createTime: string;
  ownerId: number;
  logo: string;
  callbackUrl: string;
  role: number;
  enable: boolean;
};

export type AppResponse = AppBase;

export type AppListResponse = AppBase;
