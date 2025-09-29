"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { Heart, Users, Smile, Activity } from "lucide-react"

const sectorData = [
  { sector: "Atendimento", respostas: 45, bemestar: 7.8, participacao: 90 },
  { sector: "Administrativo", respostas: 38, bemestar: 7.2, participacao: 85 },
  { sector: "Clínico", respostas: 42, bemestar: 8.1, participacao: 95 },
  { sector: "Suporte", respostas: 35, bemestar: 7.5, participacao: 88 },
]

const timelineData = [
  { mes: "Jan", respostas: 120 },
  { mes: "Fev", respostas: 145 },
  { mes: "Mar", respostas: 160 },
  { mes: "Abr", respostas: 155 },
  { mes: "Mai", respostas: 180 },
  { mes: "Jun", respostas: 195 },
]

const wellbeingData = [
  { sector: "Atendimento", nota: 7.8 },
  { sector: "Administrativo", nota: 7.2 },
  { sector: "Clínico", nota: 8.1 },
  { sector: "Suporte", nota: 7.5 },
]

export function SurveyDashboard() {
  const totalRespostas = sectorData.reduce((acc, curr) => acc + curr.respostas, 0)
  const mediaBemestar = (sectorData.reduce((acc, curr) => acc + curr.bemestar, 0) / sectorData.length).toFixed(1)
  const mediaParticipacao = (sectorData.reduce((acc, curr) => acc + curr.participacao, 0) / sectorData.length).toFixed(
    0,
  )

  return (
    <div className="space-y-8">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-none shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total de Respostas</CardTitle>
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Activity className="h-5 w-5 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold text-foreground">{totalRespostas}</div>
            <p className="text-xs text-muted-foreground mt-2">Participantes ativos</p>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Índice de Bem-Estar</CardTitle>
            <div className="h-10 w-10 rounded-full bg-accent/10 flex items-center justify-center">
              <Heart className="h-5 w-5 text-accent" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold text-foreground">{mediaBemestar}/10</div>
            <p className="text-xs text-muted-foreground mt-2">Média geral</p>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Taxa de Participação</CardTitle>
            <div className="h-10 w-10 rounded-full bg-chart-2/10 flex items-center justify-center">
              <Users className="h-5 w-5 text-chart-2" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold text-foreground">{mediaParticipacao}%</div>
            <p className="text-xs text-muted-foreground mt-2">Engajamento</p>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Setores Ativos</CardTitle>
            <div className="h-10 w-10 rounded-full bg-chart-3/10 flex items-center justify-center">
              <Smile className="h-5 w-5 text-chart-3" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold text-foreground">{sectorData.length}</div>
            <p className="text-xs text-muted-foreground mt-2">Áreas participantes</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="border-none shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">Respostas por Setor</CardTitle>
            <CardDescription className="text-sm">Participação de cada área</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={sectorData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border/50" vertical={false} />
                <XAxis dataKey="sector" className="text-xs" tick={{ fill: "hsl(var(--muted-foreground))" }} />
                <YAxis className="text-xs" tick={{ fill: "hsl(var(--muted-foreground))" }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "12px",
                    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                  }}
                />
                <Bar dataKey="respostas" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">Índice de Bem-Estar</CardTitle>
            <CardDescription className="text-sm">Avaliação por setor (0-10)</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={wellbeingData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border/50" vertical={false} />
                <XAxis dataKey="sector" className="text-xs" tick={{ fill: "hsl(var(--muted-foreground))" }} />
                <YAxis domain={[0, 10]} className="text-xs" tick={{ fill: "hsl(var(--muted-foreground))" }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "12px",
                    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                  }}
                />
                <Bar dataKey="nota" fill="hsl(var(--accent))" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card className="border-none shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg">Evolução de Participação</CardTitle>
          <CardDescription className="text-sm">Histórico dos últimos 6 meses</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={timelineData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-border/50" vertical={false} />
              <XAxis dataKey="mes" className="text-xs" tick={{ fill: "hsl(var(--muted-foreground))" }} />
              <YAxis className="text-xs" tick={{ fill: "hsl(var(--muted-foreground))" }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "12px",
                  boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                }}
              />
              <Line
                type="monotone"
                dataKey="respostas"
                stroke="hsl(var(--chart-2))"
                strokeWidth={3}
                dot={{ fill: "hsl(var(--chart-2))", r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="border-none shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg">Visão Detalhada</CardTitle>
          <CardDescription className="text-sm">Métricas completas por setor</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {sectorData.map((sector) => (
              <div
                key={sector.sector}
                className="flex items-center justify-between p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
              >
                <div className="space-y-1">
                  <p className="font-medium text-foreground">{sector.sector}</p>
                  <p className="text-sm text-muted-foreground">{sector.respostas} respostas</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground mb-1">Bem-estar</p>
                    <Badge
                      variant="secondary"
                      className={
                        sector.bemestar >= 8
                          ? "bg-accent/20 text-accent border-accent/30"
                          : sector.bemestar >= 7
                            ? "bg-primary/20 text-primary border-primary/30"
                            : "bg-muted text-muted-foreground"
                      }
                    >
                      {sector.bemestar}/10
                    </Badge>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground mb-1">Participação</p>
                    <Badge variant="outline" className="font-medium">
                      {sector.participacao}%
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
