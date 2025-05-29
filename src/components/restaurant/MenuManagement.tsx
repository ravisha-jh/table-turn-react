
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Search,
  Filter,
  DollarSign,
  Clock
} from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

const initialMenuItems = [
  {
    id: 1,
    name: 'Classic Burger',
    category: 'Main Course',
    price: 1039,
    description: 'Juicy beef patty with lettuce, tomato, and special sauce',
    prepTime: 15,
    status: 'active',
    image: '/placeholder.svg'
  },
  {
    id: 2,
    name: 'Margherita Pizza',
    category: 'Main Course',
    price: 1199,
    description: 'Fresh mozzarella, tomato sauce, and basil',
    prepTime: 20,
    status: 'active',
    image: '/placeholder.svg'
  },
  {
    id: 3,
    name: 'Caesar Salad',
    category: 'Appetizer',
    price: 719,
    description: 'Crisp romaine lettuce with caesar dressing and croutons',
    prepTime: 10,
    status: 'active',
    image: '/placeholder.svg'
  },
  {
    id: 4,
    name: 'Chocolate Cake',
    category: 'Dessert',
    price: 559,
    description: 'Rich chocolate cake with vanilla ice cream',
    prepTime: 5,
    status: 'inactive',
    image: '/placeholder.svg'
  }
];

export const MenuManagement = () => {
  const [menuItems, setMenuItems] = useState(initialMenuItems);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    prepTime: '',
    description: ''
  });
  const { toast } = useToast();

  const filteredItems = menuItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ['all', 'Appetizer', 'Main Course', 'Dessert', 'Beverage'];

  const handleAddItem = () => {
    if (!formData.name || !formData.category || !formData.price) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    const newItem = {
      id: Math.max(...menuItems.map(item => item.id)) + 1,
      name: formData.name,
      category: formData.category,
      price: parseInt(formData.price),
      description: formData.description,
      prepTime: parseInt(formData.prepTime) || 15,
      status: 'active',
      image: '/placeholder.svg'
    };

    setMenuItems([...menuItems, newItem]);
    setFormData({ name: '', category: '', price: '', prepTime: '', description: '' });
    setIsAddDialogOpen(false);
    toast({
      title: "Success",
      description: "Menu item added successfully"
    });
  };

  const handleEditItem = (item: any) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      category: item.category,
      price: item.price.toString(),
      prepTime: item.prepTime.toString(),
      description: item.description
    });
    setIsEditDialogOpen(true);
  };

  const handleUpdateItem = () => {
    if (!formData.name || !formData.category || !formData.price) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    const updatedItems = menuItems.map(item => 
      item.id === editingItem.id 
        ? {
            ...item,
            name: formData.name,
            category: formData.category,
            price: parseInt(formData.price),
            description: formData.description,
            prepTime: parseInt(formData.prepTime) || 15
          }
        : item
    );

    setMenuItems(updatedItems);
    setFormData({ name: '', category: '', price: '', prepTime: '', description: '' });
    setIsEditDialogOpen(false);
    setEditingItem(null);
    toast({
      title: "Success",
      description: "Menu item updated successfully"
    });
  };

  const handleDeleteItem = (itemId: number) => {
    setMenuItems(menuItems.filter(item => item.id !== itemId));
    toast({
      title: "Success",
      description: "Menu item deleted successfully"
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Menu Management</h1>
          <p className="text-gray-600 mt-2">Manage your restaurant's menu items and categories.</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-orange-600 hover:bg-orange-700">
              <Plus className="h-4 w-4 mr-2" />
              Add Menu Item
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Add New Menu Item</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="add-name">Item Name</Label>
                <Input 
                  id="add-name" 
                  placeholder="Enter item name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="add-category">Category</Label>
                <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Appetizer">Appetizer</SelectItem>
                    <SelectItem value="Main Course">Main Course</SelectItem>
                    <SelectItem value="Dessert">Dessert</SelectItem>
                    <SelectItem value="Beverage">Beverage</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="add-price">Price (₹)</Label>
                <Input 
                  id="add-price" 
                  type="number" 
                  placeholder="0" 
                  step="1"
                  value={formData.price}
                  onChange={(e) => setFormData({...formData, price: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="add-prepTime">Prep Time (minutes)</Label>
                <Input 
                  id="add-prepTime" 
                  type="number" 
                  placeholder="15"
                  value={formData.prepTime}
                  onChange={(e) => setFormData({...formData, prepTime: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="add-description">Description</Label>
                <Textarea 
                  id="add-description" 
                  placeholder="Enter item description"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                />
              </div>
              <div className="flex space-x-2 pt-4">
                <Button className="flex-1 bg-orange-600 hover:bg-orange-700" onClick={handleAddItem}>
                  Add Item
                </Button>
                <Button variant="outline" className="flex-1" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Menu Item</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="edit-name">Item Name</Label>
              <Input 
                id="edit-name" 
                placeholder="Enter item name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="edit-category">Category</Label>
              <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Appetizer">Appetizer</SelectItem>
                  <SelectItem value="Main Course">Main Course</SelectItem>
                  <SelectItem value="Dessert">Dessert</SelectItem>
                  <SelectItem value="Beverage">Beverage</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="edit-price">Price (₹)</Label>
              <Input 
                id="edit-price" 
                type="number" 
                placeholder="0" 
                step="1"
                value={formData.price}
                onChange={(e) => setFormData({...formData, price: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="edit-prepTime">Prep Time (minutes)</Label>
              <Input 
                id="edit-prepTime" 
                type="number" 
                placeholder="15"
                value={formData.prepTime}
                onChange={(e) => setFormData({...formData, prepTime: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="edit-description">Description</Label>
              <Textarea 
                id="edit-description" 
                placeholder="Enter item description"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
              />
            </div>
            <div className="flex space-x-2 pt-4">
              <Button className="flex-1 bg-orange-600 hover:bg-orange-700" onClick={handleUpdateItem}>
                Update Item
              </Button>
              <Button variant="outline" className="flex-1" onClick={() => setIsEditDialogOpen(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            type="search"
            placeholder="Search menu items..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-full sm:w-48">
            <Filter className="h-4 w-4 mr-2" />
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

      {/* Menu Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <Card key={item.id} className="hover:shadow-lg transition-shadow duration-200">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{item.name}</CardTitle>
                  <Badge variant={item.status === 'active' ? 'default' : 'secondary'} className="mt-1">
                    {item.category}
                  </Badge>
                </div>
                <div className="flex space-x-1">
                  <Button size="sm" variant="ghost" onClick={() => handleEditItem(item)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    className="text-red-600 hover:text-red-700"
                    onClick={() => handleDeleteItem(item.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-sm mb-4">{item.description}</p>
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center text-green-600">
                    <DollarSign className="h-4 w-4" />
                    <span className="font-bold">₹{item.price}</span>
                  </div>
                  <div className="flex items-center text-orange-600">
                    <Clock className="h-4 w-4 mr-1" />
                    <span className="text-sm">{item.prepTime}m</span>
                  </div>
                </div>
                <Badge variant={item.status === 'active' ? 'default' : 'secondary'}>
                  {item.status}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <Card className="text-center py-12">
          <CardContent>
            <p className="text-gray-500 text-lg">No menu items found</p>
            <p className="text-gray-400 mt-2">Try adjusting your search or filters</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
