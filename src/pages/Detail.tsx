import React from 'react';
import { Redirect, RouteComponentProps } from 'react-router-dom';

import useToken from '../hooks/useToken';
import DetailContainer from '../containers/DetailContainer';

interface Params {
  id: string
}

const Detail: React.FC<RouteComponentProps<Params>> = ({ match, history }) => {
  const token = useToken();
  if (token === null) {
    return <Redirect to="/signin" />;
  }

  const goBack = () => {
    history.goBack();
  }
  const goEdit = (bookId: number | undefined) => {
    history.push(`/edit/${bookId}`);
  }

  const bookId = parseInt(match.params.id, 10);

  return <DetailContainer bookId={bookId} goBack={goBack} goEdit={goEdit} />;
};

export default Detail;
