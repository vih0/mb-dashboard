"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UsersManagement } from "@/components/users-management"
import { SurveyDashboard } from "@/components/survey-dashboard"
import { ContentManagement } from "@/components/content-management"
import { Users, BarChart3, Heart } from "lucide-react"
import Image from "next/image"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl  flex items-center justify-center">
              <Image src={'./meubem-logo.png'}  width={60} height={40} alt=""  className="h-12 w-10 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-foreground">Plataforma de Bem-Estar</h1>
              <p className="text-sm text-muted-foreground">Cuidando da saúde da equipe</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        <Tabs defaultValue="dashboard" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-3 mb-8 h-12 bg-muted/50">
            <TabsTrigger value="dashboard" className="flex items-center gap-2 data-[state=active]:bg-card">
              <BarChart3 className="h-4 w-4" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center gap-2 data-[state=active]:bg-card">
              <Users className="h-4 w-4" />
              Participantes
            </TabsTrigger>
            <TabsTrigger value="content" className="flex items-center gap-2 data-[state=active]:bg-card">
              <Users className="h-4 w-4" />
              Conteudo
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="mt-0">
            <SurveyDashboard />
          </TabsContent>

          <TabsContent value="users" className="mt-0">
            <UsersManagement />
          </TabsContent>
          
          <TabsContent value="content" className="mt-0">
            <ContentManagement />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
