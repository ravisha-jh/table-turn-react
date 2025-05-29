
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  User, 
  MapPin,
  DollarSign,
  Eye
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const orders = [
  {
    id: '#001',
    customer: 'John Doe',
    items: [
      { name: 'Classic Burger', quantity: 2, price: 1039 },
      { name: 'Fries', quantity: 2, price: 399 }
    ],
    total: 2876,
    status: 'pending',
    type: 'dine-in',
    table: 'Table 5',
    time: '2 min ago',
    estimatedTime: 15
  },
  {
    id: '#002',
    customer: 'Jane Smith',
    items: [
      { name: 'Margherita Pizza', quantity: 1, price: 1199 },
      { name: 'Coke', quantity: 2, price: 239 }
    ],
    total: 1677,
    status: 'preparing',
    type: 'takeaway',
    table: null,
    time: '5 min ago',
    estimatedTime: 10
  },
  {
    id: '#003',
    customer: 'Mike Johnson',
    items: [
      { name: 'Caesar Salad', quantity: 1, price: 719 },
      { name: 'Grilled Chicken', quantity: 1, price: 1359 }
    ],
    total: 2078,
    status: 'ready',
    type: 'delivery',
    address: '123 Main St, City',
    time: '8 min ago',
    estimatedTime: 5
  },
  {
    id: '#004',
    customer: 'Sarah Wilson',
    items: [
      { name: 'Steak', quantity: 1, price: 1999 },
      { name: 'Wine', quantity: 1, price: 1039 }
    ],
    total: 3038,
    status: 'completed',
    type: 'dine-in',
    table: 'Table 12',
    time: '25 min ago',
    estimatedTime: 0
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'pending': return 'bg-yellow-100 text-yellow-800';
    case 'preparing': return 'bg-blue-100 text-blue-800';
    case 'ready': return 'bg-green-100 text-green-800';
    case 'completed': return 'bg-gray-100 text-gray-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'pending': return <AlertCircle className="h-4 w-4" />;
    case 'preparing': return <Clock className="h-4 w-4" />;
    case 'ready': return <CheckCircle className="h-4 w-4" />;
    case 'completed': return <CheckCircle className="h-4 w-4" />;
    default: return <Clock className="h-4 w-4" />;
  }
};

export const OrdersManagement = () => {
  const [selectedTab, setSelectedTab] = useState('all');

  const filterOrdersByStatus = (status: string) => {
    if (status === 'all') return orders;
    return orders.filter(order => order.status === status);
  };

  const OrderCard = ({ order }: { order: any }) => (
    <Card className="hover:shadow-lg transition-shadow duration-200">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{order.id}</CardTitle>
            <div className="flex items-center space-x-2 mt-1">
              <User className="h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-600">{order.customer}</span>
            </div>
          </div>
          <div className="flex flex-col items-end space-y-2">
            <Badge className={getStatusColor(order.status)}>
              {getStatusIcon(order.status)}
              <span className="ml-1 capitalize">{order.status}</span>
            </Badge>
            <span className="text-xs text-gray-500">{order.time}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div>
            {order.items.map((item: any, index: number) => (
              <div key={index} className="flex justify-between text-sm">
                <span>{item.quantity}x {item.name}</span>
                <span>₹{(item.price * item.quantity).toFixed(0)}</span>
              </div>
            ))}
          </div>
          
          <div className="border-t pt-3">
            <div className="flex justify-between items-center">
              <div className="flex items-center text-green-600">
                <DollarSign className="h-4 w-4" />
                <span className="font-bold">₹{order.total.toFixed(0)}</span>
              </div>
              {order.status !== 'completed' && (
                <div className="flex items-center text-orange-600">
                  <Clock className="h-4 w-4 mr-1" />
                  <span className="text-sm">{order.estimatedTime}m</span>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center text-sm text-gray-600">
              <Badge variant="outline" className="mr-2">
                {order.type}
              </Badge>
              {order.table && (
                <span>{order.table}</span>
              )}
              {order.address && (
                <div className="flex items-center">
                  <MapPin className="h-3 w-3 mr-1" />
                  <span className="truncate max-w-32">{order.address}</span>
                </div>
              )}
            </div>
            
            <div className="flex space-x-2">
              <Button size="sm" variant="outline">
                <Eye className="h-4 w-4" />
              </Button>
              {order.status === 'pending' && (
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                  Start Preparing
                </Button>
              )}
              {order.status === 'preparing' && (
                <Button size="sm" className="bg-green-600 hover:bg-green-700">
                  Mark Ready
                </Button>
              )}
              {order.status === 'ready' && (
                <Button size="sm" className="bg-gray-600 hover:bg-gray-700">
                  Complete
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Orders Management</h1>
        <p className="text-gray-600 mt-2">Track and manage all restaurant orders in real-time.</p>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="all">All Orders</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="preparing">Preparing</TabsTrigger>
          <TabsTrigger value="ready">Ready</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>

        {['all', 'pending', 'preparing', 'ready', 'completed'].map((status) => (
          <TabsContent key={status} value={status} className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {filterOrdersByStatus(status).map((order) => (
                <OrderCard key={order.id} order={order} />
              ))}
            </div>
            {filterOrdersByStatus(status).length === 0 && (
              <Card className="text-center py-12">
                <CardContent>
                  <p className="text-gray-500 text-lg">No {status === 'all' ? '' : status} orders found</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};
