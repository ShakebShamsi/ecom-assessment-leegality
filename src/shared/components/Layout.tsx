import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './Header';

export const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header
        isSidebarOpen={isSidebarOpen}
        onMenuClick={() => setIsSidebarOpen((previous) => !previous)}
      />
      <main style={{ flex: 1 }}>
        <Outlet context={{ isSidebarOpen }} />
      </main>
    </div>
  );
};
