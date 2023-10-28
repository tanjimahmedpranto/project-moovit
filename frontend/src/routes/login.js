import React, { useState } from 'react';
import USERSSERVICE from '../constants';

const RegistrationPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegistration = async (e) => {
    e.preventDefault();

    // Send the registration request
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 'username': username, 'password': password })
    }
    const fetchURL = USERSSERVICE + "/register";
    const response = await fetch(fetchURL, requestOptions);

    // Handle response.
    if(response.status === 200){
      console.log("success");
    }else{
      console.log("error code: " + response.status);
    }
  };

  return (
    <div>
      <h2>Registration Page</h2>
      <form onSubmit={handleRegistration}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegistrationPage;
