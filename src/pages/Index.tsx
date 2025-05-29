
import { useState } from 'react';
import { DashboardContent } from '@/components/restaurant/DashboardContent';
import { MenuManagement } from '@/components/restaurant/MenuManagement';
import { OrdersManagement } from '@/components/restaurant/OrdersManagement';
import { TableManagement } from '@/components/restaurant/TableManagement';
import { StaffManagement } from '@/components/restaurant/StaffManagement';
import { InventoryManagement } from '@/components/restaurant/InventoryManagement';
import { ReportsAnalytics } from '@/components/restaurant/ReportsAnalytics';
import { Sidebar } from '@/components/restaurant/Sidebar';
import { Header } from '@/components/restaurant/Header';

const Index = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardContent />;
      case 'menu':
        return <MenuManagement />;
      case 'orders':
        return <OrdersManagement />;
      case 'tables':
        return <TableManagement />;
      case 'staff':
        return <StaffManagement />;
      case 'inventory':
        return <InventoryManagement />;
      case 'reports':
        return <ReportsAnalytics />;
      default:
        return <DashboardContent />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab}
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
      />
      <div className={`flex-1 transition-all duration-300 ${sidebarCollapsed ? 'ml-16' : 'ml-64'}`}>
        <Header 
          sidebarCollapsed={sidebarCollapsed}
          setSidebarCollapsed={setSidebarCollapsed}
        />
        <main className="p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default Index;
