import * as React from "react"
import { motion } from "framer-motion"
import { MainLayout } from "../../../ui/templates/MainLayout"
import { ProfileCard } from "../../../ui/organisms/ProfileCard"
import { useParentAuthStore } from "../../../core/state/parent-store"
import { auth } from "../../../core/firebase/config"
import { useNavigate } from "react-router-dom"

export function ProfilePage({ child }: { child: any }) {
  const { logout } = useParentAuthStore()
  const navigate = useNavigate()
  
  const handleSignOut = () => {
    logout()
    auth.signOut()
    navigate("/main/auth")
  }

  return (
    <MainLayout 
      activeTab="profile"
      bgClassName="bg-gradient-to-b from-blue-50 to-transparent dark:from-slate-900"
      topBarProps={{
        userName: child.name,
        title: "Profil Kamu",
        avatarSrc: child.avatarUrl,
        showBackButton: true
      }}
    >
      <div className="flex-1 w-full flex flex-col items-center p-4 pt-8 max-w-sm mx-auto pb-32">
        <ProfileCard 
          userName={child.name}
          level={child.level}
          exp={child.exp}
          nextLevelExp={(child.level) * 500}
          avatarSrc={child.avatarUrl || "https://api.dicebear.com/7.x/notionists/svg?seed="+child.name}
          totalStars={child.stars}
          className="w-full mb-8 z-10"
        />

        <div className="w-full space-y-4">
           {/* Add some buttons for logout or settings */}
           <motion.button 
             whileHover={{ scale: 1.02 }}
             whileTap={{ scale: 0.98 }}
             onClick={handleSignOut}
             className="w-full bg-red-100 text-red-700 py-3 rounded-xl font-bold border-2 border-red-200"
           >
             Keluar Akun
           </motion.button>
        </div>
      </div>
    </MainLayout>
  )
}
