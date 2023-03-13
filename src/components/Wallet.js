import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import WalletForm from './WalletForm';
import classes from './Wallet.module.css';
import { Box, Button, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import Input from './Input';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import {
  addAmountToWalletAction,
  removeAmountFromWalletAction,
  transferAmountWalletAction,
} from '../redux/wallets-actions';

const Wallet = ({ id, name, balance, description }) => {

  const dispatch = useDispatch();
  const wallets = useSelector((state) => state.wallet.wallets);

  const [openTransferModal, setOpenTransferModal] = useState(false);
  const [walletIdFrom, setWalletIdFrom] = React.useState('');
  const [walletIdTo, setWalletIdTo] = React.useState('');
  const inputRef = useRef();

  const addToHandler = amount => {
    const data = {
      walletId: id,
      amount: amount,
    };
    dispatch(addAmountToWalletAction(data));
  };

  const removeHandler = amount => {
    const data = {
      walletId: id,
      amount: amount,
    };
    dispatch(removeAmountFromWalletAction(data));
  };

  const handleWalletFromChange = (event) => {
    setWalletIdFrom(event.target.value);
  };

  const handleWalletToChange = (event) => {
    setWalletIdTo(event.target.value);
  };

  const submitTransferHandler = () => {
    const data = {
      walletIdFrom,
      walletIdTo,
      amount: inputRef.current.value,
    };
    dispatch(transferAmountWalletAction(data))
      .then(setOpenTransferModal(false));
  };

  const menuItemsFrom = wallets.filter(wallet => wallet.id === id).map((wallet) => (
    <MenuItem
      key={wallet.id}
      value={wallet.id}>
      {wallet.name}
    </MenuItem>
  ));

  const menuItemsTo = wallets.filter(wallet => wallet.id !== id).map((wallet) => (
    <MenuItem
      key={wallet.id}
      value={wallet.id}>
      {wallet.name}
    </MenuItem>
  ));

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
      <div>

        <Dialog open={openTransferModal} onClose={() => setOpenTransferModal(false)}>
          <DialogTitle>Transfer from/to Wallet</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Select wallets:
            </DialogContentText>
            <Box sx={{ minWidth: 100 }}>
              <FormControl fullWidth>
                <InputLabel id="from-label">From</InputLabel>
                <Select
                  labelId="from-label"
                  id="walletFrom"
                  value={walletIdFrom}
                  label="From"
                  onChange={handleWalletFromChange}
                >
                  {menuItemsFrom}
                </Select>
              </FormControl>
            </Box>
            <Box sx={{ minWidth: 100 }}>
              <FormControl fullWidth>
                <InputLabel id="to-label">To</InputLabel>
                <Select
                  labelId="to-label"
                  id="walletTo"
                  value={walletIdTo}
                  label="From"
                  onChange={handleWalletToChange}
                >
                  {menuItemsTo}
                  })}
                </Select>
              </FormControl>
            </Box>
            <Input
              ref={inputRef}
              label="Amount"
              input={{
                id: 'amount',
                type: 'number',
                min: '-1000',
                max: '1000',
                step: '0.01',
                defaultValue: '1',
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenTransferModal(false)}>Cancel</Button>
            <Button onClick={submitTransferHandler}>Transfer</Button>
          </DialogActions>
        </Dialog>

        <Button
          size="small"
          startIcon={<CreditCardIcon />}
          onClick={() => setOpenTransferModal(true)}
        >
          Transfer
        </Button>
      </div>
    </li>
  );
};

export default Wallet;
