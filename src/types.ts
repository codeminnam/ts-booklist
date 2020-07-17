export interface BookReqType {
  title: string;
  author: string;
  message: string;
  url: string;
}

// [project] API 응답을 확인하여, BookResType 을 정의한다.
export interface BookResType {
  bookId: number;
  ownderId: string;
  title: string;
  message: string;
  author: string;
  url: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface LoginReqType {
  email: string;
  password: string;
}

export interface LoginResType {
  token: string;
}
