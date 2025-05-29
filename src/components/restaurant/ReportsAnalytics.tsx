
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Download, 
  TrendingUp, 
  TrendingDown,
  DollarSign,
  ShoppingCart,
  Users,
  Clock
} from 'lucide-react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useState } from 'react';

const monthlyData = [
  { month: 'Jan', revenue: 45000, orders: 1200, customers: 800 },
  { month: 'Feb', revenue: 52000, orders: 1350, customers: 920 },
  { month: 'Mar', revenue: 48000, orders: 1280, customers: 850 },
  { month: 'Apr', revenue: 61000, orders: 1450, customers: 1100 },
  { month: 'May', revenue: 55000, orders: 1380, customers: 980 },
  { month: 'Jun', revenue: 67000, orders: 1520, customers: 1200 }
];

const categoryData = [
  { name: 'Main Course', value: 45, color: '#f97316' },
  { name: 'Appetizers', value: 25, color: '#eab308' },
  { name: 'Desserts', value: 20, color: '#06b6d4' },
  { name: 'Beverages', value: 10, color: '#8b5cf6' }
];

const topItems = [
  { name: 'Classic Burger', orders: 245, revenue: 3185.55, trend: 'up' },
  { name: 'Margherita Pizza', orders: 198, revenue: 2970.02, trend: 'up' },
  { name: 'Caesar Salad', orders: 156, revenue: 1402.44, trend: 'down' },
  { name: 'Grilled Chicken', orders: 134, revenue: 2276.66, trend: 'up' },
  { name: 'Chocolate Cake', orders: 89, revenue: 622.11, trend: 'down' }
];

const hourlyData = [
  { hour: '9AM', orders: 12 },
  { hour: '10AM', orders: 18 },
  { hour: '11AM', orders: 25 },
  { hour: '12PM', orders: 45 },
  { hour: '1PM', orders: 52 },
  { hour: '2PM', orders: 38 },
  { hour: '3PM', orders: 22 },
  { hour: '4PM', orders: 18 },
  { hour: '5PM', orders: 28 },
  { hour: '6PM', orders: 42 },
  { hour: '7PM', orders: 55 },
  { hour: '8PM', orders: 48 },
  { hour: '9PM', orders: 35 },
  { hour: '10PM', orders: 25 }
];

export const ReportsAnalytics = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Reports & Analytics</h1>
          <p className="text-gray-600 mt-2">Comprehensive insights into your restaurant's performance.</p>
        </div>
        <div className="flex space-x-2">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="daily">Daily</SelectItem>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="yearly">Yearly</SelectItem>
            </SelectContent>
          </Select>
          <Button className="bg-orange-600 hover:bg-orange-700">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold text-green-600">$328,000</p>
                <div className="flex items-center text-sm text-green-600 mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +15.3% vs last month
                </div>
              </div>
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Orders</p>
                <p className="text-2xl font-bold text-blue-600">8,180</p>
                <div className="flex items-center text-sm text-blue-600 mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +8.7% vs last month
                </div>
              </div>
              <ShoppingCart className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Unique Customers</p>
                <p className="text-2xl font-bold text-purple-600">5,850</p>
                <div className="flex items-center text-sm text-purple-600 mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +12.1% vs last month
                </div>
              </div>
              <Users className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg Order Time</p>
                <p className="text-2xl font-bold text-orange-600">18 min</p>
                <div className="flex items-center text-sm text-red-600 mt-1">
                  <TrendingDown className="h-3 w-3 mr-1" />
                  -2.3 min vs last month
                </div>
              </div>
              <Clock className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Revenue Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => [`$${value}`, 'Revenue']} />
                <Line type="monotone" dataKey="revenue" stroke="#f97316" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Sales by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Orders by Hour</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={hourlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="hour" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="orders" fill="#f97316" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Menu Items</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topItems.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{item.name}</p>
                    <p className="text-sm text-gray-600">{item.orders} orders</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-green-600">${item.revenue.toFixed(2)}</p>
                    <div className="flex items-center">
                      {item.trend === 'up' ? (
                        <TrendingUp className="h-3 w-3 text-green-600" />
                      ) : (
                        <TrendingDown className="h-3 w-3 text-red-600" />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Additional Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Customer Satisfaction</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="text-4xl font-bold text-yellow-600 mb-2">4.7</div>
              <div className="text-sm text-gray-600 mb-4">Average Rating</div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>5 stars</span>
                  <span>68%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>4 stars</span>
                  <span>22%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>3 stars</span>
                  <span>8%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>2 stars</span>
                  <span>2%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Order Types</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span>Dine-in</span>
                <Badge>45%</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span>Takeaway</span>
                <Badge>35%</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span>Delivery</span>
                <Badge>20%</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Staff Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span>Orders/Staff/Hour</span>
                <span className="font-bold">8.5</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Customer Rating</span>
                <span className="font-bold">4.6</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Efficiency Score</span>
                <Badge className="bg-green-100 text-green-800">92%</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
