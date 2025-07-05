
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CheckCircle, Clock, FileText, AlertTriangle, Calendar, Search } from "lucide-react";

const licenseApplications = [
  {
    id: "LIC-2024-001",
    type: "Export License",
    product: "Advanced Semiconductors",
    destination: "Singapore",
    status: "Under Review",
    submitDate: "2024-06-15",
    expectedDecision: "2024-07-20",
    daysRemaining: 15,
    priority: "High"
  },
  {
    id: "LIC-2024-002",
    type: "Re-export Authorization",
    product: "Encryption Software",
    destination: "Germany",
    status: "Approved",
    submitDate: "2024-06-01",
    approvalDate: "2024-06-28",
    priority: "Medium"
  },
  {
    id: "LIC-2024-003",
    type: "Temporary Import License",
    product: "Test Equipment",
    destination: "United States",
    status: "Pending Documentation", 
    submitDate: "2024-06-20",
    expectedDecision: "2024-07-10",
    daysRemaining: 5,
    priority: "Critical"
  }
];

const licenseRequirements = [
  {
    product: "Dual-Use Electronics",
    destination: "China",
    required: true,
    type: "BIS Export License",
    processingTime: "60-90 days",
    eccn: "3A001.a.2"
  },
  {
    product: "Medical Devices",
    destination: "European Union",
    required: false,
    type: "No License Required",
    processingTime: "N/A",
    reason: "EAR99 Classification"
  },
  {
    product: "Cybersecurity Software",
    destination: "Canada",
    required: true,
    type: "License Exception",
    processingTime: "Immediate",
    exception: "TSR"
  }
];

const LicenseManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Approved": return "bg-success text-success-foreground";
      case "Under Review": return "bg-info text-info-foreground";
      case "Pending Documentation": return "bg-warning text-warning-foreground";
      case "Denied": return "bg-destructive text-destructive-foreground";
      default: return "bg-gray-500 text-white";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Critical": return "text-destructive";
      case "High": return "text-warning";
      case "Medium": return "text-info";
      default: return "text-gray-500";
    }
  };

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-full">
      <div className="animate-fade-in">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">License Management</h1>
        <p className="text-gray-600">Manage export licenses and trade authorizations</p>
      </div>

      <Tabs defaultValue="applications" className="space-y-6">
        <TabsList className="bg-white p-1 shadow-sm">
          <TabsTrigger value="applications" className="px-6">License Applications</TabsTrigger>
          <TabsTrigger value="determination" className="px-6">License Determination</TabsTrigger>
          <TabsTrigger value="new-application" className="px-6">New Application</TabsTrigger>
        </TabsList>

        <TabsContent value="applications" className="space-y-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 animate-slide-up">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-warning" />
                  <div>
                    <div className="text-2xl font-bold text-warning">12</div>
                    <div className="text-sm text-gray-600">Pending</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-success" />
                  <div>
                    <div className="text-2xl font-bold text-success">48</div>
                    <div className="text-sm text-gray-600">Approved</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="h-4 w-4 text-destructive" />
                  <div>
                    <div className="text-2xl font-bold text-destructive">3</div>
                    <div className="text-sm text-gray-600">Urgent</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-info" />
                  <div>
                    <div className="text-2xl font-bold text-info">28</div>
                    <div className="text-sm text-gray-600">Avg Days</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Search and Filter */}
          <Card>
            <CardContent className="p-4">
              <div className="flex gap-4 items-center">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search applications by ID, product, or destination..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select>
                  <SelectTrigger className="w-48 bg-white">
                    <SelectValue placeholder="Filter by Status" />
                  </SelectTrigger>
                  <SelectContent className="bg-white z-50">
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="under-review">Under Review</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Applications List */}
          <div className="space-y-4">
            {licenseApplications.map((app, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow animate-fade-in">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{app.id}</h3>
                      <p className="text-gray-600">{app.type}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={`${getPriorityColor(app.priority)}`} variant="outline">
                        {app.priority}
                      </Badge>
                      <Badge className={getStatusColor(app.status)}>
                        {app.status}
                      </Badge>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <div className="text-sm font-medium text-gray-500">Product</div>
                      <div className="text-gray-900">{app.product}</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-500">Destination</div>
                      <div className="text-gray-900">{app.destination}</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-500">Submit Date</div>
                      <div className="text-gray-900">{app.submitDate}</div>
                    </div>
                  </div>

                  {app.daysRemaining && (
                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-1">
                        <span>Processing Progress</span>
                        <span>{app.daysRemaining} days remaining</span>
                      </div>
                      <Progress 
                        value={((90 - app.daysRemaining) / 90) * 100} 
                        className="h-2"
                      />
                    </div>
                  )}

                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <FileText className="h-3 w-3 mr-1" />
                      View Details
                    </Button>
                    <Button variant="outline" size="sm">
                      Download Documents
                    </Button>
                    {app.status === "Pending Documentation" && (
                      <Button size="sm">
                        Upload Documents
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="determination" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>License Determination Tool</CardTitle>
              <CardDescription>
                Determine if your export requires a license based on product, destination, and end-use
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Product Category</Label>
                  <Select>
                    <SelectTrigger className="bg-white">
                      <SelectValue placeholder="Select product category" />
                    </SelectTrigger>
                    <SelectContent className="bg-white z-50">
                      <SelectItem value="electronics">Electronics & Semiconductors</SelectItem>
                      <SelectItem value="software">Software & Technology</SelectItem>
                      <SelectItem value="chemicals">Chemicals</SelectItem>
                      <SelectItem value="machinery">Machinery & Equipment</SelectItem>
                      <SelectItem value="materials">Advanced Materials</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Destination Country</Label>
                  <Select>
                    <SelectTrigger className="bg-white">
                      <SelectValue placeholder="Select destination" />
                    </SelectTrigger>
                    <SelectContent className="bg-white z-50">
                      <SelectItem value="cn">China</SelectItem>
                      <SelectItem value="ru">Russia</SelectItem>
                      <SelectItem value="ir">Iran</SelectItem>
                      <SelectItem value="de">Germany</SelectItem>
                      <SelectItem value="jp">Japan</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Product Description</Label>
                <Textarea 
                  placeholder="Provide detailed product description..."
                  className="min-h-20"
                />
              </div>

              <Button className="w-full">
                Check License Requirements
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>License Determination Results</CardTitle>
              <CardDescription>Recent license requirement checks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {licenseRequirements.map((req, index) => (
                  <div 
                    key={index}
                    className={`p-4 rounded-lg border-l-4 ${
                      req.required 
                        ? "bg-yellow-50 border-yellow-500" 
                        : "bg-green-50 border-green-500"
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-gray-900">{req.product}</h3>
                        <p className="text-sm text-gray-600">Destination: {req.destination}</p>
                      </div>
                      <Badge 
                        className={req.required ? "bg-warning text-warning-foreground" : "bg-success text-success-foreground"}
                      >
                        {req.required ? "License Required" : "No License Required"}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="font-medium">License Type:</span>
                        <div>{req.type}</div>
                      </div>
                      <div>
                        <span className="font-medium">Processing Time:</span>
                        <div>{req.processingTime}</div>
                      </div>
                      <div>
                        <span className="font-medium">
                          {req.eccn ? "ECCN:" : req.exception ? "Exception:" : "Reason:"}
                        </span>
                        <div>{req.eccn || req.exception || req.reason}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="new-application" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>New License Application</CardTitle>
              <CardDescription>
                Submit a new export license application
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>License Type</Label>
                  <Select>
                    <SelectTrigger className="bg-white">
                      <SelectValue placeholder="Select license type" />
                    </SelectTrigger>
                    <SelectContent className="bg-white z-50">
                      <SelectItem value="export">Export License</SelectItem>
                      <SelectItem value="reexport">Re-export Authorization</SelectItem>
                      <SelectItem value="temporary">Temporary Import License</SelectItem>
                      <SelectItem value="deemed">Deemed Export License</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Priority Level</Label>
                  <Select>
                    <SelectTrigger className="bg-white">
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent className="bg-white z-50">
                      <SelectItem value="standard">Standard</SelectItem>
                      <SelectItem value="expedited">Expedited</SelectItem>
                      <SelectItem value="emergency">Emergency</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Product Description</Label>
                <Textarea 
                  placeholder="Provide detailed product description including technical specifications..."
                  className="min-h-24"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>ECCN/USML Category</Label>
                  <Input placeholder="e.g., 3A001.a.2" />
                </div>
                <div className="space-y-2">
                  <Label>Quantity</Label>
                  <Input type="number" placeholder="100" />
                </div>
                <div className="space-y-2">
                  <Label>Unit Value (USD)</Label>
                  <Input type="number" placeholder="10000" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>End User</Label>
                  <Input placeholder="Company name and address" />
                </div>
                <div className="space-y-2">
                  <Label>End Use</Label>
                  <Input placeholder="Intended use of the product" />
                </div>
              </div>

              <div className="space-y-4">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <FileText className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                  <p className="text-gray-600">Upload supporting documents</p>
                  <Button variant="outline" className="mt-2">
                    Choose Files
                  </Button>
                </div>
              </div>

              <div className="flex space-x-4">
                <Button className="flex-1">
                  Submit Application
                </Button>
                <Button variant="outline">
                  Save as Draft
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LicenseManagement;
