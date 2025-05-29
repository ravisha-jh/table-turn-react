import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  MoreVertical,
  Mail,
  Phone,
  User,
  Calendar,
  Badge as BadgeIcon
} from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from '@/components/ui/badge';

const initialStaff = [
  {
    id: 1,
    name: 'John Doe',
    role: 'Manager',
    email: 'john.doe@example.com',
    phone: '123-456-7890',
    startDate: '2022-08-15',
    status: 'active',
    avatarUrl: 'https://github.com/shadcn.png'
  },
  {
    id: 2,
    name: 'Jane Smith',
    role: 'Chef',
    email: 'jane.smith@example.com',
    phone: '987-654-3210',
    startDate: '2023-01-20',
    status: 'active',
    avatarUrl: 'https://avatars.githubusercontent.com/u/88843?v=4'
  },
  {
    id: 3,
    name: 'Mike Johnson',
    role: 'Waiter',
    email: 'mike.johnson@example.com',
    phone: '555-123-4567',
    startDate: '2023-05-10',
    status: 'inactive',
    avatarUrl: null
  },
  {
    id: 4,
    name: 'Sarah Wilson',
    role: 'Bartender',
    email: 'sarah.wilson@example.com',
    phone: '111-222-3333',
    startDate: '2023-09-01',
    status: 'active',
    avatarUrl: null
  },
  {
    id: 5,
    name: 'David Lee',
    role: 'Dishwasher',
    email: 'david.lee@example.com',
    phone: '444-555-6666',
    startDate: '2023-11-15',
    status: 'active',
    avatarUrl: null
  }
];

const getStatusColor = (status) => {
  switch (status) {
    case 'active': return 'bg-green-100 text-green-800';
    case 'inactive': return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

export const StaffManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('all');
  const [staff, setStaff] = useState(initialStaff);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingStaff, setEditingStaff] = useState(null);

  const filteredStaff = staff.filter(employee => {
    const matchesSearch = employee.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = selectedRole === 'all' || employee.role === selectedRole;
    return matchesSearch && matchesRole;
  });

  const roles = ['all', 'Manager', 'Chef', 'Waiter', 'Bartender', 'Dishwasher'];

  const handleEdit = (staffMember) => {
    setEditingStaff(staffMember);
    setIsAddDialogOpen(true);
  };

  const handleDelete = (staffId) => {
    setStaff(staff.filter(staffMember => staffMember.id !== staffId));
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Staff Management</h1>
          <p className="text-gray-600 mt-2">Manage restaurant staff members and their roles.</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-orange-600 hover:bg-orange-700">
              <Plus className="h-4 w-4 mr-2" />
              Add Staff
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>{editingStaff ? 'Edit Staff Member' : 'Add New Staff Member'}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="staffName">Staff Name</Label>
                <Input 
                  id="staffName" 
                  placeholder="Enter staff name" 
                  defaultValue={editingStaff?.name || ''}
                />
              </div>
              <div>
                <Label htmlFor="role">Role</Label>
                <Select defaultValue={editingStaff?.role || ''}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Manager">Manager</SelectItem>
                    <SelectItem value="Chef">Chef</SelectItem>
                    <SelectItem value="Waiter">Waiter</SelectItem>
                    <SelectItem value="Bartender">Bartender</SelectItem>
                    <SelectItem value="Dishwasher">Dishwasher</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="staff@example.com" 
                  defaultValue={editingStaff?.email || ''}
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input 
                  id="phone" 
                  type="tel" 
                  placeholder="123-456-7890" 
                  defaultValue={editingStaff?.phone || ''}
                />
              </div>
              <div>
                <Label htmlFor="startDate">Start Date</Label>
                <Input 
                  id="startDate" 
                  type="date" 
                  defaultValue={editingStaff?.startDate || ''}
                />
              </div>
              <div className="flex space-x-2 pt-4">
                <Button className="flex-1 bg-orange-600 hover:bg-orange-700">
                  {editingStaff ? 'Update Staff' : 'Add Staff'}
                </Button>
                <Button 
                  variant="outline" 
                  className="flex-1" 
                  onClick={() => {
                    setIsAddDialogOpen(false);
                    setEditingStaff(null);
                  }}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            type="search"
            placeholder="Search staff members..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={selectedRole} onValueChange={setSelectedRole}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Filter by role" />
          </SelectTrigger>
          <SelectContent>
            {roles.map((role) => (
              <SelectItem key={role} value={role}>
                {role === 'all' ? 'All Roles' : role}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Staff Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStaff.map((employee) => (
          <Card key={employee.id} className="hover:shadow-lg transition-shadow duration-200">
            <CardHeader className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Avatar>
                  {employee.avatarUrl ? (
                    <AvatarImage src={employee.avatarUrl} alt={employee.name} />
                  ) : (
                    <AvatarFallback>{employee.name.charAt(0)}</AvatarFallback>
                  )}
                </Avatar>
                <div>
                  <CardTitle className="text-lg">{employee.name}</CardTitle>
                  <p className="text-sm text-gray-600">{employee.role}</p>
                </div>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuItem onClick={() => handleEdit(employee)}>
                    <Edit className="mr-2 h-4 w-4" /> Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-red-600" onClick={() => handleDelete(employee.id)}>
                    <Trash2 className="mr-2 h-4 w-4" /> Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-gray-500" />
                <a href={`mailto:${employee.email}`} className="text-sm text-gray-600 hover:text-gray-900">
                  {employee.email}
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-600">{employee.phone}</span>
              </div>
              <div className="flex items-center space-x-2">
                <User className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-600">Start Date: {new Date(employee.startDate).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center space-x-2">
                <BadgeIcon className="h-4 w-4 text-gray-500" />
                <Badge className={getStatusColor(employee.status)}>
                  {employee.status}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredStaff.length === 0 && (
        <Card className="text-center py-12">
          <CardContent>
            <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No staff members found</p>
            <p className="text-gray-400 mt-2">Try adjusting your search or filters</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
