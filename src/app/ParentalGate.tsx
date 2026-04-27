import React, { useState } from 'react';
import { useParentAuthStore } from '../core/state/parent-store';

export function ParentalGate({ children, onCancel }: { children: React.ReactNode, onCancel?: () => void }) {
  const { isAuthenticated, login } = useParentAuthStore();
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');

  if (isAuthenticated) {
    return <>{children}</>;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Default PIN is 1234 for testing purposes
    if (pin === '1234') {
      login(pin);
    } else {
      setError('PIN salah!');
      setPin('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm px-4">
      <div className="bg-white rounded-3xl p-8 w-full max-w-sm shadow-2xl animate-in zoom-in-95">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-slate-800">Kontrol Orang Tua</h2>
          <p className="text-sm text-slate-500">Masukkan PIN Anda</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            maxLength={4}
            value={pin}
            onChange={(e) => { setPin(e.target.value); setError(''); }}
            className={`w-full text-center text-3xl tracking-widest p-4 rounded-xl border-2 outline-none transition-colors ${
              error ? 'border-red-400 bg-red-50' : 'border-indigo-100 focus:border-indigo-500 bg-slate-50'
            }`}
            placeholder="••••"
            autoFocus
          />
          {error && <p className="text-center text-sm font-semibold text-red-500">{error}</p>}
          
          <div className="flex gap-3">
            {onCancel && (
              <button 
                type="button"
                onClick={onCancel}
                className="flex-1 py-3 px-4 bg-slate-100 text-slate-600 rounded-xl font-bold hover:bg-slate-200"
              >
                Batal
              </button>
            )}
            <button 
              type="submit"
              className="flex-1 py-3 px-4 bg-indigo-600 text-white rounded-xl font-bold custom-shadow hover:-translate-y-0.5 transition-all"
            >
              Masuk
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
