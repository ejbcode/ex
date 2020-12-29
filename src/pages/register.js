import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { isEmail } from 'validator';
import loginBg from '../assets/loginBG.jpg';
import logoImg from '../assets/logo.png';
import logoGoogle from '../assets/logogoogle.png';
import { useForm } from '../components/helpers/useForm';
import {
  logWithGoogle,
  setErrorMessage,
  signUpWithEmailPasswordName,
} from '../components/redux/actions/authAction';

const LoginStyle = styled.div`
  width: 100vw;
  height: 100vh;
  position: center center;
  background: linear-gradient(
      rgba(20, 20, 20, 0.7) 0%,
      rgba(20, 20, 20, 0.7) 100%
    ),
    url(${loginBg});

  background-size: cover;
  display: flex;
  flex-direction: column;
  .logo {
    margin: 1.2rem;
  }

  .login {
    margin: 0 auto;
    min-width: 400px;
    background: rgba(0, 0, 0, 0.7);
    border-radius: 0.8rem;
    padding: 6rem 6rem 10rem;
    min-height: 330px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .title {
    margin-bottom: 1rem;
    font-size: 2.5rem;
    color: #fff;
  }
  .group {
    position: relative;
    z-index: 10;
    display: -webkit-box;
    display: flex;
  }
  .group__label {
    position: absolute;
    z-index: 150;
    color: #b3b3b3;
    font-size: 1.3rem;
    top: 20%;
    left: 18px;
    transition: all 300ms ease-in;
    pointer-events: none;
  }
  .group__input {
    width: 100%;
    position: relative;
    z-index: 100;
    background: #333;
    margin-bottom: 20px;
    border-radius: 4px;
    border: none;
    opacity: 1;
    font-size: 1.5rem;
    color: #fff;
    line-height: 2.2;
    padding: 12px 18px 0;
  }
  .group__input:focus + .group__label,
  .group__input:valid + .group__label {
    top: 0.5rem;

    font-size: 0.8rem;
  }
  button {
    margin: 24px 0 12px;
    padding: 16px;
    color: #fff;
    background: #e50914;
    font-size: 1.3rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  .cta {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
  }
  .cta__text {
    font-size: 1.3rem;
    color: #b3b3b3;
    text-decoration: none;
    display: flex;
    align-items: center;
  }
  .cta__text--need-help {
    transition: all 0.3s ease-in;
  }
  .cta__text--need-help:hover {
    text-decoration: underline;
  }

  .logo-google {
    width: 20px;
    margin-right: 1rem;
  }

  p {
    margin: 0;
    padding: 0;
    font-size: 1.5rem;
  }
  span {
    font-weight: 700;
  }

  a {
    color: white;
  }

  .error-message {
    color: orange;
  }
`;

// /* eslint-disable */

export const Register = () => {
  const dispatch = useDispatch();
  const { errorMessage } = useSelector((state) => state.auth);
  const { formValues, handleInputChange } = useForm({
    name: 'jose bermudez',
    email: 'josebermudez@gmail.com',
    password: '12345678',
    password2: '12345678',
  });

  const { name, email, password, password2 } = formValues;

  const handleGoogleClick = () => {
    dispatch(logWithGoogle());
  };

  const isFormValid = () => {
    if (name.trim().length === 0) {
      dispatch(setErrorMessage('Name is required'));
      return false;
    }
    if (!isEmail(email)) {
      dispatch(setErrorMessage('This not a valid Email'));
      return false;
    }
    if (password.length < 5) {
      dispatch(setErrorMessage('Password should have at least 6 digits'));
      return false;
    }
    if (password !== password2) {
      dispatch(setErrorMessage('Password confirmation does not match'));
      return false;
    }
    dispatch(setErrorMessage(null));

    return true;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isFormValid()) {
      dispatch(signUpWithEmailPasswordName(name, email, password));
    }
  };

  /* eslint-disable */

  return (
    <>
      <LoginStyle>
        <div className="logo">
          <img src={logoImg} alt="" />
        </div>
        <form className="login" onSubmit={handleSubmit} noValidate>
          {/* <h1>{name}</h1> */}
          <h2 className="title">Register</h2>
          <div className="group">
            <input
              id="name"
              name="name"
              className="group__input"
              type="text"
              required
              value={name}
              onChange={handleInputChange}
            />
            <label htmlFor="name" className="group__label">
              Name
            </label>
          </div>
          <div className="group">
            <input
              id="email"
              name="email"
              className="group__input"
              type="email"
              required
              value={email}
              onChange={handleInputChange}
            />
            <label htmlFor="email" className="group__label">
              Email or phone number
            </label>
          </div>
          <div className="group">
            <input
              className="group__input"
              name="password"
              type="password"
              required
              id="password"
              value={password}
              onChange={handleInputChange}
            />
            <label htmlFor="password" className="group__label">
              Password
            </label>
          </div>
          <div className="group">
            <input
              className="group__input"
              type="password2"
              required
              id="password2"
              name="password2"
              value={password2}
              onChange={handleInputChange}
            />
            <label htmlFor="password2" className="group__label">
              Password
            </label>
          </div>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <button type="submit">Sign up</button>
          <div className="cta">
            <a className="cta__text" href="#">
              Remember me
            </a>
            <a className="cta__text cta__text--need-help" href="#">
              Need help?
            </a>
          </div>
          <div className="cta">
            <a className="cta__text" href="#" onClick={handleGoogleClick}>
              <img className="logo-google" src={logoGoogle} alt="" />{' '}
              <p> Login with Google</p>
            </a>
          </div>
          <p>
            Have you already have an account?
            <span>
              <Link to="/auth/"> Sign in </Link>
            </span>
          </p>
        </form>
      </LoginStyle>
    </>
  );
};
