// https://youtu.be/2g1_FIGjuvc?si=eAn4ou71l20j3frO

export default function ArtigoCefaleiaPage() {
  return (
    <main className="p-8 bg-gray-900 text-white min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Video Saude e bem estar</h1>

      <p className="mb-6 text-lg">
        A cefaleia, ou dor de cabeça, é uma das condições mais comuns na
        população mundial. Apesar de muitas vezes ser considerada algo simples,
        pode impactar significativamente a qualidade de vida.
      </p>

      <h2 className="text-2xl font-semibold mb-3">Principais tipos de cefaleia</h2>
      <ul className="list-disc list-inside mb-6 space-y-2">
        <li><strong>Tensional:</strong> geralmente causada por estresse e tensão muscular.</li>
        <li><strong>Enxaqueca:</strong> dor mais intensa, às vezes acompanhada de náusea e sensibilidade à luz.</li>
        <li><strong>Cefaleia em salvas:</strong> dor súbita e muito intensa, em episódios cíclicos.</li>
      </ul>

      <h2 className="text-2xl font-semibold mb-3">Dicas práticas</h2>
      <p className="mb-6">
        Algumas medidas simples podem ajudar a reduzir a frequência e intensidade:
      </p>
      <ul className="list-disc list-inside mb-8 space-y-2">
        <li>Manter hidratação adequada.</li>
        <li>Evitar longos períodos em jejum.</li>
        <li>Controlar o estresse com pausas e exercícios de relaxamento.</li>
        <li>Manter rotina regular de sono.</li>
      </ul>

      <p className="mb-4">
        Se a dor de cabeça for frequente ou muito intensa, é importante procurar
        avaliação médica para diagnóstico e tratamento adequados.
      </p>

      <a
        href="/"
        className="inline-block px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-white font-medium transition"
      >
        ← Voltar
      </a>
    </main>
  );
}
