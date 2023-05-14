export interface Notice {
    id: string;
    title: string;
    message: string;
    author: string;
    createdAt: string;
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
  