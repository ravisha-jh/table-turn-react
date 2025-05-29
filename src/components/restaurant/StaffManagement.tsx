
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
  Phone, 
  Mail,
  Calendar,
  Clock,
  User
} from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const staff = [
  {
    id: 1,
    name: 'Alice Johnson',
    role: 'Chef',
    email: 'alice@restaurant.com',
    phone: '+91 98765 43210',
    shift: 'Morning',
    status: 'active',
    hiredDate: '2023-01-15',
    salary: 45000,
    avatar: '/placeholder.svg'
  },
  {
    id: 2,
    name: 'Bob Smith',
    role: 'Waiter',
    email: 'bob@restaurant.com',
    phone: '+91 98765 43211',
    shift: 'Evening',
    status: 'active',
    hiredDate: '2023-03-20',
    salary: 28000,
    avatar: '/placeholder.svg'
  },
  {
    id: 3,
    name: 'Carol Davis',
    role: 'Manager',
    email: 'carol@restaurant.com',
    phone: '+91 98765 43212',
    shift: 'Full Day',
    status: 'active',
    hiredDate: '2022-11-10',
    salary: 60000,
    avatar: '/placeholder.svg'
  },
  {
    id: 4,
    name: 'David Wilson',
    role: 'Bartender',
    email: 'david@restaurant.com',
    phone: '+91 98765 43213',
    shift: 'Evening',
    status: 'on-leave',
    hiredDate: '2023-05-08',
    salary: 35000,
    avatar: '/placeholder.svg'
  },
  {
    id: 5,
    name: 'Eva Brown',
    role: 'Waitress',
    email: 'eva@restaurant.com',
    phone: '+91 98765 43214',
    shift: 'Morning',
    status: 'active',
    hiredDate: '2023-07-12',
    salary: 28000,
    avatar: '/placeholder.svg'
  },
  {
    id: 6,
    name: 'Frank Miller',
    role: 'Kitchen Assistant',
    email: 'frank@restaurant.com',
    phone: '+91 98765 43215',
    shift: 'Full Day',
    status: 'active',
    hiredDate: '2023-09-01',
    salary: 25000,
    avatar: '/placeholder.svg'
  }
];

const getRoleColor = (role: string) => {
  switch (role.toLowerCase()) {
    case 'chef': return 'bg-red-100 text-red-800';
    case 'manager': return 'bg-purple-100 text-purple-800';
    case 'waiter': case 'waitress': return 'bg-blue-100 text-blue-800';
    case 'bartender': return 'bg-green-100 text-green-800';
    case 'kitchen assistant': return 'bg-orange-100 text-orange-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'active': return 'bg-green-100 text-green-800';
    case 'on-leave': return 'bg-yellow-100 text-yellow-800';
    case 'inactive': return 'bg-gray-100 text-gray-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

export const StaffManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const filteredStaff = staff.filter(person =>
    person.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    person.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const activeStaff = staff.filter(person => person.status === 'active').length;
  const totalStaff = staff.length;
  const avgSalary = Math.round(staff.reduce((sum, person) => sum + person.salary, 0) / staff.length);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Staff Management</h1>
          <p className="text-gray-600 mt-2">Manage restaurant employees and their information.</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-orange-600 hover:bg-orange-700">
              <Plus className="h-4 w-4 mr-2" />
              Add Staff Member
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Add New Staff Member</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" placeholder="Enter full name" />
              </div>
              <div>
                <Label htmlFor="role">Role</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="chef">Chef</SelectItem>
                    <SelectItem value="waiter">Waiter</SelectItem>
                    <SelectItem value="waitress">Waitress</SelectItem>
                    <SelectItem value="bartender">Bartender</SelectItem>
                    <SelectItem value="manager">Manager</SelectItem>
                    <SelectItem value="assistant">Kitchen Assistant</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="Enter email address" />
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" placeholder="+91 98765 43210" />
              </div>
              <div>
                <Label htmlFor="shift">Shift</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select shift" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="morning">Morning</SelectItem>
                    <SelectItem value="evening">Evening</SelectItem>
                    <SelectItem value="full-day">Full Day</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="salary">Monthly Salary (₹)</Label>
                <Input id="salary" type="number" placeholder="0" />
              </div>
              <div className="flex space-x-2 pt-4">
                <Button className="flex-1 bg-orange-600 hover:bg-orange-700">Add Staff</Button>
                <Button variant="outline" className="flex-1" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-blue-600">{totalStaff}</div>
            <p className="text-sm text-gray-600">Total Staff</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-green-600">{activeStaff}</div>
            <p className="text-sm text-gray-600">Active Staff</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-orange-600">₹{avgSalary.toLocaleString()}</div>
            <p className="text-sm text-gray-600">Average Salary</p>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          type="search"
          placeholder="Search staff members..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Staff Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStaff.map((person) => (
          <Card key={person.id} className="hover:shadow-lg transition-shadow duration-200">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                    <User className="h-6 w-6 text-gray-500" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{person.name}</CardTitle>
                    <Badge className={getRoleColor(person.role)}>
                      {person.role}
                    </Badge>
                  </div>
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
              <div className="space-y-3">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Mail className="h-4 w-4" />
                  <span>{person.email}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Phone className="h-4 w-4" />
                  <span>{person.phone}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Clock className="h-4 w-4" />
                  <span>{person.shift} Shift</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Calendar className="h-4 w-4" />
                  <span>Hired: {new Date(person.hiredDate).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t">
                  <span className="font-semibold text-green-600">₹{person.salary.toLocaleString()}/month</span>
                  <Badge className={getStatusColor(person.status)}>
                    {person.status.replace('-', ' ')}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredStaff.length === 0 && (
        <Card className="text-center py-12">
          <CardContent>
            <p className="text-gray-500 text-lg">No staff members found</p>
            <p className="text-gray-400 mt-2">Try adjusting your search term</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
