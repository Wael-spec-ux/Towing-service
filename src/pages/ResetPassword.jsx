import { useState } from 'react';
import { useParams, useNavigate } from 'react-router';

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [status, setStatus] = useState('');
  const [message, setMessage] = useState('');
  localStorage.setItem('ResetPasswordToken', token); 
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirm) {
      setStatus('error');
      setMessage('Les mots de passe ne correspondent pas.');
      return;
    }
    setStatus('loading');
    try {
      const res = await fetch(`http://localhost:3000/reset-password/${token}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus('success');
        setTimeout(() => navigate('/login'), 2000);
      } else {
        setStatus('error');
        setMessage(data.message || 'Lien expiré ou invalide.');
      }
    } catch {
      setStatus('error');
      setMessage('Erreur de connexion au serveur.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4">
      <div className="bg-gray-900 border border-gray-700 rounded-2xl p-8 w-full max-w-md shadow-xl">
        <h2 className="text-2xl font-bold text-white mb-2">Nouveau mot de passe</h2>

        {status === 'success' ? (
          <div className="bg-green-900/40 border border-green-500 text-green-400 rounded-lg p-4 text-center">
            ✅ Mot de passe changé ! Redirection...
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <div>
              <label className="block text-sm text-gray-300 mb-1">Nouveau mot de passe</label>
              <input type="password" required value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
                placeholder="••••••••" />
            </div>
            <div>
              <label className="block text-sm text-gray-300 mb-1">Confirmer le mot de passe</label>
              <input type="password" required value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
                placeholder="••••••••" />
            </div>
            {status === 'error' && <p className="text-red-400 text-sm">{message}</p>}
            <button type="submit" disabled={status === 'loading'}
              className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition disabled:opacity-50">
              {status === 'loading' ? 'Enregistrement...' : 'Réinitialiser'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;