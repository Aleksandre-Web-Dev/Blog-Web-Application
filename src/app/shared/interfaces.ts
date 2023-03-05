export interface User {
    email:string,
    password:string
}

export interface Post {
    id?: string;
    title: string;
    author: string;
    content: string;
    creation_date: any;
  }