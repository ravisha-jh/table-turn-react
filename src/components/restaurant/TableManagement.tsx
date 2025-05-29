
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  Clock, 
  Plus,
  Edit,
  Check,
  X
} from 'lucide-react';
import { cn } from '@/lib/utils';

const tables = [
  { id: 1, number: 'T-01', capacity: 2, status: 'available', customer: null, reservedTime: null, occupiedSince: null },
  { id: 2, number: 'T-02', capacity: 4, status: 'occupied', customer: 'John Doe', reservedTime: null, occupiedSince: '2 hours ago' },
  { id: 3, number: 'T-03', capacity: 6, status: 'reserved', customer: 'Jane Smith', reservedTime: '7:30 PM', occupiedSince: null },
  { id: 4, number: 'T-04', capacity: 2, status: 'available', customer: null, reservedTime: null, occupiedSince: null },
  { id: 5, number: 'T-05', capacity: 4, status: 'occupied', customer: 'Mike Johnson', reservedTime: null, occupiedSince: '45 min ago' },
  { id: 6, number: 'T-06', capacity: 8, status: 'cleaning', customer: null, reservedTime: null, occupiedSince: null },
  { id: 7, number: 'T-07', capacity: 2, status: 'available', customer: null, reservedTime: null, occupiedSince: null },
  { id: 8, number: 'T-08', capacity: 4, status: 'reserved', customer: 'Sarah Wilson', reservedTime: '8:00 PM', occupiedSince: null },
  { id: 9, number: 'T-09', capacity: 6, status: 'available', customer: null, reservedTime: null, occupiedSince: null },
  { id: 10, number: 'T-10', capacity: 4, status: 'occupied', customer: 'David Brown', reservedTime: null, occupiedSince: '1 hour ago' },
  { id: 11, number: 'T-11', capacity: 2, status: 'available', customer: null, reservedTime: null, occupiedSince: null },
  { id: 12, number: 'T-12', capacity: 8, status: 'available', customer: null, reservedTime: null, occupiedSince: null },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'available': return 'bg-green-500';
    case 'occupied': return 'bg-red-500';
    case 'reserved': return 'bg-yellow-500';
    case 'cleaning': return 'bg-gray-500';
    default: return 'bg-gray-500';
  }
};

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'available': return 'bg-green-100 text-green-800';
    case 'occupied': return 'bg-red-100 text-red-800';
    case 'reserved': return 'bg-yellow-100 text-yellow-800';
    case 'cleaning': return 'bg-gray-100 text-gray-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

export const TableManagement = () => {
  const [selectedTable, setSelectedTable] = useState<number | null>(null);

  const availableTables = tables.filter(table => table.status === 'available').length;
  const occupiedTables = tables.filter(table => table.status === 'occupied').length;
  const reservedTables = tables.filter(table => table.status === 'reserved').length;

  const TableCard = ({ table }: { table: any }) => (
    <Card 
      className={cn(
        "relative cursor-pointer transition-all duration-200 hover:shadow-lg",
        selectedTable === table.id && "ring-2 ring-orange-500"
      )}
      onClick={() => setSelectedTable(selectedTable === table.id ? null : table.id)}
    >
      <div className={cn("absolute top-2 right-2 w-3 h-3 rounded-full", getStatusColor(table.status))} />
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between">
          <span>{table.number}</span>
          <div className="flex items-center text-gray-600">
            <Users className="h-4 w-4 mr-1" />
            <span className="text-sm">{table.capacity}</span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <Badge className={getStatusBadge(table.status)}>
            {table.status.charAt(0).toUpperCase() + table.status.slice(1)}
          </Badge>
          
          {table.customer && (
            <div>
              <p className="text-sm font-medium text-gray-900">{table.customer}</p>
              {table.occupiedSince && (
                <div className="flex items-center text-xs text-gray-600 mt-1">
                  <Clock className="h-3 w-3 mr-1" />
                  {table.occupiedSince}
                </div>
              )}
              {table.reservedTime && (
                <div className="flex items-center text-xs text-gray-600 mt-1">
                  <Clock className="h-3 w-3 mr-1" />
                  Reserved for {table.reservedTime}
                </div>
              )}
            </div>
          )}

          {selectedTable === table.id && (
            <div className="flex space-x-2 pt-2 border-t">
              {table.status === 'available' && (
                <>
                  <Button size="sm" className="flex-1 bg-blue-600 hover:bg-blue-700">
                    Seat Customer
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1">
                    Reserve
                  </Button>
                </>
              )}
              {table.status === 'occupied' && (
                <>
                  <Button size="sm" className="flex-1 bg-green-600 hover:bg-green-700">
                    <Check className="h-4 w-4 mr-1" />
                    Check Out
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1">
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                </>
              )}
              {table.status === 'reserved' && (
                <>
                  <Button size="sm" className="flex-1 bg-green-600 hover:bg-green-700">
                    <Check className="h-4 w-4 mr-1" />
                    Confirm
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1">
                    <X className="h-4 w-4 mr-1" />
                    Cancel
                  </Button>
                </>
              )}
              {table.status === 'cleaning' && (
                <Button size="sm" className="w-full bg-green-600 hover:bg-green-700">
                  <Check className="h-4 w-4 mr-1" />
                  Mark Clean
                </Button>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Table Management</h1>
          <p className="text-gray-600 mt-2">Monitor and manage restaurant tables and reservations.</p>
        </div>
        <Button className="bg-orange-600 hover:bg-orange-700">
          <Plus className="h-4 w-4 mr-2" />
          Add Reservation
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">{availableTables}</div>
            <p className="text-sm text-gray-600">Available Tables</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-red-600">{occupiedTables}</div>
            <p className="text-sm text-gray-600">Occupied Tables</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-yellow-600">{reservedTables}</div>
            <p className="text-sm text-gray-600">Reserved Tables</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-600">{Math.round((occupiedTables / tables.length) * 100)}%</div>
            <p className="text-sm text-gray-600">Occupancy Rate</p>
          </CardContent>
        </Card>
      </div>

      {/* Tables Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        {tables.map((table) => (
          <TableCard key={table.id} table={table} />
        ))}
      </div>

      {/* Legend */}
      <Card>
        <CardHeader>
          <CardTitle>Status Legend</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full" />
              <span className="text-sm">Available</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full" />
              <span className="text-sm">Occupied</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-yellow-500 rounded-full" />
              <span className="text-sm">Reserved</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-gray-500 rounded-full" />
              <span className="text-sm">Cleaning</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
