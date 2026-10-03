import { useState } from 'react';
import { api } from '../api';

export default function SubmitTicket() {
  const [form, setForm] = useState({ title: '', description: '' });
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    try {
      const ticket = await api('/tickets', 'POST', form);
      setResult(ticket);
      setForm({ title: '', description: '' });
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="card small">
      <h2>Raise a Support Ticket</h2>
      <form onSubmit={submit}>
        <input name="title" placeholder="Issue title (e.g. WiFi not working in Lab 2)"
          value={form.title} onChange={change} required />
        <textarea name="description" rows="5" placeholder="Describe the problem..."
          value={form.description} onChange={change} required />
        <button type="submit">Submit Ticket</button>
      </form>

      {error && <p className="error">{error}</p>}

      {result && (
        <div className="success">
          ✅ Ticket <b>{result.ticketId}</b> created.<br />
          Auto category: <b>{result.category}</b> | Auto priority: <b>{result.priority}</b>
        </div>
      )}
    </div>
  );
}
