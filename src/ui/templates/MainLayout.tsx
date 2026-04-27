import * as React from "react"
import { useNavigate } from "react-router-dom"
import { TopBar, TopBarProps } from "../organisms/TopBar"
import { BottomBar } from "../organisms/BottomBar"
import { cn } from "../../shared/utils"

export interface MainLayoutProps {
  children: React.ReactNode
  showTopBar?: boolean
  showBottomBar?: boolean
  activeTab?: "home" | "play" | "profile" | "leaderboard" | "settings"
  onTabChange?: (tab: any) => void
  topBarProps?: Omit<TopBarProps, 'className'>
  className?: string
  bgClassName?: string
}

export function MainLayout({ 
  children, 
  showTopBar = true, 
  showBottomBar = true, 
  activeTab = "home",
  onTabChange,
  topBarProps = { userName: "Anak Hebat", stars: 0, level: 1 },
  className,
  bgClassName
}: MainLayoutProps) {
  const navigate = useNavigate();

  const handleTabChange = (tab: string) => {
    if (onTabChange) {
      onTabChange(tab);
    } else {
      if (tab === "home") navigate("/main/dashboard");
      else if (tab === "play") navigate("/main/map");
      else navigate(`/main/${tab}`);
    }
  }

  return (
    <div className={cn("fixed inset-0 w-[100dvw] h-[100dvh] overflow-hidden", bgClassName)}>
      {showTopBar && <TopBar {...topBarProps} />}
      
      <main className={cn(
        "w-full h-full max-w-md mx-auto relative",
        className
      )}>
        <div className="absolute inset-0 overflow-y-auto no-scrollbar z-0 flex flex-col items-center w-full">
          {/* Spacer for TopBar */}
          {showTopBar && <div className="h-[96px] w-full shrink-0" />}
          
          <div className="flex-1 w-full flex flex-col relative px-[1px]">
            {children}
          </div>
          
          {/* Spacer for BottomBar */}
          {showBottomBar && <div className="h-[120px] w-full shrink-0" />}
        </div>
      </main>

      {showBottomBar && (
        <BottomBar 
          activeTab={activeTab} 
          onTabChange={handleTabChange} 
        />
      )}
    </div>
  )
}
