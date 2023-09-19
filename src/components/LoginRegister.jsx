import React, { useState } from 'react';
import { useRegisterMutation, useLoginMutation } from '../reducers/api.js';

const LoginRegister = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [register] = useRegisterMutation();
  const [login] = useLoginMutation();

  const handleRegister = async () => {
    try {
      const result = await register({ username, password });
      console.log('Register success:', result);
    } catch (error) {
      console.log('Register failed:', error);
    }
    setSuccessMessage('Registered successfully!');
    setTimeout(() => setSuccessMessage(''), 2000);
    setUsername('');
    setPassword('');
  };

  const handleLogin = async () => {
    try {
      const result = await login({ username, password });
      console.log('Login success:', result);
    } catch (error) {
      console.log('Login failed:', error);
    }
    setSuccessMessage('Logged in successfully!');
    setTimeout(() => setSuccessMessage(''), 2000);
    setUsername('');
    setPassword('');
  };

  return (
    <div>
        <div className='inputContain'>
            <input
            className='input'
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            />
            <input
            className='input'
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />
            <button className='butt' onClick={handleRegister}>Register</button>
            <button className='butt' onClick={handleLogin}>Login</button>
      </div>
      <div>
        {successMessage && <div className="success-alert">{successMessage}</div>}
      </div>
    </div>
  );
};

export default LoginRegister;

