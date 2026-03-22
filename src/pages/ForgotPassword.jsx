import { useState } from 'react';
import { Link } from 'react-router';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState(''); // 'loading' | 'success' | 'error'
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('http://localhost:3000/requestPasswordReset', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus('success');
        setMessage('Un email de réinitialisation a été envoyé !');
      } else {
        setStatus('error');
        setMessage(data.message || 'Une erreur est survenue.');
      }
    } catch {
      setStatus('error');
      setMessage('Erreur de connexion au serveur.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4">
      <div className="bg-gray-900 border border-gray-700 rounded-2xl p-8 w-full max-w-md shadow-xl">
        <h2 className="text-2xl font-bold text-white mb-2">Mot de passe oublié</h2>
        <p className="text-gray-400 mb-6 text-sm">
          Entrez votre email et nous vous enverrons un lien de réinitialisation.
        </p>

        {status === 'success' ? (
          <div className="bg-green-900/40 border border-green-500 text-green-400 rounded-lg p-4 text-center">
            ✅ {message}
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
                placeholder="votre@email.com"
              />
            </div>
            {status === 'error' && (
              <p className="text-red-400 text-sm">{message}</p>
            )}
            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition disabled:opacity-50"
            >
              {status === 'loading' ? 'Envoi...' : 'Envoyer le lien'}
            </button>
          </form>
        )}

        <Link to="/login" className="block text-center text-sm text-gray-400 hover:text-white mt-4">
          ← Retour à la connexion
        </Link>
      </div>
    </div>
  );
};

export default ForgotPassword;