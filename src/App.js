import React from 'react';
import WalletsList from './pages/WalletsList';
import { Redirect, Route, Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AuthPage from './pages/AuthPage';

function App() {

  const userToken = useSelector((state) => state.auth.userToken);

  return (
    <Switch>
      <Route path="/" exact>
        {userToken && <WalletsList />}
        {!userToken && <Redirect to="/login" />}
      </Route>
      <Route path="/login">
        <AuthPage />
      </Route>
      <Route path="*">
        <Redirect to="/login" />
      </Route>
    </Switch>
  );
}

export default App;
