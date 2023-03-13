import React, { useRef, useState } from 'react';
import Input from './Input';
import classes from './WalletForm.module.css';

const WalletForm = (props) => {

  const [amountIsValid, setAmountIsValid] = useState(true);
  const amountInputRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();
    const enteredAmount = amountInputRef.current.value;
    const enteredAmountNumber = +enteredAmount;

    if (
      enteredAmount.trim().length === 0 ||
      enteredAmountNumber < -1000 ||
      enteredAmountNumber > 1000
    ) {
      setAmountIsValid(false);
      return;
    }
    if (enteredAmount > 0) {
      props.onAdd(enteredAmountNumber);
    } else {
      props.onRemove(Math.abs(enteredAmountNumber));
    }

  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input
        ref={amountInputRef}
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
      <button>Add +/-</button>
      {!amountIsValid && <p>Please enter a valid amount (-1000 to 1000).</p>}
    </form>
  );
};

export default WalletForm;
