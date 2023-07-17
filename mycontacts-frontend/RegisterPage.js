import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const RegisterPage = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e) => {

    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      alert('Please enter a valid email address');
      return;

    }
    try{
      console.log("HII")
    // Make a POST request to the register endpoint
    const response = await fetch('http://localhost:5001/api/users/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, email, password }),
      mode: 'cors', // Set the mode to 'cors'
    });

    if (response.error === 402){
      alert("Email already taken");
    }
    if (response.error === 400){
      alert("All fields are mandatory")
    }
  
    const data = await response.json();
    // Handle the response and perform any necessary actions
    console.log(data);
    navigate('/login');
  }
    catch (error) {
      console.log(error);
      alert('Registration failed. Please try again.');
    }

  };

  const styles = {
    registerPageContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
    },
    registerForm: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      width: '300px',
      padding: '20px',
      border: '1px solid #ccc',
      borderRadius: '5px',
    },
    formGroup: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      marginBottom: '10px',
    },
    label: {
      fontWeight: 'bold',
      marginBottom: '5px',
    },
    input: {
      width: '100%',
      padding: '10px',
      border: '1px solid #ccc',
      borderRadius: '3px',
      fontSize: '16px',
    },
    registerButton: {
      width: '100%',
      padding: '10px',
      backgroundColor: '#007bff',
      color: '#fff',
      border: 'none',
      borderRadius: '3px',
      cursor: 'pointer',
      fontSize: '16px',
      marginTop: '10px',
    },
    registerButtonHover: {
      backgroundColor: '#0056b3',
    },
  };

  return (
    <div style={styles.registerPageContainer}>
      <h2>Register</h2>
      <form style={styles.registerForm} onSubmit={handleRegister}>
        <div style={styles.formGroup}>
          <label style={styles.label} htmlFor="username">Username:</label>
          <input
            style={styles.input}
            type="text"
            id="username"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label} htmlFor="email">Email:</label>
          <input
            style={styles.input}
            type="email"
            id="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label} htmlFor="password">Password:</label>
          <input
            style={styles.input}
            type="password"
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          type="submit"
          style={styles.registerButton}
          onMouseOver={(e) => e.target.style.backgroundColor = styles.registerButtonHover.backgroundColor}
          onMouseOut={(e) => e.target.style.backgroundColor = styles.registerButton.backgroundColor}
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
