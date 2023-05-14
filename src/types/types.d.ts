export interface Notice {
    id: string;
    title: string;
    message: string;
    author: string;
    createdAt: string;
  }

export interface NoticeData {
  title: string;
  message: string;
  }
  export interface User {
    id: string;
    name: string;
    email: string;
  }
  
  export interface AuthData {
    user: User;
    token: string;
  }
  
  export interface AuthContextProps {
    user: User | null;
    isAuthenticated: boolean;
    loading: boolean;
    login: () => void;
    logout: () => void;
  }