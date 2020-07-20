import React from 'react';
import { Redirect } from 'react-router-dom';

import useToken from '../hooks/useToken';
import EditContainer from '../containers/EditContainer';
import { RouteComponentProps } from 'react-router';

interface MatchParams {
  id: string;
}

const Edit: React.FC<RouteComponentProps<MatchParams>> = ({ match }) => {
  const token = useToken();
  const bookId = parseInt(match.params.id, 10);

  if (token === null) {
    return <Redirect to="/signin" />;
  }
  return <EditContainer bookId={bookId} />;
};

export default Edit;
