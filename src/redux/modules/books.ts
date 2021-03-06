import { BookResType, BookReqType } from '../../types';
import BookService from '../../services/BookService';
import { call, takeEvery, put, select } from 'redux-saga/effects';
import { AxiosError } from 'axios';
import { AnyAction } from 'redux';
import { getBooksFromState, getTokenFromState } from '../utils';
import { push } from 'connected-react-router';

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
const DELETE_BOOK = 'my-books/books/DELETE_BOOK' as const;
const EDIT_BOOK = 'my-books/books/EDIT_BOOK' as const;
const PENDING = 'my-books/books/PENDING' as const;
const SUCCESS = 'my-books/books/SUCCESS' as const;
const ERROR = 'my-books/books/ERROR' as const;

export const getBooks = () => ({ type: GET_BOOKS });
export const addBook = (book: BookReqType) => ({ type: ADD_BOOK, payload: { book } });
export const deleteBook = (bookId: number) => ({ type: DELETE_BOOK, payload: bookId });
export const editBook = (bookId: number, book: BookReqType) => ({ type: EDIT_BOOK, payload: { bookId, book } });
export const pending = () => ({ type: PENDING });
export const success = (books: BookResType[]) => ({ type: SUCCESS, payload: books });
export const error = (e: AxiosError) => ({ type: ERROR, payload: e });

type BooksAction =
  | ReturnType<typeof getBooks>
  | ReturnType<typeof addBook>
  | ReturnType<typeof deleteBook>
  | ReturnType<typeof editBook>
  | ReturnType<typeof pending>
  | ReturnType<typeof success>
  | ReturnType<typeof error>;

const reducer = (state: BooksState = initialState, action: BooksAction): BooksState => {
  switch (action.type) {
    case GET_BOOKS:
    case ADD_BOOK:
    case DELETE_BOOK:
    case EDIT_BOOK:
      return {
        loading: false,
        books: state.books,
        error: null
      };
    case PENDING:
      return {
        loading: true,
        books: state.books,
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
    const token: string = yield select((state) => state.auth.token);
    const books: BookResType[] = yield call(BookService.getBooks, token);
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
  payload: {
    book: BookReqType
  };
}

function* addBookSaga(action: AddSagaAction) {
  try {
    yield put({ type: PENDING });
    const token: string = yield select(getTokenFromState);
    const book: BookResType = yield call(
      BookService.addBook,
      token,
      action.payload.book
    );
    console.log(book);
    const books: BookResType[] = yield select(getBooksFromState);
    yield put({
      type: SUCCESS,
      payload: [...books, book]
    });
    yield put(push('/'));
  } catch (e) {
    yield put({
      type: ERROR,
      payload: e
    })
  }
}

// [project] 책을 삭제하는 saga 함수를 작성했다.
interface DeleteSagaAction extends AnyAction {
  payload: {
    bookId: number;
  };
}

function* deleteBookSaga(action: DeleteSagaAction) {
  try {
    yield put({ type: PENDING });
    const token: string = yield select(getTokenFromState);
    yield call(BookService.deleteBook, token, action.payload.bookId);
    const books: BookResType[] = yield select(getBooksFromState);
    yield put({
      type: SUCCESS,
      payload: books.filter((book) => book.bookId !== action.payload.bookId)
    });
  } catch (e) {
    yield put({
      type: ERROR,
      payload: e
    })
  }
}

// [project] 책을 수정하는 saga 함수를 작성했다.
interface EditSagaAction extends AnyAction {
  payload: {
    bookId: number;
    book: BookReqType;
  }
}

function* editBookSaga(action: EditSagaAction) {
  try {
    yield put({ type: PENDING });
    const token: string = yield select(getTokenFromState);
    const newBook = yield call(
      BookService.editBook,
      token, action.payload.bookId,
      action.payload.book
    );
    const books: BookResType[] = yield select(getBooksFromState);
    yield put({
      type: SUCCESS,
      payload: books.map((book) => (book.bookId === newBook.bookId ? newBook : book))
    });
    yield put(push('/'));
  } catch (e) {
    yield put({
      type: ERROR,
      payload: e
    })
  }
}

// [project] saga 함수를 실행하는 액션과 액션 생성 함수를 작성했다.
export function* sagas() {
  yield takeEvery(GET_BOOKS, getBooksSaga);
  yield takeEvery(ADD_BOOK, addBookSaga);
  yield takeEvery(DELETE_BOOK, deleteBookSaga);
  yield takeEvery(EDIT_BOOK, editBookSaga);
}
