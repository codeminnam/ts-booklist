import React from 'react';
import { Redirect, RouteComponentProps } from 'react-router-dom';

import useToken from '../hooks/useToken';
import AddContainer from '../containers/AddContainer';

interface HistoryParams {
}

const Add: React.FC<RouteComponentProps<HistoryParams>> = ({ history }) => {
  const token = useToken();
  if (token === null) {
    return <Redirect to="/signin" />;
  }

  const goBack = () => {
    history.goBack();
  }

  const goHome = () => {
    history.push('/');
  }

  return <AddContainer goBack={goBack} goHome={goHome} />;
};

export default Add;
