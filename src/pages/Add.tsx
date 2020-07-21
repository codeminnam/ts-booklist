import React from 'react';
import { Redirect, RouteComponentProps } from 'react-router-dom';

import useToken from '../hooks/useToken';
import AddContainer from '../containers/AddContainer';

interface HistoryParams {
  goBack: string;
}

const Add: React.FC<RouteComponentProps<HistoryParams>> = ({ history }) => {
  const token = useToken();
  if (token === null) {
    return <Redirect to="/signin" />;
  }

  const goBack = () => {
    history.goBack();
  }

  return <AddContainer goBack={goBack} />;
};

export default Add;
