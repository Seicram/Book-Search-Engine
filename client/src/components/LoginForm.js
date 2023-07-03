// LoginForm.js

import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';

const LoginForm = () => {
  const [userData, setUserData] = useState({ email: '', password: '' });
  const [loginUser] = useMutation(LOGIN_USER);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await loginUser({
        variables: { ...userData },
      });
      // Handle success
    } catch (err) {
      console.error(err);
      // Handle error
    }
  };

  // Rest of the component code
};

export default LoginForm;
