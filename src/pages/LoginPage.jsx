import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();

  const [error, setError] = useState(null);

  const handleLogin = async (event) => {
    event.preventDefault();

    const data = {
      username: event.target.username.value,
      password: event.target.password.value,
    };

    try {
      const res = await axios.post('https://fakestoreapi.com/auth/login', data);
      navigate('/home');
    } catch (error) {
      console.error('Login error:', error);
      setError(error);
    }
  };

  return (
    <div className="flex h-screen justify-center items-center bg-slate-100">
      <form className="w-96 flex flex-col p-5 shadow-lg bg-white rounded-md" onSubmit={handleLogin}>
        <h1 className="text-3xl font-bold text-blue-900">Login Page</h1>
        <div className="mt-8">
          <label htmlFor="username">Username</label>
          <input type="text" id="username" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
        </div>
        <div className="mt-3">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
        </div>

        {error && <div className="text-red-500 text-sm">Incorrect Username / Password</div>}
        <button type="submit" className="btn mt-8 bg-blue-900 hover:bg-blue-700 text-white">
          Button
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
