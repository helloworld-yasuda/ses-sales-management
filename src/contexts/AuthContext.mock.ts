export type AuthUser = {
  userName: string;
  role: string;
  avatarUrl?: string;
};

export const mockAuthUser: AuthUser = {
  userName: "山田太郎",
  role: "管理者",
};
