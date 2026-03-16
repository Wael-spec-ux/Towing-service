import { useState, useEffect } from "react";
import { Truck, Shield, Eye, EyeOff, ChevronRight, AlertCircle, User } from "lucide-react";
import { AdminLogin, DriverLogin } from "../api/LoginAPI";
import { useNavigate } from "react-router";
// ── Mock credentials ──────────────────────────────────────────────────────────
const CREDENTIALS = {
  admin: [{ email: "admin@topdepannage.com", password: "admin123", name: "Administrateur" }],
  driver: [
    { email: "ali@topdepannage.com", password: "driver123", name: "Ali Ben Salah", id: "DRV-001" },
    { email: "hichem@topdepannage.com", password: "driver123", name: "Hichem Boukadida", id: "DRV-002" },
  ],
};

// ── Animated background dots ──────────────────────────────────────────────────
const GridDots = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <div
      className="absolute inset-0 opacity-[0.03]"
      style={{
        backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
        backgroundSize: "32px 32px",
      }}
    />
  </div>
);

// ── Floating particles ────────────────────────────────────────────────────────


export default function LoginPage({ onLogin }) {
  const [role, setRole] = useState(null); // null | "admin" | "driver"
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setTimeout(() => setMounted(true), 50);
  }, []);

  const handleRoleSelect = (r) => {
    setRole(r);
    setEmail("");
    setPassword("");
    setError("");
  };
const navigate = useNavigate();
const handleLogin = async () => {
  setError("");
  if (!email.trim() || !password.trim()) {
    setError("Veuillez remplir tous les champs.");
    return;
  }
  setLoading(true);
  try {
    const result = role === "admin"
      ? await AdminLogin({ email, password })
      : await DriverLogin({ email, password });

    onLogin?.({ role, ...result });
    navigate(role === "admin" ? "/AdminDashboard" : "/DriverDashboard");
  } catch {
    setError("Email ou mot de passe incorrect.");
  } finally {
    setLoading(false);
  }
};

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleLogin();
  };

  // ── Role-selection screen ────────────────────────────────────────────────
  if (!role) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4 relative overflow-hidden">
        <GridDots />

        {/* Ambient glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-sky-600/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-blue-800/10 rounded-full blur-[80px] pointer-events-none" />

        <div
          className="relative z-10 w-full max-w-md"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.6s ease, transform 0.6s ease",
          }}
        >
          {/* Logo */}
          <div className="flex flex-col items-center mb-10">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-sky-500 to-blue-700 flex items-center justify-center shadow-xl shadow-sky-500/25 mb-4">
              <Truck className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-black text-white tracking-tight">Top Dépannage</h1>
            <p className="text-gray-500 text-sm mt-1 tracking-wide uppercase">Portail d'accès sécurisé</p>
          </div>

          {/* Role cards */}
          <p className="text-center text-gray-400 text-sm mb-6">Choisissez votre rôle pour continuer</p>

          <div className="grid grid-cols-2 gap-4">
            {/* Admin card */}
            <button
              onClick={() => handleRoleSelect("admin")}
              className="group relative overflow-hidden rounded-2xl border border-gray-700/60 bg-gray-900 p-6 text-left hover:border-sky-500/50 hover:bg-gray-800/80 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-sky-500/10"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-sky-600/0 to-sky-600/0 group-hover:from-sky-600/5 group-hover:to-blue-600/10 transition-all duration-300" />
              <div className="relative">
                <div className="w-12 h-12 rounded-xl bg-sky-500/15 border border-sky-500/25 flex items-center justify-center mb-4 group-hover:bg-sky-500/25 transition-colors">
                  <Shield className="w-6 h-6 text-sky-400" />
                </div>
                <div className="font-bold text-white text-lg mb-1">Admin</div>
                <div className="text-xs text-gray-500 leading-relaxed">Gestion des réservations, chauffeurs et camions</div>
                <div className="mt-4 flex items-center text-sky-400 text-xs font-semibold">
                  Connexion <ChevronRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </button>

            {/* Driver card */}
            <button
              onClick={() => handleRoleSelect("driver")}
              className="group relative overflow-hidden rounded-2xl border border-gray-700/60 bg-gray-900 p-6 text-left hover:border-emerald-500/50 hover:bg-gray-800/80 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-emerald-500/10"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/0 to-emerald-600/0 group-hover:from-emerald-600/5 group-hover:to-teal-600/10 transition-all duration-300" />
              <div className="relative">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/15 border border-emerald-500/25 flex items-center justify-center mb-4 group-hover:bg-emerald-500/25 transition-colors">
                  <User className="w-6 h-6 text-emerald-400" />
                </div>
                <div className="font-bold text-white text-lg mb-1">Chauffeur</div>
                <div className="text-xs text-gray-500 leading-relaxed">Vos missions, camion assigné et signalements</div>
                <div className="mt-4 flex items-center text-emerald-400 text-xs font-semibold">
                  Connexion <ChevronRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </button>
          </div>

          {/* Footer note */}
          <p className="text-center text-gray-600 text-xs mt-8">
            © 2026 Top Dépannage — Ben Arous
          </p>
        </div>
      </div>
    );
  }

  // ── Login form screen ────────────────────────────────────────────────────
  const isAdmin = role === "admin";
  const accentFrom = isAdmin ? "from-sky-500" : "from-emerald-500";
  const accentTo   = isAdmin ? "to-blue-700"  : "to-teal-700";
  const ringColor  = isAdmin ? "focus:ring-sky-500" : "focus:ring-emerald-500";
  const btnColor   = isAdmin
    ? "bg-sky-600 hover:bg-sky-500 shadow-sky-500/25"
    : "bg-emerald-600 hover:bg-emerald-500 shadow-emerald-500/25";
  const glowColor  = isAdmin ? "bg-sky-600/10" : "bg-emerald-600/10";
  const badgeBg    = isAdmin ? "bg-sky-500/15 border-sky-500/30 text-sky-400" : "bg-emerald-500/15 border-emerald-500/30 text-emerald-400";
  const RoleIcon   = isAdmin ? Shield : User;



  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4 relative overflow-hidden">
      <GridDots />

      {/* Ambient glow */}
      <div className={`absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[250px] ${glowColor} rounded-full blur-[100px] pointer-events-none`} />

      <div
        className="relative z-10 w-full max-w-sm"
        style={{
          opacity: mounted ? 1 : 0,
          transform: mounted ? "translateY(0)" : "translateY(24px)",
          transition: "opacity 0.5s ease, transform 0.5s ease",
        }}
      >
        {/* Back button */}
        <button
          onClick={() => setRole(null)}
          className="flex items-center gap-2 text-gray-500 hover:text-gray-300 text-sm mb-8 transition-colors group"
        >
          <ChevronRight className="w-4 h-4 rotate-180 group-hover:-translate-x-0.5 transition-transform" />
          Retour
        </button>

        {/* Header */}
        <div className="flex flex-col items-center mb-8">
          <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${accentFrom} ${accentTo} flex items-center justify-center shadow-xl mb-4`}
            style={{ boxShadow: isAdmin ? "0 20px 40px rgba(14,165,233,0.25)" : "0 20px 40px rgba(16,185,129,0.25)" }}
          >
            <RoleIcon className="w-8 h-8 text-white" />
          </div>

          <div className="flex items-center gap-2 mb-2">
            <h2 className="text-2xl font-black text-white tracking-tight">
              {isAdmin ? "Espace Admin" : "Espace Chauffeur"}
            </h2>
          </div>

          <span className={`text-xs px-3 py-1 rounded-full border font-medium ${badgeBg}`}>
            {isAdmin ? "Accès Administrateur" : "Accès Chauffeur"}
          </span>
        </div>

        {/* Card */}
        <div className="bg-gray-900 border border-gray-700/60 rounded-2xl p-6 shadow-2xl">

          {/* Error */}
          {error && (
            <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm mb-5">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              {error}
            </div>
          )}

          {/* Email */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-300 mb-2">Adresse Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setError(""); }}
              onKeyDown={handleKeyDown}
              placeholder={isAdmin ? "admin@topdepannage.com" : "chauffeur@topdepannage.com"}
              className={`w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:ring-2 ${ringColor} focus:border-transparent text-sm transition-all`}
            />
          </div>

          {/* Password */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-300 mb-2">Mot de Passe</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(""); }}
                onKeyDown={handleKeyDown}
                placeholder="••••••••"
                className={`w-full px-4 py-3 pr-12 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:ring-2 ${ringColor} focus:border-transparent text-sm transition-all`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-500 hover:text-gray-300 transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            onClick={handleLogin}
            disabled={loading}
            className={`w-full py-3 rounded-xl font-semibold text-white transition-all duration-200 shadow-lg flex items-center justify-center gap-2 ${btnColor} disabled:opacity-60 disabled:cursor-not-allowed`}
          >
            {loading ? (
              <>
                <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                </svg>
                Connexion…
              </>
            ) : (
              <>
                Se connecter
                <ChevronRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>



        <p className="text-center text-gray-700 text-xs mt-6">© 2026 Top Dépannage — Ben Arous</p>
      </div>
    </div>
  );
}