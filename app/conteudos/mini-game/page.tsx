"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

type Bubble = {
  id: number;
  x: number;      // 0..100 (% da largura da área)
  y: number;      // 0..100 (% da altura da área)
  size: number;   // px
  bornAt: number; // ms
  lifeMs: number; // ms
};

const GAME_DURATION = 30; // segundos
const DESKTOP = { MIN_SIZE: 36, MAX_SIZE: 72, MAX_BUBBLES: 12, SPAWN_MS: 400 };
const MOBILE  = { MIN_SIZE: 48, MAX_SIZE: 88, MAX_BUBBLES: 14, SPAWN_MS: 350 };
const MIN_LIFE = 2400;
const MAX_LIFE = 4800;

export default function MiniGamePage() {
  const [running, setRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [score, setScore] = useState(0);
  const [best, setBest] = useState<number>(() => {
    if (typeof window === "undefined") return 0;
    const v = window.localStorage.getItem("bubble_best");
    return v ? Number(v) : 0;
  });

  const [isMobile, setIsMobile] = useState<boolean>(() => {
    if (typeof window === "undefined") return true;
    return window.innerWidth < 768;
  });

  const cfg = isMobile ? MOBILE : DESKTOP;
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const lastIdRef = useRef(0);
  const areaRef = useRef<HTMLDivElement | null>(null);
  const areaSizeRef = useRef<{ w: number; h: number }>({ w: 1, h: 1 });

  // timers
  const startAtRef = useRef<number | null>(null);
  const spawnTimerRef = useRef<NodeJS.Timeout | null>(null);
  const pruneTimerRef = useRef<NodeJS.Timeout | null>(null);
  const clockTimerRef = useRef<NodeJS.Timeout | null>(null);

  // responsividade
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // observar tamanho real da área (para margens das bolhas)
  useEffect(() => {
    if (!areaRef.current) return;
    const el = areaRef.current;
    const ro = new ResizeObserver((entries) => {
      for (const e of entries) {
        areaSizeRef.current = { w: e.contentRect.width, h: e.contentRect.height };
      }
    });
    ro.observe(el);
    // set inicial
    areaSizeRef.current = { w: el.clientWidth, h: el.clientHeight };
    return () => ro.disconnect();
  }, []);

  const rand = useCallback((min: number, max: number) => Math.random() * (max - min) + min, []);

  const spawnBubble = useCallback(() => {
    lastIdRef.current += 1;
    const id = lastIdRef.current;

    const size = Math.round(rand(cfg.MIN_SIZE, cfg.MAX_SIZE));
    const { w, h } = areaSizeRef.current;

    // margem em % para evitar cortar nas bordas
    const marginX = (size / Math.max(1, w)) * 100;
    const marginY = (size / Math.max(1, h)) * 100;

    // posição aleatória respeitando margens
    const x = Math.max(0, Math.min(100 - marginX, rand(0, 100 - marginX)));
    const y = Math.max(0, Math.min(100 - marginY, rand(0, 100 - marginY)));

    const lifeMs = Math.round(rand(MIN_LIFE, MAX_LIFE));
    const b: Bubble = { id, x, y, size, bornAt: Date.now(), lifeMs };

    setBubbles((prev) => (prev.length >= cfg.MAX_BUBBLES ? prev : [...prev, b]));
  }, [cfg.MAX_BUBBLES, cfg.MIN_SIZE, cfg.MAX_SIZE, rand]);

  const stopGame = useCallback(() => {
    setRunning(false);
    if (spawnTimerRef.current) clearInterval(spawnTimerRef.current);
    if (pruneTimerRef.current) clearInterval(pruneTimerRef.current);
    if (clockTimerRef.current) clearInterval(clockTimerRef.current);
    spawnTimerRef.current = pruneTimerRef.current = clockTimerRef.current = null;
    startAtRef.current = null;
    setBubbles([]);
    setBest((prev) => {
      const newBest = Math.max(prev, score);
      if (typeof window !== "undefined") {
        window.localStorage.setItem("bubble_best", String(newBest));
      }
      return newBest;
    });
  }, [score]);

  const startGame = useCallback(() => {
    setScore(0);
    setTimeLeft(GAME_DURATION);
    setBubbles([]);
    setRunning(true);
    startAtRef.current = Date.now();

    if (spawnTimerRef.current) clearInterval(spawnTimerRef.current);
    spawnTimerRef.current = setInterval(() => spawnBubble(), cfg.SPAWN_MS);

    if (pruneTimerRef.current) clearInterval(pruneTimerRef.current);
    pruneTimerRef.current = setInterval(() => {
      const now = Date.now();
      setBubbles((prev) => prev.filter((b) => now - b.bornAt < b.lifeMs));
    }, 120);

    if (clockTimerRef.current) clearInterval(clockTimerRef.current);
    clockTimerRef.current = setInterval(() => {
      if (!startAtRef.current) return;
      const elapsed = (Date.now() - startAtRef.current) / 1000;
      const remaining = Math.max(0, GAME_DURATION - elapsed);
      setTimeLeft(Number(remaining.toFixed(1)));
      if (remaining <= 0) stopGame();
    }, 100);
  }, [cfg.SPAWN_MS, spawnBubble, stopGame]);

  useEffect(() => {
    return () => {
      if (spawnTimerRef.current) clearInterval(spawnTimerRef.current);
      if (pruneTimerRef.current) clearInterval(pruneTimerRef.current);
      if (clockTimerRef.current) clearInterval(clockTimerRef.current);
    };
  }, []);

  const popBubble = useCallback((id: number) => {
    if (!running) return;
    setBubbles((prev) => prev.filter((b) => b.id !== id));
    setScore((s) => s + 1);
  }, [running]);

  const headerInfo = useMemo(
    () => [
      { label: "Tempo", value: `${timeLeft.toFixed(1)}s` },
      { label: "Pontos", value: score },
      { label: "Recorde", value: best },
    ],
    [timeLeft, score, best]
  );

  return (
    <main className="min-h-screen bg-gray-950 text-white">
      <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 py-6 sm:py-8">
        <div className="mb-4 sm:mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <h1 className="text-2xl sm:text-3xl font-bold">Minigame: Estourar Bolhas</h1>
          <div className="flex items-center gap-2">
            {running ? (
              <button
                onClick={stopGame}
                className="px-4 py-2 sm:px-5 sm:py-2.5 rounded-lg font-semibold bg-red-600 hover:bg-red-500 transition"
              >
                Encerrar
              </button>
            ) : (
              <button
                onClick={startGame}
                className="px-4 py-2 sm:px-5 sm:py-2.5 rounded-lg font-semibold bg-blue-600 hover:bg-blue-500 transition"
              >
                Iniciar
              </button>
            )}
          </div>
        </div>

        <div className="mb-4 grid grid-cols-3 gap-2 sm:gap-3">
          {headerInfo.map((h) => (
            <div key={h.label} className="rounded-xl bg-gray-900 border border-gray-800 p-3 sm:p-4 text-center">
              <div className="text-xs sm:text-sm text-gray-400">{h.label}</div>
              <div className="text-xl sm:text-2xl font-bold">{h.value}</div>
            </div>
          ))}
        </div>

        {!running && timeLeft === 0 && (
          <div className="mb-4 rounded-lg border border-gray-800 bg-gray-900 px-4 py-3">
            <p className="text-gray-200">
              Fim de jogo! Você fez <span className="font-semibold">{score}</span> ponto(s).
              {score >= best ? " 🏆 Novo recorde!" : ""}
            </p>
            <button
              onClick={startGame}
              className="mt-3 inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 font-medium hover:bg-blue-500"
            >
              Jogar novamente
            </button>
          </div>
        )}

        <div
          ref={areaRef}
          className={`
            relative rounded-2xl bg-gradient-to-b from-sky-900/40 to-gray-900
            border border-gray-800 overflow-hidden select-none
            touch-none
            h-[75vh] sm:h-[70vh]
          `}
          role="application"
          aria-label="Área do jogo - toque nas bolhas para estourar"
          onContextMenu={(e) => e.preventDefault()}
        >
          {/* instrução inicial */}
          {!running && timeLeft === GAME_DURATION && (
            <div className="absolute inset-0 flex items-center justify-center p-4">
              <div className="text-center">
                <p className="text-base sm:text-lg text-gray-300">
                  Estoure o máximo de bolhas em {GAME_DURATION} segundos!
                </p>
                <p className="text-xs sm:text-sm text-gray-400 mt-2">
                  Toque/clique nas bolhas para pontuar. O tempo sempre corre.
                </p>
              </div>
            </div>
          )}

          {/* bolhas */}
          {bubbles.map((b) => (
            <button
              key={b.id}
              onClick={() => popBubble(b.id)}
              aria-label="Estourar bolha"
              className="absolute rounded-full focus:outline-none focus:ring-2 focus:ring-white/60 active:scale-95 transition-transform"
              style={{
                left: `${b.x}%`,
                top: `${b.y}%`,
                width: b.size,
                height: b.size,
                transform: "translate(-0%, -0%)", // já compensamos pelas margens
              }}
            >
              <span
                className="block w-full h-full rounded-full"
                style={{
                  background:
                    "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.85) 0%, rgba(173,216,230,0.4) 35%, rgba(135,206,235,0.25) 60%, rgba(0,0,0,0.05) 100%)",
                  boxShadow:
                    "inset 0 0 8px rgba(255,255,255,0.9), inset 0 0 20px rgba(135,206,235,0.5), 0 6px 18px rgba(0,0,0,0.35)",
                  backdropFilter: "blur(2px)",
                  WebkitBackdropFilter: "blur(2px)",
                }}
              />
            </button>
          ))}

          {/* ondas decorativas */}
          <div className="pointer-events-none absolute inset-0 opacity-20">
            <svg viewBox="0 0 1440 320" className="absolute bottom-0 w-full h-24 sm:h-40">
              <path
                fill="currentColor"
                className="text-cyan-400"
                d="M0,160L60,149.3C120,139,240,117,360,112C480,107,600,117,720,106.7C840,96,960,64,1080,64C1200,64,1320,96,1380,112L1440,128L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
              />
            </svg>
          </div>
        </div>

        <div className="mt-4 sm:mt-6 flex items-center justify-between">
          <a href="/" className="text-sm text-gray-400 hover:text-gray-200 underline underline-offset-4">
            ← Voltar
          </a>
          <button
            onClick={startGame}
            className="rounded-lg bg-blue-600 px-4 py-2 sm:px-5 sm:py-2.5 font-medium hover:bg-blue-500"
          >
            {running ? "Reiniciar" : "Jogar agora"}
          </button>
        </div>
      </div>
    </main>
  );
}
