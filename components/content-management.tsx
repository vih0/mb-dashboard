// components/content-management.tsx
"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
type ContentItem = {
  id: number;
  title: string;
  description: string;
  link: string;
};

const contents: ContentItem[] = [
  {
    id: 1,
    title: "Mini game para aliviar o stress",
    description: "Um joguinho simples para relaxar durante o expediente.",
    link: "/conteudos/mini-game",
  },
  {
    id: 2,
    title: "Artigo sobre cefaleia",
    description: "Informações úteis sobre como lidar com dores de cabeça no dia a dia.",
    link: "/conteudos/artigo-cefaleia",
  },
  {
    id: 3,
    title: "Vídeo sobre saúde mental",
    description: "Um vídeo curto com dicas práticas para melhorar a saúde mental.",
    link: "/conteudos/video-saude",
  },
];

export function ContentManagement() {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const selectedContent = contents.find((c) => c.id === selectedId);

  return (
    <div className="space-y-6">
      <Card className="border-none shadow-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg">Repositório de Conteúdos</CardTitle>
              <CardDescription className="text-sm">Selecione um conteúdo para detalhar</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="p-6 min-h-screen text-white">
              <h1 className="text-2xl font-bold mb-4">Gerenciamento de Conteúdos</h1>

              <ul className="space-y-2 mb-6">
                {contents.map((content) => (
                  <li key={content.id}>
                    <button
                      onClick={() => setSelectedId(content.id)}
                      className={`w-full text-left px-4 py-2 rounded-lg transition 
                        ${selectedId === content.id ? "bg-blue-600" : "bg-gray-800 hover:bg-gray-700"}`}
                    >
                      {content.title}
                    </button>
                  </li>
                ))}
              </ul>

              {selectedContent && (
                <div className="p-4 border rounded-lg bg-gray-800">
                  <h2 className="text-xl font-semibold mb-2">{selectedContent.title}</h2>
                  <p className="mb-4">{selectedContent.description}</p>
                  <a
                    href={selectedContent.link}
                    className="text-blue-400 underline hover:text-blue-300"
                  >
                    Acessar conteúdo →
                  </a>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
