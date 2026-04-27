import React, { useState } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useParentAuthStore } from '../../core/state/parent-store';
import { useKidsSessionStore } from '../../core/state/kids-store';
import { loginWithGoogle } from '../../modules/auth/index';
import { createChildProfile } from '../../modules/auth/kids-profiles';
import { Button } from '../../ui/atoms/Button';
import { CardHeader } from '../../ui/molecules';

export function KidsAuthLayout() {
  const { firebaseUser, children } = useParentAuthStore();
  
  if (!firebaseUser) {
    return <LoginScreen />;
  }
  
  return <SelectChildScreen childrenList={children} parentId={firebaseUser.uid} />;
}

function LoginScreen() {
  const [loading, setLoading] = useState(false);
  const handleLogin = async () => {
    setLoading(true);
    await loginWithGoogle();
    setLoading(false);
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="p-8 bg-white rounded-3xl shadow-lg max-w-sm w-full text-center space-y-6">
        <h1 className="text-3xl font-black text-indigo-600">AKU HEBAT</h1>
        <p className="text-slate-500">Masuk untuk menyimpan progres belajar anak Anda.</p>
        <Button onClick={handleLogin} disabled={loading} className="w-full">
          {loading ? 'Memuat...' : 'Masuk dengan Google'}
        </Button>
      </div>
    </div>
  );
}

function SelectChildScreen({ childrenList, parentId }: { childrenList: any[], parentId: string }) {
  const { setActiveChild } = useKidsSessionStore();
  const navigate = useNavigate();
  const [isAdding, setIsAdding] = useState(false);
  const [newChildName, setNewChildName] = useState('');

  const handleSelect = (id: string) => {
    setActiveChild(id);
    navigate('/main/dashboard');
  };

  const handleAdd = async () => {
    if (newChildName.trim()) {
      await createChildProfile(parentId, {
        name: newChildName,
        avatarUrl: `https://i.pravatar.cc/150?u=${newChildName}`,
        level: 1,
        exp: 0,
        stars: 0
      });
      setIsAdding(false);
      setNewChildName('');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-indigo-50 p-4">
      <div className="max-w-2xl w-full">
        <h1 className="text-4xl font-black text-center text-indigo-800 mb-8">Siapa yang mau belajar hari ini?</h1>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 mb-8">
          {childrenList.map((c) => (
            <div 
              key={c.id}
              onClick={() => handleSelect(c.id)}
              className="bg-white p-6 rounded-3xl shadow-sm text-center cursor-pointer hover:shadow-md hover:-translate-y-1 transition-all border-4 border-transparent hover:border-indigo-400"
            >
              <img src={c.avatarUrl} alt={c.name} className="w-24 h-24 rounded-full mx-auto mb-4 bg-slate-100" />
              <div className="font-bold text-xl text-slate-800">{c.name}</div>
              <div className="text-sm font-semibold text-orange-500">Level {c.level}</div>
            </div>
          ))}
          
          <div 
            onClick={() => setIsAdding(true)}
            className="bg-indigo-100/50 p-6 rounded-3xl text-center cursor-pointer hover:bg-indigo-100 border-4 border-dashed border-indigo-200 transition-all flex flex-col justify-center items-center h-full min-h-[200px]"
          >
            <div className="w-16 h-16 rounded-full bg-white text-indigo-600 flex items-center justify-center text-3xl font-black mb-4">+</div>
            <div className="font-bold text-lg text-indigo-600">Tambah Anak</div>
          </div>
        </div>

        {isAdding && (
          <div className="bg-white p-6 rounded-2xl shadow-lg max-w-sm mx-auto">
            <h3 className="font-bold mb-4">Nama Anak</h3>
            <input 
              value={newChildName}
              onChange={(e) => setNewChildName(e.target.value)}
              className="w-full p-3 rounded-xl bg-slate-100 mb-4 font-bold"
              placeholder="Contoh: Budi"
            />
            <div className="flex gap-2">
              <Button variant="secondary" className="flex-1" onClick={() => setIsAdding(false)}>Batal</Button>
              <Button className="flex-1" onClick={handleAdd}>Simpan</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
