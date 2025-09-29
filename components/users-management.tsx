"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Send, Search, UserPlus } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

// Dados de exemplo - em produção viriam de uma API/banco de dados
const initialUsers = [
  { id: 1, name: "João Silva", phone: "(11) 98765-4321", sector: "Vendas" },
  { id: 2, name: "Maria Santos", phone: "(11) 97654-3210", sector: "Marketing" },
  { id: 3, name: "Pedro Oliveira", phone: "(11) 96543-2109", sector: "TI" },
  { id: 4, name: "Ana Costa", phone: "(11) 95432-1098", sector: "RH" },
  { id: 5, name: "Carlos Souza", phone: "(11) 94321-0987", sector: "Vendas" },
  { id: 6, name: "Juliana Lima", phone: "(11) 93210-9876", sector: "Marketing" },
  { id: 7, name: "Roberto Alves", phone: "(11) 92109-8765", sector: "TI" },
  { id: 8, name: "Fernanda Rocha", phone: "(11) 91098-7654", sector: "RH" },
]

export function UsersManagement() {
  const [users] = useState(initialUsers)
  const [selectedUsers, setSelectedUsers] = useState<number[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const { toast } = useToast()

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phone.includes(searchTerm) ||
      user.sector.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const toggleUser = (userId: number) => {
    setSelectedUsers((prev) => (prev.includes(userId) ? prev.filter((id) => id !== userId) : [...prev, userId]))
  }

  const toggleAll = () => {
    if (selectedUsers.length === filteredUsers.length) {
      setSelectedUsers([])
    } else {
      setSelectedUsers(filteredUsers.map((u) => u.id))
    }
  }

  const handleSendMessage = () => {
    if (selectedUsers.length === 0) {
      toast({
        title: "Nenhum participante selecionado",
        description: "Selecione pelo menos um participante para enviar a pesquisa.",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Pesquisa enviada!",
      description: `Convite enviado para ${selectedUsers.length} participante(s).`,
    })
    setSelectedUsers([])
  }

  return (
    <div className="space-y-6">
      <Card className="border-none shadow-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg">Gerenciar Participantes</CardTitle>
              <CardDescription className="text-sm">Selecione quem receberá a pesquisa de bem-estar</CardDescription>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="border-primary/20 text-primary hover:bg-primary/10 bg-transparent"
            >
              <UserPlus className="h-4 w-4 mr-2" />
              Adicionar
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar por nome, telefone ou setor..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-border/50 focus-visible:ring-primary"
                />
              </div>
              <Button
                onClick={handleSendMessage}
                disabled={selectedUsers.length === 0}
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                <Send className="h-4 w-4 mr-2" />
                Enviar Pesquisa ({selectedUsers.length})
              </Button>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-4 px-4 py-2 text-sm font-medium text-muted-foreground">
                <Checkbox
                  checked={filteredUsers.length > 0 && selectedUsers.length === filteredUsers.length}
                  onCheckedChange={toggleAll}
                />
                <div className="grid grid-cols-12 gap-4 flex-1">
                  <div className="col-span-4">Nome</div>
                  <div className="col-span-4">Telefone</div>
                  <div className="col-span-4">Setor</div>
                </div>
              </div>

              <div className="space-y-2">
                {filteredUsers.map((user) => (
                  <div
                    key={user.id}
                    className="flex items-center gap-4 px-4 py-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                  >
                    <Checkbox checked={selectedUsers.includes(user.id)} onCheckedChange={() => toggleUser(user.id)} />
                    <div className="grid grid-cols-12 gap-4 flex-1">
                      <div className="col-span-4 font-medium text-foreground">{user.name}</div>
                      <div className="col-span-4 text-muted-foreground font-mono text-sm">{user.phone}</div>
                      <div className="col-span-4">
                        <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                          {user.sector}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {filteredUsers.length === 0 && (
              <div className="text-center py-12 text-muted-foreground">Nenhum participante encontrado</div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
