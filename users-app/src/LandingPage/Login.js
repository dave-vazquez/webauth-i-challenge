import React, { useState } from 'react';
import axios from 'axios';

const defaultForm = {
  username: '',
  passwordGuess: ''
};

const api = `https://lambda-users.herokuapp.com/api`;

const Login = () => {
  const [form, setForm] = useState(defaultForm);
  const [username, setUsername] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  const handleChange = e => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    axios
      .post(`${api}/login`, form)
      .then(res => {
        setLoggedIn(true);
        setUsername(form.username);
      })
      .catch(err => {
        console.log(err.response.data);
      });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          name='username'
          placeholder='Username'
          value={form.username}
          onChange={handleChange}
        />
        <input
          type='password'
          name='passwordGuess'
          placeholder='Password'
          value={form.password}
          onChange={handleChange}
        />
        <button type='submit'>Login</button>
      </form>
      {loggedIn && <h1>{form.username}</h1>}
    </>
  );
};

export default Login;
