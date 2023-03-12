import React, { useCallback, useEffect, useState } from 'react';
import Wallet from './components/Wallet';
import Card from './pages/Card';
import { getWalletsApi } from './api/requests/wallet';
import classes from './App.module.css';

function App() {
  const [wallets, setWallets] = useState([]);

  const fetchWallets = useCallback(async () => {
    const { data } = await getWalletsApi();
    setWallets(data.content);
  }, []);

  useEffect(() => {
    fetchWallets();
  }, [fetchWallets]);

  const walletsList = wallets.map((wallet) => (
    <Wallet
      key={wallet.id}
      id={wallet.id}
      name={wallet.name}
      description={wallet.description}
      balance={wallet.balance}
      fetchWallets={fetchWallets}
    />
  ));

  return (
    <section className={classes.wallets}>
      <Card>
        <ul>
          {walletsList}
        </ul>
      </Card>
    </section>
  );
}

export default App;
