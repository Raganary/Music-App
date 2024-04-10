import React, { useState } from 'react';
import axios from 'axios';

const Registration = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get('http://localhost:8000/', {
        username,
        password
      });

      // Registration successful, display success message
      setSuccessMessage('Registration successful!');
    } catch (error) {
      // Registration failed, display error message
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <div>
      <h2>Registration Form</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" />
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
        {error && <p>{error}</p>}
        {successMessage && <p>{successMessage}</p>}
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Registration;
