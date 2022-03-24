export interface ClassInfo {
  name: string;
  students: string[];
}

export interface AppState {
  isLoading: boolean;
  isLogin: boolean;
  userName: string;
  userClassIds: string[];
  classList: ClassInfo[];
}
