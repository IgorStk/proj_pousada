import { useEffect, useRef, useState } from "react";

// Linhas da onda extraídas do wave-container-100.svg fornecido pelo usuário
const LINHA_ONDA_1 =
  "M119.952 29.9966C155.955 32.4969 191.958 34.9971 269.964 34.9971C419.976 34.9971 419.976 24.996 569.988 24.996C726 24.996 713.999 34.9971 870.012 34.9971C1020.02 34.9971 1020.02 24.996 1170.04 24.996C1248.04 24.996 1284.05 27.4963 1320.05 29.9966";
const LINHA_ONDA_2 =
  "M119.952 60C155.955 62.5003 191.958 65.0006 269.964 65.0006C419.976 65.0006 419.976 54.9994 569.988 54.9994C726 54.9994 713.999 65.0006 870.012 65.0006C1020.02 65.0006 1020.02 54.9994 1170.04 54.9994C1248.04 54.9994 1284.05 57.4997 1320.05 60";
const LINHA_ONDA_3 =
  "M119.952 90.0034C155.955 92.5037 191.958 95.004 269.964 95.004C419.976 95.004 419.976 85.0029 569.988 85.0029C726 85.0029 713.999 95.004 870.012 95.004C1020.02 95.004 1020.02 85.0029 1170.04 85.0029C1248.04 85.0029 1284.05 87.5031 1320.05 90.0034";

const DURACAO_MS = 2200; 
const ESPERA_MS = 350; 
const FADE_MS = 500; 
const DERIVA_SEGUNDOS = 20; 

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

function TileOnda() {
  return (
    <svg
      viewBox="0 0 1440 120"
      preserveAspectRatio="none"
      className="h-full w-[100vw] flex-none"
    >
      <g
        style={{ stroke: "var(--color-atlantico)" }}
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      >
        <path d={LINHA_ONDA_1} />
        <path d={LINHA_ONDA_2} />
        <path d={LINHA_ONDA_3} />
      </g>
    </svg>
  );
}

interface PreloaderProps {
  onFinish?: () => void;
}


export function Preloader({ onFinish }: PreloaderProps) {
  const [progresso, setProgresso] = useState(0);
  const [saindo, setSaindo] = useState(false);
  const [visivel, setVisivel] = useState(true);
  const [reduzMovimento] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const inicioRef = useRef<number | null>(null);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    function encerrar(delay: number) {
      setTimeout(() => {
        setSaindo(true);
        setTimeout(() => {
          setVisivel(false);
          onFinish?.();
        }, FADE_MS);
      }, delay);
    }

    if (reduzMovimento) {
      setProgresso(100);
      encerrar(150);
      return;
    }

    function passo(agora: number) {
      if (inicioRef.current === null) inicioRef.current = agora;
      const decorrido = agora - inicioRef.current;
      const t = Math.min(decorrido / DURACAO_MS, 1);
      setProgresso(Math.round(easeOutCubic(t) * 100));

      if (t < 1) {
        frameRef.current = requestAnimationFrame(passo);
      } else {
        encerrar(ESPERA_MS);
      }
    }

    frameRef.current = requestAnimationFrame(passo);
    return () => cancelAnimationFrame(frameRef.current);
  }, [onFinish, reduzMovimento]);

  useEffect(() => {
    document.body.style.overflow = visivel ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [visivel]);

  if (!visivel) return null;

  const topoAgua = Math.max(18, 100 - progresso * 0.82);

  return (
    <div
      className={`fixed inset-0 z-[9999] overflow-hidden bg-areia-clara transition-opacity duration-500 ${
        saindo ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      role="status"
      aria-live="polite"
      aria-label={`Carregando, ${progresso}%`}
    >
      <style>{`
        @keyframes onda-deriva {
          from { transform: translateX(0); }
          to { transform: translateX(-100vw); }
        }
      `}</style>

      <div
        className="absolute left-1/2 top-[42%] z-10 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-atlantico/10 md:h-52 md:w-52"
        aria-hidden="true"
      />

      <div
        className="absolute inset-x-0 bottom-0 z-20 bg-atlantico transition-[top] duration-500 ease-out"
        style={{ top: `${topoAgua}vh` }}
      >
        <div
          className="absolute inset-x-0 bottom-full h-[90px] overflow-hidden md:h-[130px]"
          aria-hidden="true"
        >
          <div
            className="flex h-full"
            style={{
              width: "300vw",
              animation: reduzMovimento
                ? "none"
                : `onda-deriva ${DERIVA_SEGUNDOS}s linear infinite`,
            }}
          >
            <TileOnda />
            <TileOnda />
            <TileOnda />
          </div>
        </div>

        <p className="pt-16 text-center font-mono text-4xl text-branco md:pt-24 md:text-6xl">
          {progresso}%
        </p>
      </div>
    </div>
  );
}