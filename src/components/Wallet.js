import WalletForm from './WalletForm';
import classes from './Wallet.module.css';
import { addAmountToWalletApi, removeAmountFromWalletApi } from '../api/requests/wallet';

const Wallet = ({ id, name, balance, description, fetchWallets = () => {} }) => {

  const addToHandler = amount => {
    const addToWallet = async (amount) => {
      const request = {
        walletId: id,
        amount: amount,
      };
      const { data } = await addAmountToWalletApi(request);
    };
    addToWallet(amount)
      .then(fetchWallets);
  };

  const removeHandler = amount => {
    const removeFromWallet = async (amount) => {
      const request = {
        walletId: id,
        amount: amount,
      };
      const { data } = await removeAmountFromWalletApi(request);
    };
    removeFromWallet(amount)
      .then(fetchWallets);
  };

  return (
    <li className={classes.wallet}>
      <div>
        <h3>{name}</h3>
        <div className={classes.description}>{description}</div>
        <div className={classes.balance}>Balance: {balance}</div>
      </div>
      <div>
        <WalletForm onAdd={addToHandler} onRemove={removeHandler} />
      </div>
    </li>
  );
};

export default Wallet;
