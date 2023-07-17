
  
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const Edit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Define state variables for the form inputs
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  // Fetch the contact details from the API and populate the form inputs
  useEffect(() => {
    fetchContact(id);
  }, [id]);

  const fetchContact = async () => {
    try {
      const response = await fetch(`http://localhost:5001/api/contacts/${id}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      setName(data.name);
      setEmail(data.email);
      setPhone(data.phone);
    } catch (error) {
      console.error('Error fetching contact details:', error);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateContact(id);
      navigate('/crud');
    } catch (error) {
      console.error('Error updating contact:', error);
    }
  };

  const updateContact = async (id) => {
    try {
      const response = await fetch(`http://localhost:5001/api/contacts/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
        body: JSON.stringify({ name, email, phone }),
      });
      const data = await response.json();
      console.log('Contact updated:', data);
    } catch (error) {
      console.error('Error updating contact:', error);
    }
  };

  const styles = {
    container: {
      margin: 'auto',
      width: '50%',
      padding: '20px',
      border: '1px solid #ccc',
      borderRadius: '5px',
    },
    label: {
      display: 'block',
      marginBottom: '10px',
    },
    input: {
      width: '100%',
      padding: '10px',
      marginBottom: '20px',
    },
    button: {
      backgroundColor: '#6495ED',
      color: '#fff',
      padding: '10px 20px',
      border: 'none',
      borderRadius: '5px',
      marginRight: '10px',
      cursor: 'pointer',
    },
  };

  return (
    <div style={styles.container}>
      <h2>Edit Contact</h2>
      <form onSubmit={handleFormSubmit}>
        <div>
          <label style={styles.label}>Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} style={styles.input} />
        </div>
        <div>
          <label style={styles.label}>Email:</label>
          <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} style={styles.input} />
        </div>
        <div>
          <label style={styles.label}>Phone:</label>
          <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} style={styles.input} />
        </div>
        <button type="submit" style={styles.button}>Update Contact</button>
      </form>
    </div>
  );
};

export default Edit;
