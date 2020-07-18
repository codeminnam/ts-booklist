import { BookResType } from '../../types';
import BookService from '../../services/BookService';
import { call, takeEvery, put } from 'redux-saga/effects';
import { AxiosError } from 'axios';

const token = "d824c0fd-4e07-4e3f-bb31-561b8c5a6636";

export interface BooksState {
  books: BookResType[] | null;
  loading: boolean;
  error: Error | null;
}

const initialState: BooksState = {
  books: null,
  loading: false,
  error: null,
};

// [project] redux-action 을 이용하여, books 모듈의 액션 생성 함수와 리듀서를 작성했다.

const GET_BOOKS = 'my-books/books/GET_BOOKS' as const;
const GET_BOOKS_SUCCESS = 'my-books/books/GET_BOOKS_SUCCESS' as const;
const GET_BOOKS_ERROR = 'my-books/books/GET_BOOKS_ERROR' as const;

export const getBooks = () => ({ type: GET_BOOKS });
export const getBooksSuccess = (books: BookResType[]) => ({ type: GET_BOOKS_SUCCESS, payload: books });
export const getBooksError = (e: AxiosError) => ({ type: GET_BOOKS_ERROR, payload: e });

type BooksAction =
  | ReturnType<typeof getBooks>
  | ReturnType<typeof getBooksSuccess>
  | ReturnType<typeof getBooksError>;

const reducer = (state: BooksState = initialState, action: BooksAction): BooksState => {
  switch (action.type) {
    case GET_BOOKS:
      return {
        loading: true,
        books: null,
        error: null
      };
    case GET_BOOKS_SUCCESS:
      return {
        loading: false,
        books: action.payload,
        error: null
      }
    case GET_BOOKS_ERROR:
      return {
        loading: false,
        books: null,
        error: action.payload
      }
    default:
      return state;
  }
};

export default reducer;

// [project] 책 목록을 가져오는 saga 함수를 작성했다.
function* getBooksSaga() {
  try {
    const books = yield call(BookService.getBooks, token);
    yield put({
      type: GET_BOOKS_SUCCESS,
      payload: books
    });
  } catch (e) {
    yield put({
      type: GET_BOOKS_ERROR,
      payload: e
    })
  }
}

// [project] 책을 추가하는 saga 함수를 작성했다.


// [project] 책을 삭제하는 saga 함수를 작성했다.


// [project] 책을 수정하는 saga 함수를 작성했다.

// [project] saga 함수를 실행하는 액션과 액션 생성 함수를 작성했다.

export function* sagas() {
  yield takeEvery(GET_BOOKS, getBooksSaga);
}
