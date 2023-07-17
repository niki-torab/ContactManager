import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const handleRegister = () => {
    navigate('/register');
  };

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
        try {
      const response = await fetch('http://localhost:5001/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
        mode: 'cors', // Set the mode to 'cors'

      });
      
      const data = await response.json();
      console.log(data);


      
      // Store the JWT in local storage or state for subsequent requests
      const accessToken = data.accessToken;
      const userId = data.userId;
      console.log(accessToken);
      
      // Example of storing in local storage:
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('userId', userId);


      navigate('/crud');


      // Handle successful login, such as redirecting to a protected route
    } catch (error) {
      console.error('Error logging in:', error);
      // Handle login error, such as displaying an error message

    }
    // ... handle login logic
  };

  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
    },
    heading: {
      fontSize: '24px',
      marginBottom: '16px',
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    label: {
      marginBottom: '8px',
    },
    inputWrapper: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '16px',
    },
    inputLabel: {
      minWidth: '80px',
    },
    input: {
      flex: '1',
      padding: '8px',
    },
    buttonContainer: {
      display: 'flex',
      gap: '8px',
      marginLeft: '75px', // Add margin-left to move the buttons to the right
    },
    loginButton: {
      padding: '8px 16px',
      backgroundColor: '#4caf50',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
    },
    registerButton: {
      padding: '8px 16px',
      backgroundColor: 'blue',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Login</h2>
      <form style={styles.form} onSubmit={handleLogin}>
        <div style={styles.inputWrapper}>
          <label style={styles.inputLabel}>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
          />
        </div>
        <div style={styles.inputWrapper}>
          <label style={styles.inputLabel}>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
          />
        </div>
        <div style={styles.buttonContainer}>
          <button type="submit" style={styles.loginButton}>
            Login
          </button>
          <button onClick={handleRegister} style={styles.registerButton}>
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
