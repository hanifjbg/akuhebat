import React, { useState } from 'react';
import { Shield, Clock, BookOpen, CheckCircle2 } from 'lucide-react';
import { Button } from '../../ui/atoms/Button';
import { useParentAuthStore } from '../../core/state/parent-store';
import { logoutParent } from '../../modules/auth/index';

export function AdminDashboardPage() {
  const { children, firebaseUser } = useParentAuthStore();
  const [screenTime, setScreenTime] = useState(30);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 p-4 sm:p-8 font-sans">
      <div className="max-w-4xl mx-auto space-y-8">
        
        <header className="flex items-center justify-between bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-indigo-100 dark:bg-indigo-900/50 rounded-xl text-indigo-600 dark:text-indigo-400">
              <Shield className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Pusat Kendali Orang Tua</h1>
              <p className="text-slate-500 dark:text-slate-400">Akun: {firebaseUser?.displayName || 'Admin'}</p>
            </div>
          </div>
          <Button variant="outline" className="hidden sm:flex" onClick={logoutParent}>
            Keluar
          </Button>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Screen Time Limit */}
          <section className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 space-y-6">
            <div className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-700 pb-4">
              <Clock className="w-6 h-6 text-orange-500" />
              <h2 className="text-xl font-bold">Batas Waktu Layar</h2>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <span className="font-semibold">Batas Harian</span>
                <span className="text-2xl font-black text-orange-500">{screenTime} Menit</span>
              </div>
              
              <input 
                type="range" 
                min="10" 
                max="120" 
                step="5"
                value={screenTime} 
                onChange={(e) => setScreenTime(parseInt(e.target.value))}
                className="w-full accent-orange-500"
              />
              <p className="text-sm text-slate-500">Fitur ini akan diintegrasikan di versi penuh.</p>
            </div>
          </section>

          {/* Learning Progress (Real Data) */}
          <section className="col-span-1 md:col-span-2 bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 space-y-6">
            <div className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-700 pb-4">
              <h2 className="text-xl font-bold">Progres Anak</h2>
            </div>
            
            <div className="space-y-4">
              {children.length === 0 ? (
                <div className="text-slate-500 text-center py-4">Belum ada profil anak ditambahkan.</div>
              ) : (
                children.map(child => (
                  <div key={child.id} className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <div className="col-span-2 md:col-span-1 flex items-center gap-3">
                      <img src={child.avatarUrl} alt={child.name} className="w-12 h-12 rounded-full" />
                      <div className="font-bold">{child.name}</div>
                    </div>
                    <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-700 text-center">
                      <div className="text-sm text-slate-500 mb-1">Level Saat Ini</div>
                      <div className="text-2xl font-bold text-indigo-500">Lv. {child.level}</div>
                    </div>
                    <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-700 text-center">
                      <div className="text-sm text-slate-500 mb-1">Total EXP</div>
                      <div className="text-2xl font-bold text-green-500">{child.exp}</div>
                    </div>
                    <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-700 text-center">
                      <div className="text-sm text-slate-500 mb-1">Total Bintang</div>
                      <div className="text-2xl font-bold text-orange-500">{child.stars}</div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
