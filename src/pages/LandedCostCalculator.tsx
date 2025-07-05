
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Calculator, TrendingUp, Truck, DollarSign } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

const LandedCostCalculator = () => {
  const [formData, setFormData] = useState({
    productValue: "",
    quantity: "",
    hsCode: "",
    originCountry: "",
    destinationCountry: "",
    shippingMode: "",
    weight: "",
    dimensions: ""
  });

  const [results, setResults] = useState<any>(null);

  const calculateCost = () => {
    const baseValue = parseFloat(formData.productValue) || 0;
    const qty = parseInt(formData.quantity) || 1;
    const totalValue = baseValue * qty;
    
    // Mock calculations - in real app, these would be API calls
    const duties = totalValue * 0.085; // 8.5% duty rate
    const taxes = totalValue * 0.12; // 12% tax rate
    const shipping = 450; // Fixed shipping cost
    const insurance = totalValue * 0.005; // 0.5% insurance
    const brokerage = 150; // Fixed brokerage fee
    const other = 75; // Other fees
    
    const totalLandedCost = totalValue + duties + taxes + shipping + insurance + brokerage + other;
    
    setResults({
      productValue: totalValue,
      duties,
      taxes,
      shipping,
      insurance,
      brokerage,
      other,
      totalLandedCost,
      breakdown: [
        { name: 'Product Value', value: totalValue, color: '#3B82F6' },
        { name: 'Duties', value: duties, color: '#EF4444' },
        { name: 'Taxes', value: taxes, color: '#F59E0B' },
        { name: 'Shipping', value: shipping, color: '#10B981' },
        { name: 'Insurance', value: insurance, color: '#8B5CF6' },
        { name: 'Fees', value: brokerage + other, color: '#6B7280' }
      ]
    });
  };

  const comparisonData = [
    { mode: 'Air', cost: 12450, time: '3-5 days' },
    { mode: 'Sea', cost: 8920, time: '15-20 days' },
    { mode: 'Express', cost: 15600, time: '1-2 days' },
    { mode: 'Ground', cost: 7800, time: '7-10 days' }
  ];

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-full">
      <div className="animate-fade-in">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Landed Cost Calculator</h1>
        <p className="text-gray-600">Calculate total landed costs including duties, taxes, and logistics</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card className="animate-slide-up">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calculator className="h-5 w-5" />
                <span>Cost Calculation</span>
              </CardTitle>
              <CardDescription>
                Enter product and shipping details to calculate landed cost
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="productValue">Product Value (USD)</Label>
                  <Input
                    id="productValue"
                    type="number"
                    placeholder="10000"
                    value={formData.productValue}
                    onChange={(e) => setFormData({...formData, productValue: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="quantity">Quantity</Label>
                  <Input
                    id="quantity"
                    type="number"
                    placeholder="100"
                    value={formData.quantity}
                    onChange={(e) => setFormData({...formData, quantity: e.target.value})}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="hsCode">HS Code</Label>
                  <Input
                    id="hsCode"
                    placeholder="8471.30.01"
                    value={formData.hsCode}
                    onChange={(e) => setFormData({...formData, hsCode: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="weight">Weight (kg)</Label>
                  <Input
                    id="weight"
                    type="number"
                    placeholder="500"
                    value={formData.weight}
                    onChange={(e) => setFormData({...formData, weight: e.target.value})}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Origin Country</Label>
                  <Select onValueChange={(value) => setFormData({...formData, originCountry: value})}>
                    <SelectTrigger className="bg-white">
                      <SelectValue placeholder="Select origin country" />
                    </SelectTrigger>
                    <SelectContent className="bg-white z-50">
                      <SelectItem value="cn">China</SelectItem>
                      <SelectItem value="de">Germany</SelectItem>
                      <SelectItem value="jp">Japan</SelectItem>
                      <SelectItem value="us">United States</SelectItem>
                      <SelectItem value="mx">Mexico</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Destination Country</Label>
                  <Select onValueChange={(value) => setFormData({...formData, destinationCountry: value})}>
                    <SelectTrigger className="bg-white">
                      <SelectValue placeholder="Select destination" />
                    </SelectTrigger>
                    <SelectContent className="bg-white z-50">
                      <SelectItem value="us">United States</SelectItem>
                      <SelectItem value="ca">Canada</SelectItem>
                      <SelectItem value="gb">United Kingdom</SelectItem>
                      <SelectItem value="de">Germany</SelectItem>
                      <SelectItem value="au">Australia</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Shipping Mode</Label>
                <Select onValueChange={(value) => setFormData({...formData, shippingMode: value})}>
                  <SelectTrigger className="bg-white">
                    <SelectValue placeholder="Select shipping mode" />
                  </SelectTrigger>
                  <SelectContent className="bg-white z-50">
                    <SelectItem value="air">Air Freight</SelectItem>
                    <SelectItem value="sea">Sea Freight</SelectItem>
                    <SelectItem value="express">Express Courier</SelectItem>
                    <SelectItem value="ground">Ground Transport</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button onClick={calculateCost} className="w-full" size="lg">
                <Calculator className="h-4 w-4 mr-2" />
                Calculate Landed Cost
              </Button>
            </CardContent>
          </Card>

          {results && (
            <Card className="animate-fade-in">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <DollarSign className="h-5 w-5" />
                  <span>Cost Breakdown</span>
                </CardTitle>
                <CardDescription>
                  Detailed breakdown of your total landed cost
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">
                      ${results.productValue.toLocaleString()}
                    </div>
                    <div className="text-sm text-blue-800">Product Value</div>
                  </div>
                  <div className="text-center p-4 bg-red-50 rounded-lg">
                    <div className="text-2xl font-bold text-red-600">
                      ${results.duties.toLocaleString()}
                    </div>
                    <div className="text-sm text-red-800">Duties (8.5%)</div>
                  </div>
                  <div className="text-center p-4 bg-yellow-50 rounded-lg">
                    <div className="text-2xl font-bold text-yellow-600">
                      ${results.taxes.toLocaleString()}
                    </div>
                    <div className="text-sm text-yellow-800">Taxes (12%)</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">
                      ${results.shipping.toLocaleString()}
                    </div>
                    <div className="text-sm text-green-800">Shipping</div>
                  </div>
                </div>

                <Separator />

                <div className="text-center p-6 bg-primary/5 rounded-lg border-2 border-primary/20">
                  <div className="text-3xl font-bold text-primary">
                    ${results.totalLandedCost.toLocaleString()}
                  </div>
                  <div className="text-lg text-primary/80">Total Landed Cost</div>
                  <div className="text-sm text-gray-600 mt-2">
                    {((results.totalLandedCost - results.productValue) / results.productValue * 100).toFixed(1)}% 
                    markup from product value
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Cost Distribution</h3>
                    <ResponsiveContainer width="100%" height={200}>
                      <PieChart>
                        <Pie
                          data={results.breakdown}
                          cx="50%"
                          cy="50%"
                          innerRadius={50}
                          outerRadius={80}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {results.breakdown.map((entry: any, index: number) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value: any) => `$${value.toLocaleString()}`} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold">Cost Components</h3>
                    {results.breakdown.map((item: any, index: number) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div 
                            className="w-3 h-3 rounded-full" 
                            style={{ backgroundColor: item.color }}
                          />
                          <span className="text-sm">{item.name}</span>
                        </div>
                        <span className="font-medium">${item.value.toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Truck className="h-5 w-5" />
                <span>Shipping Comparison</span>
              </CardTitle>
              <CardDescription>Compare costs across shipping modes</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={comparisonData} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="mode" type="category" width={60} />
                  <Tooltip formatter={(value: any) => `$${value.toLocaleString()}`} />
                  <Bar dataKey="cost" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
              <div className="mt-4 space-y-2">
                {comparisonData.map((mode, index) => (
                  <div key={index} className="flex justify-between text-sm">
                    <span>{mode.mode}</span>
                    <span className="text-gray-600">{mode.time}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5" />
                <span>Cost Optimization Tips</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-3 bg-green-50 rounded-lg border-l-4 border-green-500">
                <p className="text-sm text-green-800">
                  <strong>Consolidation:</strong> Combine shipments to reduce per-unit shipping costs
                </p>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                <p className="text-sm text-blue-800">
                  <strong>Mode Selection:</strong> Sea freight can save 40-60% vs air for non-urgent items
                </p>
              </div>
              <div className="p-3 bg-yellow-50 rounded-lg border-l-4 border-yellow-500">
                <p className="text-sm text-yellow-800">
                  <strong>Free Trade Zones:</strong> Consider FTZ processing to defer duties
                </p>
              </div>
              <div className="p-3 bg-purple-50 rounded-lg border-l-4 border-purple-500">
                <p className="text-sm text-purple-800">
                  <strong>Trade Agreements:</strong> Verify eligibility for preferential duty rates
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LandedCostCalculator;
