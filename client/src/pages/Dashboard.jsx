import { useEffect, useState } from 'react';
import { api } from '../api';

export default function Dashboard() {
  const [tickets, setTickets] = useState([]);
  const isAdmin = localStorage.getItem('role') === 'admin';

  const load = () => api('/tickets').then(setTickets).catch(console.log);
  useEffect(() => { load(); }, []);

  // Admin: update status or reply
  const update = async (t, changes) => {
    await api('/tickets/' + t._id, 'PUT', { status: t.status, reply: t.reply, ...changes });
    load();
  };

  const count = (s) => tickets.filter((t) => t.status === s).length;

  return (
    <div>
      <h2>{isAdmin ? 'All Tickets' : 'My Tickets'}</h2>

      <div className="stats">
        <div className="stat">Total<br /><b>{tickets.length}</b></div>
        <div className="stat">Open<br /><b>{count('Open')}</b></div>
        <div className="stat">In Progress<br /><b>{count('In Progress')}</b></div>
        <div className="stat">Resolved<br /><b>{count('Resolved')}</b></div>
      </div>

      {tickets.length === 0 && <p>No tickets yet.</p>}

      {tickets.map((t) => (
        <div className="card ticket" key={t._id}>
          <div className="row">
            <b>{t.ticketId} – {t.title}</b>
            <span className={'badge ' + t.priority}>{t.priority}</span>
          </div>
          <p>{t.description}</p>
          <small>
            Category: {t.category} | By: {t.createdBy?.name} | {new Date(t.createdAt).toLocaleDateString()}
          </small>

          {isAdmin ? (
            <div className="admin-box">
              <select value={t.status} onChange={(e) => update(t, { status: e.target.value })}>
                <option>Open</option>
                <option>In Progress</option>
                <option>Resolved</option>
              </select>
              <input placeholder="Type a reply and press Enter" defaultValue={t.reply}
                onKeyDown={(e) => e.key === 'Enter' && update(t, { reply: e.target.value })} />
            </div>
          ) : (
            <p>Status: <b>{t.status}</b> {t.reply && <><br />IT reply: {t.reply}</>}</p>
          )}
        </div>
      ))}
    </div>
  );
}
