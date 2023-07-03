// SignupForm.js

import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';

const SignupForm = () => {
  const [userData, setUserData] = useState({ username: '', email: '', password: '' });
  const [addUser] = useMutation(ADD_USER);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addUser({
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

export default SignupForm;
