import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Detail from '../components/Detail';
import { logout as logoutSaga } from '../redux/modules/auth';
import { RootState } from '../redux/modules/rootReducer';
import { getBooks } from '../redux/modules/books';

interface DetailContainerProps {
  bookId: number
  goBack: () => void;
  goEdit: (bookId: number | undefined) => void;
}

const DetailContainer: React.FC<DetailContainerProps> = ({ bookId, goBack, goEdit }) => {
  const { books } = useSelector((state: RootState) => state.books);
  const dispatch = useDispatch();
  const logout = useCallback(() => {
    dispatch(logoutSaga());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getBooks())
  }, [dispatch]);

  const book = books?.find(book => book.bookId === bookId);

  // [project] saga 함수를 실행하는 액션 생성 함수를 실행하는 함수를 컨테이너에 작성했다.
  // [project] 컨테이너에서 useDispatch, useSelector, useCallback 을 활용해서 중복없이 비동기 데이터를 보여주도록 처리했다.
  // [project] Edit 나 Detail 컴포넌트에서 새로고침 시, 리스트가 없는 경우, 리스트를 받아오도록 처리했다.

  return <Detail book={book} logout={logout} goBack={goBack} goEdit={goEdit} />;
};

export default DetailContainer;
