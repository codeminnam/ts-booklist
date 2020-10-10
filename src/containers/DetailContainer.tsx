import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Detail from '../components/Detail';
import { logout as logoutSaga } from '../redux/modules/auth';
import { RootState } from '../redux/modules/rootReducer';
import { getBooks as getBooksSaga } from '../redux/modules/books';
import { useParams } from 'react-router-dom';
import { goBack, push } from 'connected-react-router';

const DetailContainer = () => {
  const { id } = useParams();
  const bookId = Number(id) || -1;

  const { books, error } = useSelector((state: RootState) => state.books);
  const dispatch = useDispatch();
  const logout = useCallback(() => {
    dispatch(logoutSaga());
  }, [dispatch]);

  // [project] saga 함수를 실행하는 액션 생성 함수를 실행하는 함수를 컨테이너에 작성했다.
  // [project] 컨테이너에서 useDispatch, useSelector, useCallback 을 활용해서 중복없이 비동기 데이터를 보여주도록 처리했다.
  // [project] Edit 나 Detail 컴포넌트에서 새로고침 시, 리스트가 없는 경우, 리스트를 받아오도록 처리했다.
  const getBooks = useCallback(() => {
    dispatch(getBooksSaga());
  }, [dispatch]);

  const goEdit = useCallback(() => {
    dispatch(push(`/edit/${id}`));
  }, [dispatch, id]);

  const back = useCallback(() => {
    dispatch(goBack());
  }, [dispatch]);

  return <Detail
    book={
      books === null ? null : books.find((book) => book.bookId === bookId)
    }
    error={error}
    getBooks={getBooks}
    goEdit={goEdit}
    goBack={back}
    logout={logout}
  />;
};

export default DetailContainer;
