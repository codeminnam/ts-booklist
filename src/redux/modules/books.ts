import { BookResType, BookReqType } from '../../types';
import BookService from '../../services/BookService';
import { call, takeEvery, put, take } from 'redux-saga/effects';
import { AxiosError } from 'axios';
import { AnyAction } from 'redux';

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
const ADD_BOOK = 'my-books/books/ADD_BOOK' as const;
const PENDING = 'my-books/books/PENDING' as const;
const SUCCESS = 'my-books/books/SUCCESS' as const;
const ERROR = 'my-books/books/ERROR' as const;

export const getBooks = () => ({ type: GET_BOOKS });
export const addBook = (book: BookReqType) => ({ type: ADD_BOOK, payload: book });
export const pending = () => ({ type: PENDING });
export const success = (books: BookResType[]) => ({ type: SUCCESS, payload: books });
export const error = (e: AxiosError) => ({ type: ERROR, payload: e });

type BooksAction =
  | ReturnType<typeof getBooks>
  | ReturnType<typeof addBook>
  | ReturnType<typeof pending>
  | ReturnType<typeof success>
  | ReturnType<typeof error>;

const reducer = (state: BooksState = initialState, action: BooksAction): BooksState => {
  switch (action.type) {
    case GET_BOOKS:
    case ADD_BOOK:
      return {
        loading: false,
        books: null,
        error: null
      };
    case PENDING:
      return {
        loading: true,
        books: null,
        error: null
      };
    case SUCCESS:
      return {
        loading: false,
        books: action.payload,
        error: null
      }
    case ERROR:
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
    yield put({ type: PENDING });
    const books = yield call(BookService.getBooks, token);
    yield put({
      type: SUCCESS,
      payload: books
    });
  } catch (e) {
    yield put({
      type: ERROR,
      payload: e
    })
  }
}

// [project] 책을 추가하는 saga 함수를 작성했다.
interface AddSagaAction extends AnyAction {
  payload: BookReqType;
}

function* addBookSaga(action: AddSagaAction) {
  try {
    yield put({ type: PENDING });
    const book = yield call(BookService.addBook, token, action.payload);
    yield put({
      type: SUCCESS,
      payload: book
    });
  } catch (e) {
    yield put({
      type: ERROR,
      payload: e
    })
  }
}

// [project] 책을 삭제하는 saga 함수를 작성했다.


// [project] 책을 수정하는 saga 함수를 작성했다.

// [project] saga 함수를 실행하는 액션과 액션 생성 함수를 작성했다.

export function* sagas() {
  yield takeEvery(GET_BOOKS, getBooksSaga);
  yield takeEvery(ADD_BOOK, addBookSaga);
}
