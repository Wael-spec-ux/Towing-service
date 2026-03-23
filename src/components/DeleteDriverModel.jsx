import { useEffect } from "react";
 
// ─── Modal Component ───────────────────────────────────────────────
export function DeleteDriverModal({ isOpen, driverName, onConfirm, onCancel }) {
  // Close on Escape key
  useEffect(() => {
    const handleKey = (e) => { if (e.key === "Escape") onCancel(); };
    if (isOpen) window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, onCancel]);
 
  if (!isOpen) return null;
 
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700&display=swap');
 
        .dcm-overlay {
          position: fixed; inset: 0; z-index: 9999;
          background: rgba(10, 12, 18, 0.75);
          backdrop-filter: blur(6px);
          display: flex; align-items: center; justify-content: center;
          animation: dcm-fadeIn 0.2s ease;
        }
        @keyframes dcm-fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
 
        .dcm-card {
          font-family: 'Sora', sans-serif;
          background: #0f1117;
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 20px;
          padding: 36px 32px 28px;
          width: 100%; max-width: 420px;
          box-shadow: 0 32px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,80,80,0.08);
          animation: dcm-slideUp 0.25s cubic-bezier(.16,1,.3,1);
          position: relative; overflow: hidden;
        }
        @keyframes dcm-slideUp {
          from { opacity: 0; transform: translateY(24px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0)   scale(1);    }
        }
 
        /* red glow strip at top */
        .dcm-card::before {
          content: '';
          position: absolute; top: 0; left: 0; right: 0; height: 3px;
          background: linear-gradient(90deg, #ff3b3b, #ff6b6b, #ff3b3b);
          border-radius: 20px 20px 0 0;
        }
 
        .dcm-icon-wrap {
          width: 56px; height: 56px; border-radius: 16px;
          background: rgba(255, 59, 59, 0.12);
          border: 1px solid rgba(255, 59, 59, 0.25);
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 20px;
          font-size: 24px;
        }
 
        .dcm-title {
          color: #fff; font-size: 18px; font-weight: 700;
          margin: 0 0 10px; letter-spacing: -0.3px;
        }
 
        .dcm-body {
          color: #8b8fa8; font-size: 14px; line-height: 1.6;
          margin: 0 0 8px;
        }
 
        .dcm-driver {
          color: #e2e4f0; font-weight: 600;
        }
 
        .dcm-warning {
          margin-top: 16px; padding: 12px 14px;
          background: rgba(255, 180, 0, 0.07);
          border: 1px solid rgba(255, 180, 0, 0.18);
          border-radius: 10px;
          color: #f5c842; font-size: 12.5px;
          display: flex; align-items: center; gap: 8px;
        }
 
        .dcm-actions {
          display: flex; gap: 10px; margin-top: 24px;
        }
 
        .dcm-btn {
          flex: 1; padding: 12px 16px; border-radius: 12px;
          font-family: 'Sora', sans-serif;
          font-size: 14px; font-weight: 600; cursor: pointer;
          border: none; transition: all 0.18s ease;
        }
 
        .dcm-btn-cancel {
          background: rgba(255,255,255,0.06);
          color: #9da0b3;
          border: 1px solid rgba(255,255,255,0.08);
        }
        .dcm-btn-cancel:hover {
          background: rgba(255,255,255,0.1);
          color: #e2e4f0;
        }
 
        .dcm-btn-delete {
          background: linear-gradient(135deg, #ff3b3b, #cc1f1f);
          color: #fff;
          box-shadow: 0 4px 16px rgba(255, 59, 59, 0.3);
        }
        .dcm-btn-delete:hover {
          background: linear-gradient(135deg, #ff5555, #e02424);
          box-shadow: 0 6px 22px rgba(255, 59, 59, 0.45);
          transform: translateY(-1px);
        }
        .dcm-btn-delete:active {
          transform: translateY(0);
        }
      `}</style>
 
      {/* Backdrop — click to cancel */}
      <div className="dcm-overlay" onClick={onCancel}>
        <div className="dcm-card" onClick={e => e.stopPropagation()}>
 
          <div className="dcm-icon-wrap">🗑️</div>
 
          <h2 className="dcm-title">Supprimer le camion ?</h2>
 
          <p className="dcm-body">
            Vous êtes sur le point de supprimer cette Chauffeur:<span className="dcm-driver">{driverName}</span>.
            Cette action est irréversible.
          </p>
 
          <div className="dcm-warning">
            ⚠️ Toutes les données liées à ce chaufeur seront définitivement supprimées.
          </div>
 
          <div className="dcm-actions">
            <button className="dcm-btn dcm-btn-cancel" onClick={onCancel}>
              Annuler
            </button>
            <button className="dcm-btn dcm-btn-delete" onClick={onConfirm}>
              Oui, supprimer
            </button>
          </div>
 
        </div>
      </div>
    </>
  );
}