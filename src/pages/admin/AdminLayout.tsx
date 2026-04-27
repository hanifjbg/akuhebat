import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ParentalGate } from '../../app/ParentalGate';
import { AdminDashboardPage } from './AdminDashboardPage';
import { useParentAuthStore } from '../../core/state/parent-store';

export function AdminLayout() {
  const { firebaseUser } = useParentAuthStore();

  return (
    <ParentalGate>
      <div className="theme-admin min-h-screen bg-slate-50 dark:bg-slate-900">
        {!firebaseUser ? (
          <div className="flex items-center justify-center min-h-screen">
             <div className="text-center bg-white p-8 rounded-2xl shadow-lg border border-red-200">
               <h2 className="text-xl font-bold text-red-500 mb-2">Belum Login</h2>
               <p className="text-slate-600 mb-4">Anda harus login menggunakan akun Google terlebih dahulu di halaman muka.</p>
               <a href="/main/auth" className="px-4 py-2 bg-indigo-600 text-white rounded-lg inline-block font-bold">Kembali ke Login</a>
             </div>
          </div>
        ) : (
          <Routes>
            <Route path="dashboard" element={<AdminDashboardPage />} />
            <Route path="*" element={<Navigate to="dashboard" replace />} />
          </Routes>
        )}
      </div>
    </ParentalGate>
  );
}
