import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/modules/rootReducer';

import List from '../components/List';
import { logout as logoutSaga } from '../redux/modules/auth';
import { push } from 'connected-react-router';
import { getBooks, deleteBook as deleteBookSaga } from '../redux/modules/books';

const ListContainer: React.FC = () => {
  const { books, loading, error } = useSelector((state: RootState) => state.books);
  const dispatch = useDispatch();
  const goAdd = useCallback(() => {
    dispatch(push('/add'));
  }, [dispatch]);
  const logout = useCallback(() => {
    dispatch(logoutSaga());
  }, [dispatch]);

  // [project] saga 함수를 실행하는 액션 생성 함수를 실행하는 함수를 컨테이너에 작성했다.
  useEffect(() => {
    dispatch(getBooks())
  }, [dispatch]);

  const deleteBook = (bookId: number) => {
    dispatch(deleteBookSaga(bookId));
  }

  const goEdit = useCallback((bookId: number) => {
    dispatch(push(`/edit/${bookId}`));
  }, [dispatch]);

  // [project] 컨테이너에서 useDispatch, useSelector, useCallback 을 활용해서 중복없이 비동기 데이터를 보여주도록 처리했다.
  return (
    <>
      {loading && <p style={{ textAlign: 'center' }}>로딩 중..</p>}
      {error && <p style={{ textAlign: 'center' }}>에러 발생!</p>}
      {books && <List
        books={books}
        loading={false}
        goAdd={goAdd}
        goEdit={goEdit}
        logout={logout}
        deleteBook={deleteBook} />}
    </>
  );
};

export default ListContainer;
