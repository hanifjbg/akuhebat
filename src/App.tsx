/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './app/router';
import { DevNavTool } from './core/ui/DevNavTool';
import { useSimulatorStore } from './shared/store/simulator';

export default function App() {
  const { isDarkMode } = useSimulatorStore();

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <>
      <RouterProvider router={router} />
      <DevNavTool />
    </>
  );
}
