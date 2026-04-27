import * as React from "react"
import { MainLayout } from "../../../ui/templates/MainLayout"
import { useParentAuthStore } from "../../../core/state/parent-store"
import { useNavigate } from "react-router-dom"
import { Button } from "../../../ui/atoms"
import { auth } from "../../../core/firebase/config"

export function SettingsPage({ child }: { child: any }) {
  const { logout } = useParentAuthStore()
  const navigate = useNavigate()

  const handleSignOut = () => {
    logout()
    auth.signOut()
    navigate("/main/auth")
  }

  return (
    <MainLayout 
      activeTab="settings"
      bgClassName="bg-slate-50 dark:bg-slate-900"
      topBarProps={{
        userName: child.name,
        title: "Pengaturan",
        avatarSrc: child.avatarUrl,
        showBackButton: true,
        onBackClick: () => navigate("/main/dashboard")
      }}
    >
      <div className="flex-1 w-full flex flex-col items-center p-6 pt-12 max-w-sm mx-auto pb-32">
        <div className="w-full space-y-4">
           {/* Settings options */}
           <div className="bg-white p-4 rounded-xl shadow-clay-sm border-2 border-slate-200">
             <h3 className="font-bold text-slate-700 mb-2">Suara & Musik</h3>
             <p className="text-slate-500 text-sm mb-4">Pengaturan aktif di perangkat ini.</p>
             <div className="flex justify-between items-center bg-slate-50 p-2 rounded-lg mb-2">
               <span className="font-bold text-slate-600">Musik Latar</span>
               <div className="w-12 h-6 bg-green-400 rounded-full flex justify-end p-1 shadow-inner">
                  <div className="w-4 h-4 bg-white rounded-full" />
               </div>
             </div>
             <div className="flex justify-between items-center bg-slate-50 p-2 rounded-lg">
               <span className="font-bold text-slate-600">Efek Suara</span>
               <div className="w-12 h-6 bg-green-400 rounded-full flex justify-end p-1 shadow-inner">
                  <div className="w-4 h-4 bg-white rounded-full" />
               </div>
             </div>
           </div>

           <Button 
             variant="destructive" 
             className="w-full"
             onClick={handleSignOut}
           >
             Keluar Akun
           </Button>
        </div>
      </div>
    </MainLayout>
  )
}
