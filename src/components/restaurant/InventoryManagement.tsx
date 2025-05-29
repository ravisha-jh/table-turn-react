
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  AlertTriangle,
  Package,
  TrendingDown,
  TrendingUp
} from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const inventory = [
  {
    id: 1,
    name: 'Beef Patties',
    category: 'Meat',
    currentStock: 45,
    minStock: 20,
    maxStock: 100,
    unit: 'pieces',
    costPerUnit: 2.50,
    supplier: 'Fresh Meat Co.',
    lastRestocked: '2024-01-15',
    expiryDate: '2024-02-15'
  },
  {
    id: 2,
    name: 'Tomatoes',
    category: 'Vegetables',
    currentStock: 12,
    minStock: 15,
    maxStock: 50,
    unit: 'kg',
    costPerUnit: 3.20,
    supplier: 'Green Valley Farms',
    lastRestocked: '2024-01-10',
    expiryDate: '2024-01-20'
  },
  {
    id: 3,
    name: 'Mozzarella Cheese',
    category: 'Dairy',
    currentStock: 8,
    minStock: 10,
    maxStock: 30,
    unit: 'kg',
    costPerUnit: 12.00,
    supplier: 'Dairy Fresh Ltd.',
    lastRestocked: '2024-01-12',
    expiryDate: '2024-02-01'
  },
  {
    id: 4,
    name: 'Olive Oil',
    category: 'Condiments',
    currentStock: 25,
    minStock: 5,
    maxStock: 40,
    unit: 'bottles',
    costPerUnit: 8.50,
    supplier: 'Mediterranean Imports',
    lastRestocked: '2024-01-08',
    expiryDate: '2025-01-08'
  },
  {
    id: 5,
    name: 'Flour',
    category: 'Baking',
    currentStock: 2,
    minStock: 10,
    maxStock: 50,
    unit: 'kg',
    costPerUnit: 1.80,
    supplier: 'Golden Grain Mills',
    lastRestocked: '2024-01-05',
    expiryDate: '2024-06-01'
  },
  {
    id: 6,
    name: 'Chicken Breast',
    category: 'Meat',
    currentStock: 18,
    minStock: 15,
    maxStock: 40,
    unit: 'kg',
    costPerUnit: 8.75,
    supplier: 'Fresh Meat Co.',
    lastRestocked: '2024-01-14',
    expiryDate: '2024-01-28'
  }
];

const getStockStatus = (current: number, min: number) => {
  if (current <= min) return 'critical';
  if (current <= min * 1.5) return 'low';
  return 'good';
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'critical': return 'bg-red-100 text-red-800';
    case 'low': return 'bg-yellow-100 text-yellow-800';
    case 'good': return 'bg-green-100 text-green-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

const getCategoryColor = (category: string) => {
  switch (category.toLowerCase()) {
    case 'meat': return 'bg-red-100 text-red-800';
    case 'vegetables': return 'bg-green-100 text-green-800';
    case 'dairy': return 'bg-blue-100 text-blue-800';
    case 'condiments': return 'bg-yellow-100 text-yellow-800';
    case 'baking': return 'bg-purple-100 text-purple-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

export const InventoryManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const filteredInventory = inventory.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ['all', 'Meat', 'Vegetables', 'Dairy', 'Condiments', 'Baking'];
  const lowStockItems = inventory.filter(item => getStockStatus(item.currentStock, item.minStock) !== 'good').length;
  const totalValue = inventory.reduce((sum, item) => sum + (item.currentStock * item.costPerUnit), 0);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Inventory Management</h1>
          <p className="text-gray-600 mt-2">Track and manage restaurant inventory and supplies.</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-orange-600 hover:bg-orange-700">
              <Plus className="h-4 w-4 mr-2" />
              Add Item
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Add New Inventory Item</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="itemName">Item Name</Label>
                <Input id="itemName" placeholder="Enter item name" />
              </div>
              <div>
                <Label htmlFor="category">Category</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="meat">Meat</SelectItem>
                    <SelectItem value="vegetables">Vegetables</SelectItem>
                    <SelectItem value="dairy">Dairy</SelectItem>
                    <SelectItem value="condiments">Condiments</SelectItem>
                    <SelectItem value="baking">Baking</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="currentStock">Current Stock</Label>
                <Input id="currentStock" type="number" placeholder="0" />
              </div>
              <div>
                <Label htmlFor="minStock">Minimum Stock</Label>
                <Input id="minStock" type="number" placeholder="0" />
              </div>
              <div>
                <Label htmlFor="unit">Unit</Label>
                <Input id="unit" placeholder="e.g., kg, pieces, bottles" />
              </div>
              <div>
                <Label htmlFor="costPerUnit">Cost per Unit ($)</Label>
                <Input id="costPerUnit" type="number" placeholder="0.00" step="0.01" />
              </div>
              <div className="flex space-x-2 pt-4">
                <Button className="flex-1 bg-orange-600 hover:bg-orange-700">Add Item</Button>
                <Button variant="outline" className="flex-1" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-blue-600">{inventory.length}</div>
            <p className="text-sm text-gray-600">Total Items</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-red-600">{lowStockItems}</div>
            <p className="text-sm text-gray-600">Low Stock Alerts</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-green-600">${totalValue.toFixed(2)}</div>
            <p className="text-sm text-gray-600">Total Value</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-orange-600">
              {Math.round((inventory.filter(item => getStockStatus(item.currentStock, item.minStock) === 'good').length / inventory.length) * 100)}%
            </div>
            <p className="text-sm text-gray-600">Stock Health</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            type="search"
            placeholder="Search inventory items..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category === 'all' ? 'All Categories' : category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Inventory Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredInventory.map((item) => {
          const status = getStockStatus(item.currentStock, item.minStock);
          const stockPercentage = (item.currentStock / item.maxStock) * 100;
          
          return (
            <Card key={item.id} className="hover:shadow-lg transition-shadow duration-200">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg flex items-center">
                      {item.name}
                      {status === 'critical' && (
                        <AlertTriangle className="h-4 w-4 text-red-500 ml-2" />
                      )}
                    </CardTitle>
                    <Badge className={getCategoryColor(item.category)} >
                      {item.category}
                    </Badge>
                  </div>
                  <div className="flex space-x-1">
                    <Button size="sm" variant="ghost">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="ghost" className="text-red-600 hover:text-red-700">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-600">Stock Level</span>
                      <Badge className={getStatusColor(status)}>
                        {status}
                      </Badge>
                    </div>
                    <Progress value={stockPercentage} className="h-2" />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>{item.currentStock} {item.unit}</span>
                      <span>Max: {item.maxStock}</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Min Stock</p>
                      <p className="font-medium">{item.minStock} {item.unit}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Cost/Unit</p>
                      <p className="font-medium">${item.costPerUnit}</p>
                    </div>
                  </div>
                  
                  <div className="text-sm">
                    <p className="text-gray-600">Supplier</p>
                    <p className="font-medium">{item.supplier}</p>
                  </div>
                  
                  <div className="flex justify-between items-center pt-2 border-t">
                    <span className="text-sm text-gray-600">
                      Expires: {new Date(item.expiryDate).toLocaleDateString()}
                    </span>
                    <span className="font-bold text-green-600">
                      ${(item.currentStock * item.costPerUnit).toFixed(2)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredInventory.length === 0 && (
        <Card className="text-center py-12">
          <CardContent>
            <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No inventory items found</p>
            <p className="text-gray-400 mt-2">Try adjusting your search or filters</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
