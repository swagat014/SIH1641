"use client"

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  BookOpen, 
  GraduationCap, 
  Users, 
  DollarSign, 
  FileText, 
  BarChart2, 
  Settings, 
  LogOut,
  Menu,
  AlertCircle
} from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"

// Mock API calls
const fetchKPIs = () => new Promise(resolve => 
  setTimeout(() => resolve({
    totalStudents: 12345,
    researchPublications: 1234,
    facultyMembers: 789,
    annualBudget: 50000000
  }), 1000)
)

const fetchPerformanceData = () => new Promise(resolve => 
  setTimeout(() => resolve([
    { year: '2018', gpa: 3.2, research: 45, funding: 2.1 },
    { year: '2019', gpa: 3.3, research: 52, funding: 2.3 },
    { year: '2020', gpa: 3.1, research: 48, funding: 2.0 },
    { year: '2021', gpa: 3.4, research: 60, funding: 2.5 },
    { year: '2022', gpa: 3.5, research: 65, funding: 2.8 },
  ]), 1500)
)

const fetchDepartmentData = () => new Promise(resolve => 
  setTimeout(() => resolve([
    { name: 'Computer Science', students: 500, faculty: 30, publications: 120 },
    { name: 'Electrical Engineering', students: 450, faculty: 28, publications: 110 },
    { name: 'Mechanical Engineering', students: 400, faculty: 25, publications: 90 },
    { name: 'Physics', students: 300, faculty: 20, publications: 80 },
    { name: 'Mathematics', students: 250, faculty: 18, publications: 70 },
  ]), 2000)
)

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [kpis, setKPIs] = useState(null)
  const [performanceData, setPerformanceData] = useState([])
  const [departmentData, setDepartmentData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [reportYear, setReportYear] = useState('2022')
  const [reportFormat, setReportFormat] = useState('pdf')
  const [generatingReport, setGeneratingReport] = useState(false)
  const [reportProgress, setReportProgress] = useState(0)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const [kpisData, perfData, deptData] = await Promise.all([
          fetchKPIs(),
          fetchPerformanceData(),
          fetchDepartmentData()
        ])
        setKPIs(kpisData)
        setPerformanceData(perfData)
        setDepartmentData(deptData)
      } catch (err) {
        setError('Failed to fetch data. Please try again later.')
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const handleGenerateReport = () => {
    setGeneratingReport(true)
    setReportProgress(0)
    const interval = setInterval(() => {
      setReportProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setGeneratingReport(false)
          return 100
        }
        return prev + 10
      })
    }, 500)
  }

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    )
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`bg-white w-64 min-h-screen flex flex-col ${sidebarOpen ? 'block' : 'hidden'} md:block`}>
        <div className="p-4">
          <h2 className="text-2xl font-semibold text-gray-800">Annual Report Portal</h2>
        </div>
        <nav className="flex-1 px-2 py-4 bg-gray-800">
          <a href="#" className="flex items-center px-4 py-2 text-gray-100 hover:bg-gray-700 rounded-lg">
            <BookOpen className="mr-3 h-6 w-6" />
            Overview
          </a>
          <a href="#" className="flex items-center px-4 py-2 mt-2 text-gray-100 hover:bg-gray-700 rounded-lg">
            <GraduationCap className="mr-3 h-6 w-6" />
            Academic Performance
          </a>
          <a href="#" className="flex items-center px-4 py-2 mt-2 text-gray-100 hover:bg-gray-700 rounded-lg">
            <Users className="mr-3 h-6 w-6" />
            Faculty & Students
          </a>
          <a href="#" className="flex items-center px-4 py-2 mt-2 text-gray-100 hover:bg-gray-700 rounded-lg">
            <DollarSign className="mr-3 h-6 w-6" />
            Financial Data
          </a>
          <a href="#" className="flex items-center px-4 py-2 mt-2 text-gray-100 hover:bg-gray-700 rounded-lg">
            <FileText className="mr-3 h-6 w-6" />
            Generate Report
          </a>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navigation */}
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <div className="md:hidden">
                <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(!sidebarOpen)}>
                  <Menu className="h-6 w-6" />
                </Button>
              </div>
              <div className="flex-1 flex justify-center md:justify-end">
                <div className="w-full max-w-lg lg:max-w-xs">
                  <Input type="search" placeholder="Search..." className="w-full" />
                </div>
              </div>
              <div className="ml-4 flex items-center md:ml-6">
                <Button variant="ghost" size="icon">
                  <Settings className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon">
                  <LogOut className="h-5 w-5" />
                </Button>
                <Avatar className="ml-3">
                  <AvatarImage src="/placeholder-user.jpg" alt="User" />
                  <AvatarFallback>AD</AvatarFallback>
                </Avatar>
              </div>
            </div>
          </div>
        </header>

        {/* Main Dashboard */}
        <main className="flex-1 overflow-y-auto bg-gray-100 p-4">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-semibold text-gray-900 mb-6">Dashboard</h1>
            
            {/* KPI Cards */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Students</CardTitle>
                  <GraduationCap className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{kpis.totalStudents.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">+10% from last year</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Research Publications</CardTitle>
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{kpis.researchPublications.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">+15% from last year</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Faculty Members</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{kpis.facultyMembers.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">+5% from last year</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Annual Budget</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">${(kpis.annualBudget / 1000000).toFixed(1)}M</div>
                  <p className="text-xs text-muted-foreground">+8% from last year</p>
                </CardContent>
              </Card>
            </div>

            {/* Performance Trends */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Performance Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Legend />
                    <Line yAxisId="left" type="monotone" dataKey="gpa" stroke="#8884d8" activeDot={{ r: 8 }} />
                    <Line yAxisId="left" type="monotone" dataKey="research" stroke="#82ca9d" />
                    <Line yAxisId="right" type="monotone" dataKey="funding" stroke="#ffc658" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Department Data */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Department Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Department</TableHead>
                      <TableHead>Students</TableHead>
                      <TableHead>Faculty</TableHead>
                      <TableHead>Publications</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {departmentData.map((dept) => (
                      <TableRow key={dept.name}>
                        <TableCell className="font-medium">{dept.name}</TableCell>
                        <TableCell>{dept.students}</TableCell>
                        <TableCell>{dept.faculty}</TableCell>
                        <TableCell>{dept.publications}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Report Generation */}
            <Card>
              <CardHeader>
                <CardTitle>Generate Annual Report</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex space-x-4 mb-4">
                  <Select value={reportYear} onValueChange={setReportYear}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select year" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2022">2022</SelectItem>
                      <SelectItem value="2021">2021</SelectItem>
                      <SelectItem value="2020">2020</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={reportFormat} onValueChange={setReportFormat}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select format" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pdf">PDF</SelectItem>
                      <SelectItem value="html">HTML</SelectItem>
                      <SelectItem value="docx">DOCX</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button onClick={handleGenerateReport} disabled={generatingReport}>
                    {generatingReport ? 'Generating...' : 'Generate Report'}
                  </Button>
                </div>
                {generatingReport && (
                  <div className="space-y-2">
                    <Progress value={reportProgress} className="w-full" />
                    <p className="text-sm text-muted-foreground">Generating report... {reportProgress}% complete</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
