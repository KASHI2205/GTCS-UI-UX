
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Search, Upload, CheckCircle, AlertTriangle, Shield, FileText } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const screeningResults = [
  {
    entity: "ABC Trading Corp",
    status: "Clear",
    riskLevel: "Low",
    lists: ["SDN", "BIS DPL", "EU Sanctions"],
    lastChecked: "2024-07-05 10:30"
  },
  {
    entity: "XYZ International Ltd",
    status: "Warning",
    riskLevel: "Medium",
    lists: ["OFAC 50%", "UN Sanctions"],
    lastChecked: "2024-07-05 09:15"
  },
  {
    entity: "Restricted Entity Inc",
    status: "Blocked",
    riskLevel: "High",
    lists: ["SDN Match", "BIS Entity List"],
    lastChecked: "2024-07-05 08:45"
  }
];

const watchlists = [
  { name: "OFAC SDN", count: "12,847", lastUpdate: "Daily", status: "Active" },
  { name: "BIS Entity List", count: "1,234", lastUpdate: "Weekly", status: "Active" },
  { name: "EU Sanctions", count: "2,456", lastUpdate: "Daily", status: "Active" },
  { name: "UN Security Council", count: "987", lastUpdate: "Monthly", status: "Active" },
  { name: "UK Sanctions", count: "1,567", lastUpdate: "Daily", status: "Active" },
];

const ComplianceScreening = () => {
  const [entityName, setEntityName] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);

  const handleSingleScreen = () => {
    setIsScanning(true);
    setScanProgress(0);
    
    const interval = setInterval(() => {
      setScanProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsScanning(false);
          return 100;
        }
        return prev + 20;
      });
    }, 300);
  };

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-full">
      <div className="animate-fade-in">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Compliance Screening</h1>
        <p className="text-gray-600">Screen entities against global watchlists and sanctions databases</p>
      </div>

      <Tabs defaultValue="single" className="space-y-6">
        <TabsList className="bg-white p-1 shadow-sm">
          <TabsTrigger value="single" className="px-6">Single Entity Screening</TabsTrigger>
          <TabsTrigger value="bulk" className="px-6">Bulk Screening</TabsTrigger>
          <TabsTrigger value="watchlists" className="px-6">Watchlist Management</TabsTrigger>
        </TabsList>

        <TabsContent value="single" className="space-y-6">
          <Card className="animate-slide-up">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Search className="h-5 w-5" />
                <span>Entity Screening</span>
              </CardTitle>
              <CardDescription>
                Screen individual entities against all active watchlists
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-4">
                <Input
                  placeholder="Enter entity name, address, or identifier..."
                  value={entityName}
                  onChange={(e) => setEntityName(e.target.value)}
                  className="flex-1"
                />
                <Button 
                  onClick={handleSingleScreen}
                  disabled={!entityName || isScanning}
                  className="px-8"
                >
                  {isScanning ? "Screening..." : "Screen Entity"}
                </Button>
              </div>

              {isScanning && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Screening against {watchlists.length} watchlists...</span>
                    <span>{scanProgress}%</span>
                  </div>
                  <Progress value={scanProgress} className="h-2" />
                </div>
              )}

              {scanProgress === 100 && !isScanning && (
                <Alert className="border-green-200 bg-green-50">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <AlertTitle className="text-green-800">Screening Complete</AlertTitle>
                  <AlertDescription className="text-green-700">
                    Entity "{entityName}" has been successfully screened against all watchlists.
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Screening Results</CardTitle>
              <CardDescription>Latest entity screening results and status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {screeningResults.map((result, index) => (
                  <div 
                    key={index}
                    className={`p-4 rounded-lg border-l-4 ${
                      result.status === "Blocked" ? "bg-red-50 border-red-500" :
                      result.status === "Warning" ? "bg-yellow-50 border-yellow-500" :
                      "bg-green-50 border-green-500"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-gray-900">{result.entity}</h3>
                      <div className="flex items-center space-x-2">
                        <Badge 
                          variant={
                            result.status === "Blocked" ? "destructive" :
                            result.status === "Warning" ? "default" : "outline"
                          }
                          className={result.status === "Blocked" ? "bg-red-600" : 
                                   result.status === "Warning" ? "bg-yellow-600" : "bg-green-600 text-white"}
                        >
                          {result.status}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {result.riskLevel} Risk
                        </Badge>
                      </div>
                    </div>
                    <div className="text-sm text-gray-600 space-y-1">
                      <div>
                        <strong>Screened Lists:</strong> {result.lists.join(", ")}
                      </div>
                      <div>
                        <strong>Last Checked:</strong> {result.lastChecked}
                      </div>
                    </div>
                    <div className="mt-3 flex space-x-2">
                      <Button variant="outline" size="sm">
                        <FileText className="h-3 w-3 mr-1" />
                        View Report
                      </Button>
                      <Button variant="outline" size="sm">
                        Re-screen
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="bulk" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Upload className="h-5 w-5" />
                <span>Bulk Entity Screening</span>
              </CardTitle>
              <CardDescription>
                Upload and screen multiple entities simultaneously
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-primary transition-colors">
                <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Upload Entity List</h3>
                <p className="text-gray-600 mb-4">
                  Drag and drop your CSV or Excel file here, or click to browse
                </p>
                <Button variant="outline">
                  Choose File
                </Button>
                <div className="mt-4 text-sm text-gray-500">
                  Supported formats: CSV, XLSX, XLS (Max 10MB, 10,000 entities)
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="p-4">
                  <div className="text-2xl font-bold text-primary">2,847</div>
                  <div className="text-sm text-gray-600">Total Entities Processed</div>
                </Card>
                <Card className="p-4">
                  <div className="text-2xl font-bold text-success">2,789</div>
                  <div className="text-sm text-gray-600">Clear Results</div>
                </Card>
                <Card className="p-4">
                  <div className="text-2xl font-bold text-destructive">58</div>
                  <div className="text-sm text-gray-600">Flagged Entities</div>
                </Card>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Screening Options</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Match Threshold</label>
                    <select className="w-full p-2 border rounded-md">
                      <option>Exact Match (100%)</option>
                      <option>High (95%)</option>
                      <option>Medium (85%)</option>
                      <option>Low (75%)</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Screening Scope</label>
                    <select className="w-full p-2 border rounded-md">
                      <option>All Watchlists</option>
                      <option>OFAC Only</option>
                      <option>EU Sanctions Only</option>
                      <option>Custom Selection</option>
                    </select>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="watchlists" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="h-5 w-5" />
                <span>Watchlist Status</span>
              </CardTitle>
              <CardDescription>
                Monitor and manage screening database status and updates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3 font-medium">Watchlist</th>
                      <th className="text-left p-3 font-medium">Entries</th>
                      <th className="text-left p-3 font-medium">Update Frequency</th>
                      <th className="text-left p-3 font-medium">Last Update</th>
                      <th className="text-left p-3 font-medium">Status</th>
                      <th className="text-left p-3 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {watchlists.map((list, index) => (
                      <tr key={index} className="border-b hover:bg-gray-50 transition-colors">
                        <td className="p-3 font-medium">{list.name}</td>
                        <td className="p-3">{list.count}</td>
                        <td className="p-3">{list.lastUpdate}</td>
                        <td className="p-3 text-sm text-gray-600">2 hours ago</td>
                        <td className="p-3">
                          <Badge className="bg-success text-success-foreground">
                            {list.status}
                          </Badge>
                        </td>
                        <td className="p-3">
                          <div className="flex space-x-2">
                            <Button variant="ghost" size="sm">Update</Button>
                            <Button variant="ghost" size="sm">Configure</Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>System Health</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Database Connectivity</span>
                    <Badge className="bg-success text-success-foreground">Online</Badge>
                  </div>
                  <Progress value={100} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>API Response Time</span>
                    <span className="text-success">142ms</span>
                  </div>
                  <Progress value={85} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Data Freshness</span>
                    <span className="text-success">Current</span>
                  </div>
                  <Progress value={95} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Alerts</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Alert className="border-yellow-200 bg-yellow-50">
                  <AlertTriangle className="h-4 w-4 text-yellow-600" />
                  <AlertTitle className="text-yellow-800">High-Risk Entity Detected</AlertTitle>
                  <AlertDescription className="text-yellow-700">
                    New entity added to OFAC SDN list - automatic re-screening triggered
                  </AlertDescription>
                </Alert>
                <Alert className="border-blue-200 bg-blue-50">
                  <CheckCircle className="h-4 w-4 text-blue-600" />
                  <AlertTitle className="text-blue-800">Watchlist Update Complete</AlertTitle>
                  <AlertDescription className="text-blue-700">
                    EU Sanctions list updated with 47 new entries
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ComplianceScreening;
