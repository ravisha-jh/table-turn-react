import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Edit, Trash2, Utensils } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const MenuManagement = () => {
  const [menuItems, setMenuItems] = useState([
    {
      id: '1',
      name: 'Classic Burger',
      description: 'Juicy beef patty with lettuce, tomato, and special sauce.',
      price: 10.99,
      category: 'Burgers',
      available: true
    },
    {
      id: '2',
      name: 'Margherita Pizza',
      description: 'Classic pizza with fresh mozzarella, tomatoes, and basil.',
      price: 12.99,
      category: 'Pizza',
      available: true
    },
    {
      id: '3',
      name: 'Caesar Salad',
      description: 'Fresh romaine lettuce with parmesan cheese and Caesar dressing.',
      price: 8.99,
      category: 'Salads',
      available: false
    }
  ]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newItem, setNewItem] = useState({
    name: '',
    description: '',
    price: 0,
    category: '',
    available: true
  });
  const [editingItem, setEditingItem] = useState(null);
  const { toast } = useToast();

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewItem(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingItem) {
      // Update existing item
      setMenuItems(menuItems.map(item => item.id === editingItem.id ? { ...newItem, id: item.id } : item));
      toast({
        title: "Menu Item Updated",
        description: `${newItem.name} has been updated successfully`
      });
    } else {
      // Add new item
      const newItemWithId = { ...newItem, id: String(Date.now()) };
      setMenuItems([...menuItems, newItemWithId]);
      toast({
        title: "Menu Item Added",
        description: `${newItem.name} has been added to the menu`
      });
    }

    setNewItem({ name: '', description: '', price: 0, category: '', available: true });
    setShowAddForm(false);
    setEditingItem(null);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Menu Management</h1>
        <p className="text-gray-600 mt-2">Manage your restaurant's menu items, categories, and availability.</p>
      </div>

      <Button onClick={() => {
        setShowAddForm(true);
        setEditingItem(null);
        setNewItem({ name: '', description: '', price: 0, category: '', available: true });
      }} className="bg-orange-600 hover:bg-orange-700">
        <Utensils className="h-4 w-4 mr-2" />
        Add Item
      </Button>

      {showAddForm && (
        <Card>
          <CardHeader>
            <CardTitle>{editingItem ? 'Edit Item' : 'Add New Item'}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  value={newItem.name}
                  onChange={handleInputChange}
                  placeholder="Item Name"
                  required
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Input
                  type="text"
                  id="description"
                  name="description"
                  value={newItem.description}
                  onChange={handleInputChange}
                  placeholder="Description"
                  required
                />
              </div>
              <div>
                <Label htmlFor="price">Price</Label>
                <Input
                  type="number"
                  id="price"
                  name="price"
                  value={newItem.price}
                  onChange={handleInputChange}
                  placeholder="Price"
                  required
                />
              </div>
              <div>
                <Label htmlFor="category">Category</Label>
                <Input
                  type="text"
                  id="category"
                  name="category"
                  value={newItem.category}
                  onChange={handleInputChange}
                  placeholder="Category"
                  required
                />
              </div>
              <div>
                <Label htmlFor="available">Available</Label>
                <Input
                  type="checkbox"
                  id="available"
                  name="available"
                  checked={newItem.available}
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="ghost" onClick={() => setShowAddForm(false)}>
                  Cancel
                </Button>
                <Button type="submit" className="bg-orange-600 hover:bg-orange-700">
                  {editingItem ? 'Update Item' : 'Add Item'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {menuItems.map((item) => (
          <Card key={item.id} className="hover:shadow-lg transition-shadow duration-200">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{item.name}</CardTitle>
                  <Badge variant="outline" className="mt-1">
                    {item.category}
                  </Badge>
                </div>
                <div className="flex space-x-2">
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => {
                      setEditingItem(item);
                      setShowAddForm(true);
                      setNewItem(item);
                    }}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="text-red-600 hover:text-red-700"
                    onClick={() => {
                      setMenuItems(menuItems.filter(menuItem => menuItem.id !== item.id));
                      toast({
                        title: "Item Deleted",
                        description: `${item.name} has been removed from the menu`
                      });
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-sm mb-3">{item.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold text-green-600">₹{item.price}</span>
                <Badge className={item.available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                  {item.available ? 'Available' : 'Out of Stock'}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
