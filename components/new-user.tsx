"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"

interface AddParticipantModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onAddUser: (user: { name: string; phone: string; sector: string }) => void
}

export function AddParticipantModal({ open, onOpenChange, onAddUser }: AddParticipantModalProps) {
  const [newUser, setNewUser] = useState({ name: "", phone: "", sector: "" })
  const { toast } = useToast()

  const handleAddUser = () => {
    if (!newUser.name || !newUser.phone || !newUser.sector) {
      toast({
        title: "Campos obrigatórios",
        description: "Preencha todos os campos para cadastrar o participante.",
        variant: "destructive",
      })
      return
    }
     
    onAddUser(newUser)
    setNewUser({ name: "", phone: "", sector: "" })
    onOpenChange(false)

    toast({
      title: "Participante cadastrado!",
      description: `${newUser.name} foi adicionado com sucesso.`,
    })
  }

  const handleCancel = () => {
    setNewUser({ name: "", phone: "", sector: "" })
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Adicionar Participante</DialogTitle>
          <DialogDescription>Cadastre um novo participante para receber pesquisas de bem-estar</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Nome completo</Label>
            <Input
              id="name"
              placeholder="Ex: João Silva"
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
              className="border-border/50 focus-visible:ring-primary"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="phone">Telefone</Label>
            <Input
              id="phone"
              placeholder="(11) 98765-4321"
              value={newUser.phone}
              onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
              className="border-border/50 focus-visible:ring-primary"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="sector">Setor</Label>
            <Input
              id="sector"
              placeholder="Ex: RH, TI, Vendas"
              value={newUser.sector}
              onChange={(e) => setNewUser({ ...newUser, sector: e.target.value })}
              className="border-border/50 focus-visible:ring-primary"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={handleCancel}>
            Cancelar
          </Button>
          <Button onClick={handleAddUser} className="bg-primary hover:bg-primary/90">
            Cadastrar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
