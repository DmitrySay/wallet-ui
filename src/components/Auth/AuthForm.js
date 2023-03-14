import React, { useEffect, useRef } from 'react';
import classes from './AuthForm.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { userLogin } from '../../redux/auth-actions';
import { useHistory } from 'react-router-dom';

const AuthForm = () => {
  const { loading, error, userToken } = useSelector((state) => state.auth);
  const history = useHistory();
  const dispatch = useDispatch();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  useEffect(() => {
    if (userToken) {
      history.push('/');
    }
  }, [userToken]);

  const submitHandler = (event) => {
    event.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    const data = {
      email: enteredEmail,
      password: enteredPassword,
    };
    dispatch(userLogin(data));
  };

  return (
    <section className={classes.auth}>
      <h1>Login</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" required ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input
            type="password"
            id="password"
            required
            ref={passwordInputRef}
          />
        </div>
        <div className={classes.actions}>
          {!loading && (
            <button>Login</button>
          )}
          {loading && <p>Sending request...</p>}
          {error && <p>Authentication failed!</p>}
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
