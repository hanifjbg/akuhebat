import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useKidsSessionStore } from '../../core/state/kids-store';
import { useParentAuthStore } from '../../core/state/parent-store';
import { DashboardPage } from './learning/DashboardPage';
import { MapPage } from './learning/MapPage';
import { QuizPage } from './learning/QuizPage';

export function MainLayout() {
  const { activeChildId } = useKidsSessionStore();
  const { children, isAuthenticated } = useParentAuthStore();
  
  // If not authenticated or no active child, redirect to Auth/Select Child
  if (!isAuthenticated || !activeChildId) {
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
        <Route path="quiz" element={<QuizPage child={activeChild} />} />
        <Route path="*" element={<Navigate to="dashboard" replace />} />
      </Routes>
    </div>
  );
}
