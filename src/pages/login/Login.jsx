import { useState } from 'react';
import { useNavigate } from 'react-router';

import { signInAuthUserWithEmailAndPassword } from '../../firebase/config';

import CustomButton from '../../components/button/CustomButton';
import './login.scss';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await signInAuthUserWithEmailAndPassword(email, password);
      setEmail('');
      setPassword('');
      navigate('/notes');
    } catch (err) {
      alert('Log in failed');
    }
  };

  return (
    <form onSubmit={handleSubmit} className='login-form container'>
      <h2>Login</h2>
      <label>
        <span>Email:</span>
        <input
          type='email'
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
      </label>
      <label>
        <span>Password:</span>
        <input
          type='password'
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
      </label>
      <CustomButton>Submit</CustomButton>
    </form>
  );
}
