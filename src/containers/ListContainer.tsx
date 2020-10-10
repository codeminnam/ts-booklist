import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/modules/rootReducer';

import List from '../components/List';
import { logout as logoutSaga } from '../redux/modules/auth';
import { push } from 'connected-react-router';
import { getBooks as getBooksSaga, deleteBook as deleteBookSaga } from '../redux/modules/books';

const ListContainer: React.FC = (props) => {
  const { books, loading, error } = useSelector((state: RootState) => state.books);

  // [project] saga 함수를 실행하는 액션 생성 함수를 실행하는 함수를 컨테이너에 작성했다.
  const dispatch = useDispatch();

  const getBooks = useCallback(() => {
    dispatch(getBooksSaga());
  }, [dispatch]);

  const deleteBook = useCallback(
    (bookId: number) => {
      dispatch(deleteBookSaga(bookId));
    }, [dispatch]);

  const goAdd = useCallback(() => {
    dispatch(push('/add'));
  }, [dispatch]);

  const goEdit = useCallback(
    (bookId: number) => {
      dispatch(push(`/edit/${bookId}`));
    }, [dispatch]);

  const logout = useCallback(() => {
    dispatch(logoutSaga());
  }, [dispatch]);


  // [project] 컨테이너에서 useDispatch, useSelector, useCallback 을 활용해서 중복없이 비동기 데이터를 보여주도록 처리했다.
  return (
    <List
      {...props}
      books={books}
      loading={loading}
      error={error}
      getBooks={getBooks}
      deleteBook={deleteBook}
      goAdd={goAdd}
      goEdit={goEdit}
      logout={logout}
    />
  );
};

export default ListContainer;
