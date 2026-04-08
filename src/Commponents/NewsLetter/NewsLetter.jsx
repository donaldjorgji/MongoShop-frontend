import React, { useState } from 'react';
import './NewsLetter.css';

const NewsLetter = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState(false);

  // Funksion për validimin e email-it
  const isValidEmail = (email) =>/^[a-zA-Z0-9._%+-]{2,}@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);

  const handleSubscribe = () => {
    if (!isValidEmail(email)) {
      setMessage('Email nuk është i saktë');
      setError(true);
    } else {
      setMessage('Faleminderit! Ju jeni bërë pjesë e komunitetit tonë.');
      setError(false);
      setEmail(''); // pastro input-in
    }
  };

  return (
    <div className='newsletter'>
      <h1>Njoftohuni per cdo te re ne email-in tuaj!</h1>
      <p>Regjistrohuni per te mare ofertate me te fundit!</p>
      <div>
        <input
          type="email"
          placeholder='Your email id'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button onClick={handleSubscribe}>Regjistrohu</button>
      </div>
      {message && (
        <p style={{ color: error ? 'red' : 'green', marginTop: '10px' }}>
          {message}
        </p>
      )}
    </div>
  );
};

export default NewsLetter;