

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const CRUD = () => {
  const navigate = useNavigate();

  const [contacts, setContacts] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    const userId = localStorage.getItem('userId');

    try {
      const response = await fetch('http://localhost:5001/api/contacts/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      });
      const data = await response.json();
      console.log('Contacts fetched:', data);
      setContacts(data);
    } catch (error) {
      console.error('Error fetching contacts:', error);
    }
  };

  const createContact = async () => {
    try {
      console.log('Creating contact...');
      const userId = localStorage.getItem('userId');
      console.log(userId);
      const response = await fetch('http://localhost:5001/api/contacts/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
        body: JSON.stringify({ name, email, phone, userId }),
        mode: 'cors',
      });
      const data = await response.json();
      console.log('Contact created:', data);
      fetchContacts();
      clearForm();
    } catch (error) {
      console.error('Error creating contact:', error);
    }
  };

  const deleteContact = async (id) => {
    console.log('made it here');
    try {
      await fetch(`http://localhost:5001/api/contacts/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      });
      console.log('Contact deleted:', id);
      fetchContacts();
    } catch (error) {
      console.error('Error deleting contact:', error);
    }
  };

  const handleCreateContact = (e) => {
    e.preventDefault();
    if (!name || !email || !phone) {
      alert('All fields are mandatory');
      return;
    }
    createContact();
  };

  const clearForm = () => {
    setName('');
    setEmail('');
    setPhone('');
  };

  const handleDeleteContact = (id) => {
    if (window.confirm('Are you sure you want to delete this contact?')) {
      deleteContact(id);
    }
  };

  const handleEditContact = (contact) => {
    navigate(`/edit/${contact._id}`);
  };

  const handleLogout = async () => {
    console.log('here')
    // const userId = localStorage.getItem('userId');
    const accessToken = localStorage.getItem('accessToken');
    try {
      // Make a request to the logout API endpoint
      const response = await fetch('http://localhost:5001/api/users/logout', {
        method: 'POST',
        credentials: 'include', // Include cookies in the request
        headers: {
          'Content-Type': 'application/json',
          // Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    
         },
         body: JSON.stringify({accessToken}),

      });
      console.log("hi")
  
      // Clear local storage or perform any other necessary logout actions
      localStorage.clear();

      if (response.ok) {
        // Logout successful
        // Perform any necessary client-side cleanup, such as clearing local storage or resetting user state
        console.log('Logout successful');
        navigate('/login');
      } else {
        console.log(response.error);
        // navigate('/login');

        // Handle any errors or display an appropriate error message
        console.error('Logout failed');
  
      // Redirect back to the home page
      
      } 
    } 
    catch (error) {
      console.error('Error logging out:', error);
    }
  };
  
  

  const styles = {
    container: {
      padding: '20px',
    },
    heading: {
      fontSize: '24px',
      marginBottom: '16px',
    },
    form: {
      marginBottom: '16px',
    },
    formGroup: {
      marginBottom: '16px',
    },
    label: {
      display: 'block',
      marginBottom: '8px',
    },
    input: {
      width: '100%',
      padding: '8px',
      fontSize: '16px',
    },
    button: {
      padding: '8px 16px',
      backgroundColor: '#4caf50',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      marginRight: '8px',
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
    },
    th: {
      backgroundColor: '#f2f2f2',
      padding: '8px',
    },
    td: {
      padding: '8px',
      borderBottom: '1px solid #ddd',
      textAlign: 'center',

    },
    actions: {
      display: 'flex',
      gap: '8px',
      justifyContent: 'center',
    },
    editButton:{
      padding: '8px 16px',
      backgroundColor: '#6495ED',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      margin: '0 4px',
      fontSize: '14px',
    },
    deleteButton: {
      padding: '8px 16px',
      backgroundColor: '#FF6961',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      margin: '0 4px',
      fontSize: '14px',
    },

    logoutButton: {
      backgroundColor: 'gray',
      color: 'white',
      padding: '8px 16px',
      border: 'none',
      cursor: 'pointer',
      marginTop: '20px',
      borderRadius: '5px'
    },
    
  
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Contacts</h2>
      <form style={styles.form} onSubmit={handleCreateContact}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} style={styles.input} />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Email:</label>
          <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} style={styles.input} />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Phone:</label>
          <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} style={styles.input} />
        </div>
        <button type="submit" style={styles.button}>
          Add Contact
        </button>
      </form>
      {contacts.length > 0 ? (

      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Name</th>
            <th style={styles.th}>Email</th>
            <th style={styles.th}>Phone</th>
            <th style={styles.th}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact) => (
            <tr key={contact._id}>
              <td style={styles.td}>{contact.name}</td>
              <td style={styles.td}>{contact.email}</td>
              <td style={styles.td}>{contact.phone}</td>
              <td style={styles.td}>
              <div style={styles.actions}>
              <button style={styles.editButton} onClick={() => handleEditContact(contact)}>Edit</button>
              <button style={styles.deleteButton} onClick={() => handleDeleteContact(contact._id)}>Delete</button>
              </div>
              </td>
              </tr>
          ))}
          </tbody>
          </table>
           ) : (
            <p>No contacts found.</p>
          )}
          <button onClick={handleLogout} style={styles.logoutButton}>
              Logout
          </button>
          </div>
          );
       };

export default CRUD;

