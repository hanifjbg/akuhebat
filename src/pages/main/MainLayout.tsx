import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useKidsSessionStore } from '../../core/state/kids-store';
import { useParentAuthStore } from '../../core/state/parent-store';
import { DashboardPage } from './learning/DashboardPage';
import { MapPage } from './learning/MapPage';
import { QuizPage } from './learning/QuizPage';
import { ModuleSelectionPage } from './learning/ModuleSelectionPage';
import { LessonListPage } from './learning/LessonListPage';
import { LessonContentPage } from './learning/LessonContentPage';
import { LeaderboardPage } from './social/LeaderboardPage';
import { ProfilePage } from './social/ProfilePage';
import { SettingsPage } from './settings/SettingsPage';

export function MainLayout() {
  const { activeChildId } = useKidsSessionStore();
  const { children, firebaseUser } = useParentAuthStore();

  if (!firebaseUser || !activeChildId) {
    return <Navigate to="/main/auth" replace />;
  }

  const activeChild = children.find(c => c.id === activeChildId);
  
  if (!activeChild) {
    return <Navigate to="/main/auth" replace />;
  }

  return (
    <div className="theme-kids min-h-screen bg-slate-50 relative overflow-hidden">
      <Routes>
        <Route path="dashboard" element={<DashboardPage child={activeChild} />} />
        <Route path="map" element={<MapPage child={activeChild} />} />
        <Route path="learning" element={<ModuleSelectionPage child={activeChild} />} />
        <Route path="learning/module/:moduleId" element={<LessonListPage child={activeChild} />} />
        <Route path="learning/lesson/:lessonId" element={<LessonContentPage child={activeChild} />} />
        <Route path="quiz" element={<QuizPage child={activeChild} />} />
        <Route path="leaderboard" element={<LeaderboardPage child={activeChild} />} />
        <Route path="profile" element={<ProfilePage child={activeChild} />} />
        <Route path="settings" element={<SettingsPage child={activeChild} />} />
        <Route path="*" element={<Navigate to="dashboard" replace />} />
      </Routes>
    </div>
  );
}
