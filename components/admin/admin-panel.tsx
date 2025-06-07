"use client"

import { useState } from "react"
import { useSession } from "next-auth/react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ContentManager from "./content-manager"
import UserManagement from "./user-management"
import SettingsManager from "./settings-manager"
import AnalyticsDashboard from "./analytics-dashboard"
import { Shield, Users, Settings, BarChart, FileText } from "lucide-react"

export default function AdminPanel() {
  const { data: session } = useSession()
  const [activeTab, setActiveTab] = useState('dashboard')

  if (!session?.user?.role || !['ADMIN', 'SUPER_ADMIN'].includes(session.user.role)) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Access Denied</CardTitle>
          <CardDescription>You do not have permission to access the admin panel.</CardDescription>
        </CardHeader>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Admin Dashboard</CardTitle>
              <CardDescription>Manage your ChronoVault platform</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-amber-500" />
              <span className="text-sm font-medium">{session.user.role}</span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-4 gap-4 bg-transparent">
              <TabsTrigger
                value="dashboard"
                className="data-[state=active]:bg-amber-500/20"
              >
                <BarChart className="w-4 h-4 mr-2" />
                Analytics
              </TabsTrigger>
              <TabsTrigger
                value="content"
                className="data-[state=active]:bg-amber-500/20"
              >
                <FileText className="w-4 h-4 mr-2" />
                Content
              </TabsTrigger>
              <TabsTrigger
                value="users"
                className="data-[state=active]:bg-amber-500/20"
                disabled={session.user.role !== 'SUPER_ADMIN'}
              >
                <Users className="w-4 h-4 mr-2" />
                Users
              </TabsTrigger>
              <TabsTrigger
                value="settings"
                className="data-[state=active]:bg-amber-500/20"
              >
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </TabsTrigger>
            </TabsList>

            <div className="mt-6">
              <TabsContent value="dashboard">
                <AnalyticsDashboard />
              </TabsContent>
              
              <TabsContent value="content">
                <ContentManager />
              </TabsContent>
              
              <TabsContent value="users">
                <UserManagement />
              </TabsContent>
              
              <TabsContent value="settings">
                <SettingsManager />
              </TabsContent>
            </div>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
} 