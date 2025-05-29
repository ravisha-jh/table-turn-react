import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2,
  Users,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const initialTables = [
  { id: 1, name: 'Table 1', capacity: 4, status: 'available' },
  { id: 2, name: 'Table 2', capacity: 2, status: 'occupied' },
  { id: 3, name: 'Table 3', capacity: 6, status: 'available' },
  { id: 4, name: 'Table 4', capacity: 4, status: 'reserved' },
  { id: 5, name: 'Table 5', capacity: 2, status: 'available' },
  { id: 6, name: 'Table 6', capacity: 8, status: 'occupied' }
];

const getStatusColor = (status) => {
  switch (status) {
    case 'available': return 'bg-green-100 text-green-800';
    case 'occupied': return 'bg-red-100 text-red-800';
    case 'reserved': return 'bg-yellow-100 text-yellow-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

export const TableManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [tables, setTables] = useState(initialTables);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newTable, setNewTable] = useState({ name: '', capacity: 2 });

  const filteredTables = tables.filter(table =>
    table.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddTable = () => {
    const newId = tables.length > 0 ? Math.max(...tables.map(table => table.id)) + 1 : 1;
    setTables([...tables, { ...newTable, id: newId, status: 'available' }]);
    setNewTable({ name: '', capacity: 2 });
    setIsAddDialogOpen(false);
  };

  const handleDeleteTable = (id) => {
    setTables(tables.filter(table => table.id !== id));
  };

  const handleStatusChange = (id, newStatus) => {
    setTables(tables.map(table =>
      table.id === id ? { ...table, status: newStatus } : table
    ));
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Table Management</h1>
          <p className="text-gray-600 mt-2">Manage restaurant tables and their availability.</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-orange-600 hover:bg-orange-700">
              <Plus className="h-4 w-4 mr-2" />
              Add Table
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Add New Table</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="tableName">Table Name</Label>
                <Input
                  id="tableName"
                  placeholder="Enter table name"
                  value={newTable.name}
                  onChange={(e) => setNewTable({ ...newTable, name: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="capacity">Capacity</Label>
                <Select value={newTable.capacity.toString()} onValueChange={(value) => setNewTable({ ...newTable, capacity: parseInt(value) })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select capacity" />
                  </SelectTrigger>
                  <SelectContent>
                    {[2, 4, 6, 8, 10].map((capacity) => (
                      <SelectItem key={capacity} value={capacity.toString()}>
                        {capacity}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex space-x-2 pt-4">
                <Button className="flex-1 bg-orange-600 hover:bg-orange-700" onClick={handleAddTable}>
                  Add Table
                </Button>
                <Button variant="outline" className="flex-1" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          type="search"
          placeholder="Search tables..."
          className="pl-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTables.map((table) => (
          <Card key={table.id} className="hover:shadow-lg transition-shadow duration-200">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg">{table.name}</CardTitle>
                <div className="flex space-x-2">
                  <Button size="sm" variant="ghost">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    className="text-red-600 hover:text-red-700"
                    onClick={() => handleDeleteTable(table.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Capacity</span>
                  <span className="font-medium">{table.capacity}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Status</span>
                  <Badge className={getStatusColor(table.status)}>
                    {table.status}
                  </Badge>
                </div>
                <div className="flex justify-end space-x-2">
                  {table.status === 'available' && (
                    <Button 
                      size="sm" 
                      className="bg-red-600 hover:bg-red-700"
                      onClick={() => handleStatusChange(table.id, 'occupied')}
                    >
                      Mark Occupied
                    </Button>
                  )}
                  {table.status === 'occupied' && (
                    <Button 
                      size="sm" 
                      className="bg-green-600 hover:bg-green-700"
                      onClick={() => handleStatusChange(table.id, 'available')}
                    >
                      Mark Available
                    </Button>
                  )}
                   {table.status === 'available' && (
                    <Button 
                      size="sm" 
                      className="bg-yellow-500 hover:bg-yellow-600"
                      onClick={() => handleStatusChange(table.id, 'reserved')}
                    >
                      Mark Reserved
                    </Button>
                  )}
                   {table.status === 'reserved' && (
                    <Button 
                      size="sm" 
                      className="bg-green-600 hover:bg-green-700"
                      onClick={() => handleStatusChange(table.id, 'available')}
                    >
                      Mark Available
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredTables.length === 0 && (
        <Card className="text-center py-12">
          <CardContent>
            <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No tables found</p>
            <p className="text-gray-400 mt-2">Try adjusting your search</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
