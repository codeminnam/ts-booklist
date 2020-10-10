import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Edit from '../components/Edit';
import { logout as logoutSaga } from '../redux/modules/auth';
import { RootState } from '../redux/modules/rootReducer';
import {
  editBook as editBookSaga,
  getBooks as getBooksSaga,
} from '../redux/modules/books';
import { useParams } from 'react-router-dom';
import { goBack } from 'connected-react-router';


const EditContainer = () => {
  const { id } = useParams();
  const bookId = Number(id) || -1;

  const { books, loading, error } = useSelector((state: RootState) => state.books);

  const dispatch = useDispatch();

  const back = useCallback(() => {
    dispatch(goBack());
  }, [dispatch]);

  const logout = useCallback(() => {
    dispatch(logoutSaga());
  }, [dispatch]);

  // [project] saga 함수를 실행하는 액션 생성 함수를 실행하는 함수를 컨테이너에 작성했다.
  const getBooks = useCallback(() => {
    dispatch(getBooksSaga());
  }, [dispatch]);

  const editBook = useCallback(
    (book) => {
      dispatch(editBookSaga(bookId, book));
    },
    [dispatch, bookId],
  );

  // [project] 컨테이너에서 useDispatch, useSelector, useCallback 을 활용해서 중복없이 비동기 데이터를 보여주도록 처리했다.
  // [project] Edit 나 Detail 컴포넌트에서 새로고침 시, 리스트가 없는 경우, 리스트를 받아오도록 처리했다.
  return (
    <Edit
      book={
        books === null ? null : books.find((book) => book.bookId === bookId)
      }
      loading={loading}
      error={error}
      getBooks={getBooks}
      editBook={editBook}
      goBack={back}
      logout={logout} />
  );
};

export default EditContainer;
