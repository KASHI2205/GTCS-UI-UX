
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { Settings, CheckCircle, Clock, AlertTriangle } from "lucide-react";

const integrations = [
  {
    name: "SAP GTS",
    description: "Global Trade Services integration for automated compliance",
    status: "Connected",
    lastSync: "2024-07-05 10:30",
    health: 98,
    features: ["Compliance Engine", "Restricted Party Screening", "License Management"]
  },
  {
    name: "Oracle GTM",
    description: "Global Trade Management for supply chain compliance",
    status: "Connected",
    lastSync: "2024-07-05 09:45",
    health: 95,
    features: ["Trade Compliance", "Duty Calculation", "Preferential Treatment"]
  },
  {
    name: "Microsoft Dynamics",
    description: "ERP integration for seamless trade data flow",
    status: "Disconnected",
    lastSync: "2024-07-04 16:20",
    health: 0,
    features: ["Financial Data", "Product Information", "Customer Management"]
  },
  {
    name: "Descartes",
    description: "Logistics and transportation management",
    status: "Connected",
    lastSync: "2024-07-05 11:15",
    health: 89,
    features: ["Shipping Management", "Route Optimization", "Carrier Integration"]
  },
  {
    name: "CargoWise",
    description: "Comprehensive logistics platform integration",
    status: "Pending",
    lastSync: "Never",
    health: 0,
    features: ["Freight Management", "Documentation", "Customs Clearance"]
  },
  {
    name: "Amber Road",
    description: "Trade management and compliance platform",
    status: "Connected",
    lastSync: "2024-07-05 08:30",
    health: 92,
    features: ["Global Trade Content", "Export Controls", "Free Trade Agreements"]
  }
];

const apiEndpoints = [
  {
    name: "Tariff Classification API",
    endpoint: "/api/v1/classification",
    status: "Active",
    requests: "2,847",
    avgResponse: "145ms"
  },
  {
    name: "Sanctions Screening API",
    endpoint: "/api/v1/screening",
    status: "Active", 
    requests: "15,634",
    avgResponse: "89ms"
  },
  {
    name: "Duty Calculation API",
    endpoint: "/api/v1/duties",
    status: "Active",
    requests: "5,923",
    avgResponse: "203ms"
  },
  {
    name: "License Check API",
    endpoint: "/api/v1/licenses",
    status: "Maintenance",
    requests: "1,456",
    avgResponse: "312ms"
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "Connected": return "bg-success text-success-foreground";
    case "Active": return "bg-success text-success-foreground";
    case "Disconnected": return "bg-destructive text-destructive-foreground";
    case "Pending": return "bg-warning text-warning-foreground";
    case "Maintenance": return "bg-warning text-warning-foreground";
    default: return "bg-gray-500 text-white";
  }
};

const getHealthColor = (health: number) => {
  if (health >= 95) return "text-success";
  if (health >= 80) return "text-warning";
  return "text-destructive";
};

const Integrations = () => {
  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-full">
      <div className="animate-fade-in">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">System Integrations</h1>
        <p className="text-gray-600">Manage ERP, TMS, and third-party system integrations</p>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 animate-slide-up">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-success" />
              <div>
                <div className="text-2xl font-bold text-success">4</div>
                <div className="text-sm text-gray-600">Connected</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-warning" />
              <div>
                <div className="text-2xl font-bold text-warning">1</div>
                <div className="text-sm text-gray-600">Pending</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-4 w-4 text-destructive" />
              <div>
                <div className="text-2xl font-bold text-destructive">1</div>
                <div className="text-sm text-gray-600">Disconnected</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Settings className="h-4 w-4 text-info" />
              <div>
                <div className="text-2xl font-bold text-info">93%</div>
                <div className="text-sm text-gray-600">Avg Health</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ERP & TMS Integrations */}
      <Card className="animate-fade-in">
        <CardHeader>
          <CardTitle>ERP & TMS Integrations</CardTitle>
          <CardDescription>
            Enterprise resource planning and transportation management system connections
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {integrations.map((integration, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{integration.name}</h3>
                      <p className="text-sm text-gray-600">{integration.description}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={getStatusColor(integration.status)}>
                        {integration.status}
                      </Badge>
                      <Switch checked={integration.status === "Connected"} />
                    </div>
                  </div>

                  {integration.health > 0 && (
                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-1">
                        <span>System Health</span>
                        <span className={getHealthColor(integration.health)}>
                          {integration.health}%
                        </span>
                      </div>
                      <Progress value={integration.health} className="h-2" />
                    </div>
                  )}

                  <div className="space-y-2 mb-4">
                    <div className="text-sm">
                      <span className="font-medium">Last Sync:</span>
                      <span className="ml-2 text-gray-600">{integration.lastSync}</span>
                    </div>
                    <div className="text-sm">
                      <span className="font-medium">Features:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {integration.features.map((feature, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Settings className="h-3 w-3 mr-1" />
                      Configure
                    </Button>
                    <Button variant="outline" size="sm">
                      Test Connection
                    </Button>
                    {integration.status === "Disconnected" && (
                      <Button size="sm">
                        Reconnect
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* API Management */}
      <Card className="animate-fade-in">
        <CardHeader>
          <CardTitle>API Management</CardTitle>
          <CardDescription>
            Monitor and manage API endpoints and performance
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3 font-medium">API Endpoint</th>
                  <th className="text-left p-3 font-medium">Status</th>
                  <th className="text-left p-3 font-medium">Requests (24h)</th>
                  <th className="text-left p-3 font-medium">Avg Response</th>
                  <th className="text-left p-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {apiEndpoints.map((api, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50 transition-colors">
                    <td className="p-3">
                      <div>
                        <div className="font-medium">{api.name}</div>
                        <div className="text-sm text-gray-600 font-mono">{api.endpoint}</div>
                      </div>
                    </td>
                    <td className="p-3">
                      <Badge className={getStatusColor(api.status)}>
                        {api.status}
                      </Badge>
                    </td>
                    <td className="p-3 font-medium">{api.requests}</td>
                    <td className="p-3">{api.avgResponse}</td>
                    <td className="p-3">
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="sm">Monitor</Button>
                        <Button variant="ghost" size="sm">Docs</Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Integration Setup Guide */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="animate-fade-in">
          <CardHeader>
            <CardTitle>Quick Setup Guide</CardTitle>
            <CardDescription>Step-by-step integration instructions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">
                  1
                </div>
                <div>
                  <h4 className="font-medium">Configure Authentication</h4>
                  <p className="text-sm text-gray-600">Set up API keys and connection credentials</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">
                  2
                </div>
                <div>
                  <h4 className="font-medium">Map Data Fields</h4>
                  <p className="text-sm text-gray-600">Configure field mappings between systems</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">
                  3
                </div>
                <div>
                  <h4 className="font-medium">Test Integration</h4>
                  <p className="text-sm text-gray-600">Verify data flow and connectivity</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-success text-success-foreground rounded-full flex items-center justify-center text-sm font-medium">
                  ✓
                </div>
                <div>
                  <h4 className="font-medium">Go Live</h4>
                  <p className="text-sm text-gray-600">Activate real-time synchronization</p>
                </div>
              </div>
            </div>
            <Button className="w-full">
              Start New Integration
            </Button>
          </CardContent>
        </Card>

        <Card className="animate-fade-in">
          <CardHeader>
            <CardTitle>System Monitoring</CardTitle>
            <CardDescription>Real-time system health and alerts</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="p-3 bg-green-50 rounded-lg border-l-4 border-green-500">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-green-900">All Systems Operational</p>
                    <p className="text-sm text-green-700">Data sync running smoothly</p>
                  </div>
                  <CheckCircle className="h-5 w-5 text-green-600" />
                </div>
              </div>
              
              <div className="p-3 bg-yellow-50 rounded-lg border-l-4 border-yellow-500">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-yellow-900">License API Maintenance</p>
                    <p className="text-sm text-yellow-700">Scheduled maintenance in progress</p>
                  </div>
                  <Clock className="h-5 w-5 text-yellow-600" />
                </div>
              </div>
              
              <div className="p-3 bg-red-50 rounded-lg border-l-4 border-red-500">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-red-900">Dynamics Connection Lost</p>
                    <p className="text-sm text-red-700">Connection failed at 16:20 yesterday</p>
                  </div>
                  <AlertTriangle className="h-5 w-5 text-red-600" />
                </div>
              </div>
            </div>
            
            <Button variant="outline" className="w-full">
              View Full System Log
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Integrations;
