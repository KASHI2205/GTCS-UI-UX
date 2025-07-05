
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Search, Filter, Bell, FileText, Calendar } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const tariffData = [
  { code: "8471.30.01", description: "Portable automatic data processing machines", duty: "0%", status: "Active" },
  { code: "8517.12.00", description: "Telephones for cellular networks", duty: "0%", status: "Active" },
  { code: "2203.00.00", description: "Beer made from malt", duty: "$0.226/liter", status: "Updated" },
  { code: "8703.23.00", description: "Motor cars with spark-ignition engine", duty: "2.5%", status: "Active" },
];

const regulatoryUpdates = [
  {
    date: "2024-07-03",
    title: "New USMCA Rules of Origin Updates",
    description: "Updated rules for automotive sector effective immediately",
    priority: "High",
    countries: ["US", "CA", "MX"]
  },
  {
    date: "2024-07-02",
    title: "EU CBAM Phase 2 Implementation",
    description: "Carbon Border Adjustment Mechanism expanded coverage",
    priority: "Medium",
    countries: ["EU"]
  },
  {
    date: "2024-07-01",
    title: "China Export Control Updates",
    description: "New dual-use items added to controlled list",
    priority: "Critical",
    countries: ["CN", "Global"]
  }
];

const RegulatoryContent = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("all");

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-full">
      <div className="animate-fade-in">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Regulatory Content & Classification</h1>
        <p className="text-gray-600">Access tariff codes, regulations, and real-time updates</p>
      </div>

      {/* Search and Filters */}
      <Card className="animate-slide-up">
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search HS codes, products, or regulations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Select Country" />
                </SelectTrigger>
                <SelectContent className="bg-white z-50">
                  <SelectItem value="all">All Countries</SelectItem>
                  <SelectItem value="us">United States</SelectItem>
                  <SelectItem value="eu">European Union</SelectItem>
                  <SelectItem value="cn">China</SelectItem>
                  <SelectItem value="ca">Canada</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                More Filters
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      <Tabs defaultValue="tariffs" className="space-y-6">
        <TabsList className="bg-white p-1 shadow-sm">
          <TabsTrigger value="tariffs" className="px-6">Tariff Codes & Duties</TabsTrigger>
          <TabsTrigger value="regulations" className="px-6">Trade Regulations</TabsTrigger>
          <TabsTrigger value="updates" className="px-6">Real-time Updates</TabsTrigger>
        </TabsList>

        <TabsContent value="tariffs" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>HS Code Classification Database</CardTitle>
              <CardDescription>
                Search and browse harmonized system codes with current duty rates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3 font-medium">HS Code</th>
                      <th className="text-left p-3 font-medium">Description</th>
                      <th className="text-left p-3 font-medium">Duty Rate</th>
                      <th className="text-left p-3 font-medium">Status</th>
                      <th className="text-left p-3 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tariffData.map((item, index) => (
                      <tr key={index} className="border-b hover:bg-gray-50 transition-colors">
                        <td className="p-3 font-mono text-primary">{item.code}</td>
                        <td className="p-3">{item.description}</td>
                        <td className="p-3 font-medium">{item.duty}</td>
                        <td className="p-3">
                          <Badge 
                            variant={item.status === "Updated" ? "destructive" : "outline"}
                            className={item.status === "Updated" ? "animate-pulse" : ""}
                          >
                            {item.status}
                          </Badge>
                        </td>
                        <td className="p-3">
                          <Button variant="ghost" size="sm">View Details</Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="regulations" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Export Control Regulations</CardTitle>
                <CardDescription>ITAR, EAR, and international export controls</CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="itar">
                    <AccordionTrigger>ITAR - International Traffic in Arms Regulations</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-3">
                        <p className="text-sm text-gray-600">
                          Controls the export and import of defense-related articles and services.
                        </p>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div><strong>Categories:</strong> I-XXI</div>
                          <div><strong>Jurisdiction:</strong> State Dept</div>
                          <div><strong>Last Updated:</strong> Jan 2024</div>
                          <div><strong>Status:</strong> Active</div>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="ear">
                    <AccordionTrigger>EAR - Export Administration Regulations</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-3">
                        <p className="text-sm text-gray-600">
                          Controls the export of dual-use and less sensitive military items.
                        </p>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div><strong>ECCN Range:</strong> 0A001-9E999</div>
                          <div><strong>Jurisdiction:</strong> Commerce Dept</div>
                          <div><strong>Last Updated:</strong> June 2024</div>
                          <div><strong>Status:</strong> Active</div>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="ofac">
                    <AccordionTrigger>OFAC Sanctions</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-3">
                        <p className="text-sm text-gray-600">
                          Economic sanctions and trade restrictions by country and entity.
                        </p>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div><strong>Programs:</strong> 30+ Active</div>
                          <div><strong>Jurisdiction:</strong> Treasury Dept</div>
                          <div><strong>Last Updated:</strong> Daily</div>
                          <div><strong>Status:</strong> Active</div>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Trade Agreements</CardTitle>
                <CardDescription>Active trade agreements and preferential programs</CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="usmca">
                    <AccordionTrigger>USMCA (North America)</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-3">
                        <p className="text-sm text-gray-600">
                          United States-Mexico-Canada Agreement replacing NAFTA.
                        </p>
                        <div className="flex flex-wrap gap-2">
                          <Badge>US</Badge>
                          <Badge>Mexico</Badge>
                          <Badge>Canada</Badge>
                        </div>
                        <div className="text-sm space-y-1">
                          <div><strong>Effective:</strong> July 1, 2020</div>
                          <div><strong>Key Changes:</strong> Auto RoO, Digital Trade</div>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="cptpp">
                    <AccordionTrigger>CPTPP (Trans-Pacific)</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-3">
                        <p className="text-sm text-gray-600">
                          Comprehensive and Progressive Trans-Pacific Partnership.
                        </p>
                        <div className="flex flex-wrap gap-1">
                          <Badge variant="outline" className="text-xs">Australia</Badge>
                          <Badge variant="outline" className="text-xs">Brunei</Badge>
                          <Badge variant="outline" className="text-xs">Canada</Badge>
                          <Badge variant="outline" className="text-xs">Chile</Badge>
                          <Badge variant="outline" className="text-xs">Japan</Badge>
                          <Badge variant="outline" className="text-xs">+6 more</Badge>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="updates" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Bell className="h-5 w-5 text-primary" />
                <span>Live Regulatory Updates</span>
              </CardTitle>
              <CardDescription>
                Real-time notifications about regulatory changes affecting your trade operations
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {regulatoryUpdates.map((update, index) => (
                <div 
                  key={index} 
                  className={`p-4 rounded-lg border-l-4 ${
                    update.priority === "Critical" ? "bg-red-50 border-red-500" :
                    update.priority === "High" ? "bg-yellow-50 border-yellow-500" :
                    "bg-blue-50 border-blue-500"
                  } hover:shadow-md transition-shadow`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="font-semibold text-gray-900">{update.title}</h3>
                        <Badge 
                          variant={
                            update.priority === "Critical" ? "destructive" :
                            update.priority === "High" ? "default" : "outline"
                          }
                          className={update.priority === "Critical" ? "animate-pulse" : ""}
                        >
                          {update.priority}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{update.description}</p>
                      <div className="flex items-center space-x-4 text-xs text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-3 w-3" />
                          <span>{update.date}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <span>Affects:</span>
                          {update.countries.map((country, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {country}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <FileText className="h-3 w-3 mr-1" />
                        Details
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RegulatoryContent;
