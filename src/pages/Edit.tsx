import React from 'react';
import { Redirect } from 'react-router-dom';

import useToken from '../hooks/useToken';
import EditContainer from '../containers/EditContainer';
import { RouteComponentProps } from 'react-router';

interface Params {
  id: string;
  goBack: string;
}

const Edit: React.FC<RouteComponentProps<Params>> = ({ match, history }) => {
  const token = useToken();
  const bookId = parseInt(match.params.id, 10);
  const goBack = () => {
    history.goBack();
  }

  if (token === null) {
    return <Redirect to="/signin" />;
  }
  return <EditContainer bookId={bookId} goBack={goBack} />;
};

export default Edit;
