import { createBrowserRouter, Navigate, Routes, Route } from 'react-router-dom';
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

const MainLayout = () => (
  <div className="flex items-center justify-center h-[100dvh] w-[100dvw]">
    <div className="text-center">
      <h1 className="text-4xl font-bold text-primary mb-4">AKU HEBAT!</h1>
      <p className="text-lg text-slate-600">Area Anak - Under Construction</p>
    </div>
  </div>
);

const AdminLayout = () => (
  // Will be implemented later in Stage 4
  <div className="flex items-center justify-center h-[100dvh] w-[100dvw] theme-admin">
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-4 text-slate-800">Admin Dashboard</h1>
      <p className="text-lg text-slate-600">Under Construction</p>
    </div>
  </div>
);

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
  </Routes>
);

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/ux-lab" replace />
  },
  {
    path: '/main/*',
    element: <MainLayout />
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
