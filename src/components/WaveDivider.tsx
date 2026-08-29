interface WaveDividerProps {
  corTopo?: string;
  corFundo: string;
  flip?: boolean;
}

/** Divisória em forma de maré entre seções — o elemento de assinatura do site. */
export function WaveDivider({ corFundo, flip = false }: WaveDividerProps) {
  return (
    <div
      aria-hidden="true"
      className={flip ? "rotate-180" : ""}
      style={{ lineHeight: 0 }}
    >
      <svg
        viewBox="0 0 1200 80"
        preserveAspectRatio="none"
        className="w-full h-[50px] md:h-[70px]"
      >
        <path
          d="M0,40 C150,90 350,0 600,35 C850,70 1050,10 1200,45 L1200,80 L0,80 Z"
          fill={corFundo}
        />
      </svg>
    </div>
  );
}
