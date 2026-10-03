import { useState } from 'react';
import { api } from '../api';

export default function Login() {
  const [isRegister, setIsRegister] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'user' });
  const [error, setError] = useState('');

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    try {
      const data = await api(isRegister ? '/auth/register' : '/auth/login', 'POST', form);
      localStorage.setItem('token', data.token);
      localStorage.setItem('name', data.name);
      localStorage.setItem('role', data.role);
      window.location.href = '/dashboard';
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form className="card small" onSubmit={submit}>
      <h2>{isRegister ? 'Create Account' : 'Login'}</h2>
      {error && <p className="error">{error}</p>}

      {isRegister && (
        <input name="name" placeholder="Full name" onChange={change} required />
      )}
      <input name="email" type="email" placeholder="College email" onChange={change} required />
      <input name="password" type="password" placeholder="Password" onChange={change} required />
      {isRegister && (
        <select name="role" onChange={change}>
          <option value="user">Student / Staff</option>
          <option value="admin">IT Admin</option>
        </select>
      )}

      <button type="submit">{isRegister ? 'Register' : 'Login'}</button>
      <p className="link" onClick={() => setIsRegister(!isRegister)}>
        {isRegister ? 'Already have an account? Login' : 'New here? Create an account'}
      </p>
    </form>
  );
}
