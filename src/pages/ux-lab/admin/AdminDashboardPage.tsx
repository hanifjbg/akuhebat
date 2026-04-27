import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings, BarChart2, Shield, Clock, Type, BookOpen, ChevronRight, CheckCircle2 } from 'lucide-react';
import { Switch, Slider, Select, Badge, CardHeader } from '../../../ui/molecules'; // Mocking these, some might be in atoms
import { Button } from '../../../ui/atoms/Button';

export function AdminDashboardPage() {
  const [screenTime, setScreenTime] = useState(30);
  const [textSize, setTextSize] = useState('medium');
  const [ttsEnabled, setTtsEnabled] = useState(true);

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
              <p className="text-slate-500 dark:text-slate-400">Atur pengalaman belajar anak Anda di sini</p>
            </div>
          </div>
          <Button variant="outline" className="hidden sm:flex">
            Keluar
          </Button>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Text & Control Settings */}
          <section className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 space-y-6">
            <div className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-700 pb-4">
              <Type className="w-6 h-6 text-indigo-500" />
              <h2 className="text-xl font-bold">Kustomisasi UI & Teks</h2>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">Ukuran Teks</h3>
                  <p className="text-sm text-slate-500">Pilih ukuran teks materi</p>
                </div>
                <div className="flex bg-slate-100 dark:bg-slate-700 p-1 rounded-lg">
                  {['Kecil', 'Sedang', 'Besar'].map((size) => (
                    <button
                      key={size}
                      className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all ${textSize === size ? 'bg-white dark:bg-slate-600 shadow-sm text-indigo-600 dark:text-indigo-400' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
                      onClick={() => setTextSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">Text-to-Speech (Suara)</h3>
                  <p className="text-sm text-slate-500">Panduan suara otomatis saat belajar</p>
                </div>
                <button 
                  onClick={() => setTtsEnabled(!ttsEnabled)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${ttsEnabled ? 'bg-indigo-600' : 'bg-slate-300 dark:bg-slate-600'}`}
                >
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${ttsEnabled ? 'translate-x-6' : 'translate-x-1'}`} />
                </button>
              </div>
            </div>
          </section>

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
              
              <p className="text-sm text-slate-500">Aplikasi akan mengingatkan anak untuk beristirahat setelah batas waktu tercapai.</p>
            </div>
          </section>

          {/* Learning Progress / Heatmap Mock */}
          <section className="col-span-1 md:col-span-2 bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 space-y-6">
            <div className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-700 pb-4">
              <BarChart2 className="w-6 h-6 text-green-500" />
              <h2 className="text-xl font-bold">Statistik & Analisa Anak (Draft)</h2>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-700">
                <div className="text-sm text-slate-500 mb-1">Materi Selesai</div>
                <div className="text-3xl font-bold text-slate-800 dark:text-slate-100">12</div>
              </div>
              <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-700">
                <div className="text-sm text-slate-500 mb-1">Akurasi Rata-rata</div>
                <div className="text-3xl font-bold text-green-500">85%</div>
              </div>
              <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-700">
                <div className="text-sm text-slate-500 mb-1">Waktu Belajar (Mg ini)</div>
                <div className="text-3xl font-bold text-slate-800 dark:text-slate-100">2h 15m</div>
              </div>
              <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-700">
                <div className="text-sm text-slate-500 mb-1">Kemampuan Membaca</div>
                <div className="text-3xl font-bold text-indigo-500">Lv. 2</div>
              </div>
            </div>

            {/* Heatmap placeholder */}
            <div className="mt-6 p-6 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-xl flex items-center justify-center text-slate-400 font-medium bg-slate-50 dark:bg-slate-800/50">
              [ Area Heatmap Interaktif Akan Ditampilkan Di Sini ]
            </div>
          </section>
          
          {/* Module Override */}
          <section className="col-span-1 md:col-span-2 bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 space-y-6">
            <div className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-700 pb-4">
              <BookOpen className="w-6 h-6 text-blue-500" />
              <h2 className="text-xl font-bold">Override Materi Belajar</h2>
            </div>
            <p className="text-sm text-slate-500 -mt-2">Kunci atau buka materi tertentu untuk memaksa anak fokus pada satu bab.</p>
            
            <div className="space-y-3">
              {[
                { name: 'Mengenal Abjad', status: 'completed' },
                { name: 'Suku Kata Vokal', status: 'active' },
                { name: 'Suku Kata Konsonan Akhir', status: 'locked' },
                { name: 'Merakit Kalimat', status: 'locked' }
              ].map((mod, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-700">
                  <div className="flex items-center gap-3">
                    {mod.status === 'completed' && <CheckCircle2 className="w-5 h-5 text-green-500" />}
                    {mod.status === 'active' && <div className="w-5 h-5 rounded-full border-4 border-blue-500" />}
                    {mod.status === 'locked' && <div className="w-5 h-5 rounded-full border-4 border-slate-300 dark:border-slate-600" />}
                    <span className="font-medium">{mod.name}</span>
                  </div>
                  <Button variant="secondary" size="sm">Ubah Status</Button>
                </div>
              ))}
            </div>

          </section>

        </div>
      </div>
    </div>
  );
}
