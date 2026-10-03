import { Routes, Route, Navigate, Link, useNavigate } from 'react-router-dom';
import Login from './pages/Login';
import SubmitTicket from './pages/SubmitTicket';
import Dashboard from './pages/Dashboard';

export default function App() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const name = localStorage.getItem('name');

  const logout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <>
      <nav className="navbar">
        <h2>🛠 IT Service Desk</h2>
        {token && (
          <div>
            <Link to="/submit">New Ticket</Link>
            <Link to="/dashboard">Dashboard</Link>
            <span className="hello">Hi, {name}</span>
            <button onClick={logout}>Logout</button>
          </div>
        )}
      </nav>

      <div className="container">
        <Routes>
          <Route path="/" element={token ? <Navigate to="/dashboard" /> : <Login />} />
          <Route path="/submit" element={token ? <SubmitTicket /> : <Navigate to="/" />} />
          <Route path="/dashboard" element={token ? <Dashboard /> : <Navigate to="/" />} />
        </Routes>
      </div>
    </>
  );
}
