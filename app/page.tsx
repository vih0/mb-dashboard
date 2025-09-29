"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UsersManagement } from "@/components/users-management"
import { SurveyDashboard } from "@/components/survey-dashboard"
import { Users, BarChart3, Heart } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Heart className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-foreground">Pesquisa de Bem-Estar</h1>
              <p className="text-sm text-muted-foreground">Cuidando da saúde mental da equipe</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        <Tabs defaultValue="dashboard" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2 mb-8 h-12 bg-muted/50">
            <TabsTrigger value="dashboard" className="flex items-center gap-2 data-[state=active]:bg-card">
              <BarChart3 className="h-4 w-4" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center gap-2 data-[state=active]:bg-card">
              <Users className="h-4 w-4" />
              Participantes
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="mt-0">
            <SurveyDashboard />
          </TabsContent>

          <TabsContent value="users" className="mt-0">
            <UsersManagement />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
