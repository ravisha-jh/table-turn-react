
import { 
  LayoutDashboard, 
  UtensilsCrossed, 
  ShoppingCart, 
  Users, 
  UserCheck, 
  Package, 
  BarChart3,
  ChefHat,
  Menu,
  X
} from 'lucide-react';
import { cn } from '@/lib/utils';

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'menu', label: 'Menu Management', icon: UtensilsCrossed },
  { id: 'orders', label: 'Orders', icon: ShoppingCart },
  { id: 'tables', label: 'Tables', icon: Users },
  { id: 'staff', label: 'Staff', icon: UserCheck },
  { id: 'inventory', label: 'Inventory', icon: Package },
  { id: 'reports', label: 'Reports', icon: BarChart3 },
];

export const Sidebar = ({ activeTab, setActiveTab, collapsed, setCollapsed }) => {
  return (
    <div className={cn(
      "fixed left-0 top-0 h-full bg-gradient-to-b from-orange-600 to-red-600 text-white shadow-lg transition-all duration-300 z-30",
      collapsed ? "w-16" : "w-64"
    )}>
      <div className="p-4 border-b border-orange-500">
        <div className="flex items-center justify-between">
          {!collapsed && (
            <div className="flex items-center space-x-2">
              <ChefHat className="h-8 w-8" />
              <h1 className="text-xl font-bold">RestaurantPro</h1>
            </div>
          )}
          {collapsed && <ChefHat className="h-6 w-6 mx-auto" />}
        </div>
      </div>

      <nav className="mt-6">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={cn(
                "w-full flex items-center px-4 py-3 text-left hover:bg-orange-500 transition-colors duration-200",
                activeTab === item.id && "bg-orange-500 border-r-4 border-white"
              )}
              title={collapsed ? item.label : undefined}
            >
              <Icon className={cn("h-5 w-5", collapsed ? "mx-auto" : "mr-3")} />
              {!collapsed && <span className="font-medium">{item.label}</span>}
            </button>
          );
        })}
      </nav>
    </div>
  );
};
