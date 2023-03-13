import React, { useEffect } from 'react';
import classes from '../App.module.css';
import Card from '../components/Card';
import Wallet from '../components/Wallet';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWalletsAction } from '../redux/wallets-actions';

const WalletsList = () => {
  const dispatch = useDispatch();
  const wallets = useSelector((state) => state.wallet.wallets);

  useEffect(() => {
    dispatch(fetchWalletsAction());
  }, [dispatch]);

  const walletsList = wallets.map((wallet) => (
    <Wallet
      key={wallet.id}
      id={wallet.id}
      name={wallet.name}
      description={wallet.description}
      balance={wallet.balance}
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
};

export default WalletsList;
