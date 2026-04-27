import { createBrowserRouter, Navigate, Routes, Route, Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import { UxLabIndex } from '../pages/ux-lab/UxLabIndex';
import { LoginPage } from '../pages/ux-lab/auth/LoginPage';
import { ProfilesPage } from '../pages/ux-lab/auth/ProfilesPage';
import { MapPage } from '../pages/ux-lab/learning/MapPage';
import { DashboardPage } from '../pages/ux-lab/learning/DashboardPage';
import { MaterialPage } from '../pages/ux-lab/learning/MaterialPage';
import { QuizPage } from '../pages/ux-lab/learning/QuizPage';
import { FriendsPage } from '../pages/ux-lab/social/FriendsPage';
import { LeaderboardPage } from '../pages/ux-lab/social/LeaderboardPage';
import { VersusPage } from '../pages/ux-lab/versus/VersusPage';
import { MemoryGamePage } from '../pages/ux-lab/minigames/MemoryGamePage';
import { WordBuilderPage } from '../pages/ux-lab/minigames/WordBuilderPage';
import { ColoringPage } from '../pages/ux-lab/minigames/ColoringPage';
import { StoryTimePage } from '../pages/ux-lab/fullscreen/StoryTimePage';
import { AdminDashboardPage } from '../pages/ux-lab/admin/AdminDashboardPage';
import { AdminLayout } from '../pages/admin/AdminLayout';
import { MainLayout } from '../pages/main/MainLayout';
import { KidsAuthLayout } from '../pages/main/KidsAuthLayout';
import { setupAuthListener } from '../modules/auth/index';
import { listenToChildProfiles } from '../modules/auth/kids-profiles';
import { useParentAuthStore } from '../core/state/parent-store';

const MainAppWrapper = () => {
  const { firebaseUser } = useParentAuthStore();
  
  useEffect(() => {
    const unsubscribeAuth = setupAuthListener();
    return () => unsubscribeAuth();
  }, []);

  useEffect(() => {
    if (firebaseUser) {
      const unsubscribeChildren = listenToChildProfiles(firebaseUser.uid);
      return () => unsubscribeChildren();
    }
  }, [firebaseUser]);

  return <Outlet />;
};

const UxLabLayout = () => (
  <Routes>
    <Route index element={<UxLabIndex />} />
    <Route path="auth/login" element={<LoginPage />} />
    <Route path="auth/profiles" element={<ProfilesPage />} />
    <Route path="learning/dashboard" element={<DashboardPage />} />
    <Route path="learning/map" element={<MapPage />} />
    <Route path="learning/material" element={<MaterialPage />} />
    <Route path="learning/quiz" element={<QuizPage />} />
    <Route path="social/friends" element={<FriendsPage />} />
    <Route path="social/leaderboard" element={<LeaderboardPage />} />
    <Route path="versus/arena" element={<VersusPage />} />
    <Route path="minigames/memory" element={<MemoryGamePage />} />
    <Route path="minigames/words" element={<WordBuilderPage />} />
    <Route path="minigames/coloring" element={<ColoringPage />} />
    <Route path="fullscreen/story" element={<StoryTimePage />} />
    <Route path="admin/dashboard" element={<AdminDashboardPage />} />
  </Routes>
);

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/main" replace />
  },
  {
    path: '/main',
    element: <MainAppWrapper />,
    children: [
      {
        path: 'auth/*',
        element: <KidsAuthLayout />
      },
      {
        path: '*',
        element: <MainLayout />
      }
    ]
  },
  {
    path: '/admin/*',
    element: <AdminLayout />
  },
  {
    path: '/ux-lab/*',
    element: <UxLabLayout />
  }
]);
