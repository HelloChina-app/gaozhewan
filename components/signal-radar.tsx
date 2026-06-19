// 纯展示组件：首页题图。手工矢量雷达，品牌色，无外部依赖、无 node:fs。
// 用 CSS 动画做扫描与脉冲，并在 prefers-reduced-motion 下自动静止。

const blips = [
  { x: 1060, y: 360, r: 7, color: "var(--brand)", delay: "0s" },
  { x: 540, y: 560, r: 6, color: "#43d39b", delay: "0.8s" },
  { x: 980, y: 640, r: 5, color: "#5b8dff", delay: "1.6s" },
  { x: 690, y: 330, r: 5, color: "#43d39b", delay: "2.2s" },
  { x: 1140, y: 540, r: 6, color: "var(--brand)", delay: "1.1s" }
];

export function SignalRadar() {
  return (
    <svg
      className="radar-visual"
      viewBox="0 0 1600 1000"
      role="img"
      aria-label="全球信号雷达：实时扫描各处新奇信号"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <radialGradient id="radar-bg" cx="50%" cy="48%" r="70%">
          <stop offset="0%" stopColor="#1f1d12" />
          <stop offset="60%" stopColor="#151308" />
          <stop offset="100%" stopColor="#0b0a05" />
        </radialGradient>
        <linearGradient id="radar-sweep" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#ffd600" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#ffd600" stopOpacity="0" />
        </linearGradient>
        <radialGradient id="radar-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffd600" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#ffd600" stopOpacity="0" />
        </radialGradient>
      </defs>

      <style>{`
        .radar-sweep { transform-origin: 800px 500px; animation: radar-spin 6s linear infinite; }
        .radar-blip { animation: radar-pulse 2.6s ease-in-out infinite; transform-origin: center; }
        @keyframes radar-spin { to { transform: rotate(360deg); } }
        @keyframes radar-pulse {
          0%, 100% { opacity: 0.35; }
          50% { opacity: 1; }
        }
        @media (prefers-reduced-motion: reduce) {
          .radar-sweep, .radar-blip { animation: none; }
          .radar-blip { opacity: 0.9; }
        }
      `}</style>

      <rect width="1600" height="1000" fill="url(#radar-bg)" />
      <circle cx="800" cy="500" r="430" fill="url(#radar-glow)" />

      {/* 同心环 */}
      {[140, 250, 360, 430].map((r, i) => (
        <circle
          key={r}
          cx="800"
          cy="500"
          r={r}
          fill="none"
          stroke="#ffd600"
          strokeOpacity={i === 3 ? 0.34 : 0.16}
          strokeWidth={i === 3 ? 2 : 1.4}
        />
      ))}

      {/* 十字与对角线 */}
      <g stroke="#ffd600" strokeOpacity="0.12" strokeWidth="1.3">
        <line x1="800" y1="62" x2="800" y2="938" />
        <line x1="362" y1="500" x2="1238" y2="500" />
        <line x1="490" y1="190" x2="1110" y2="810" />
        <line x1="1110" y1="190" x2="490" y2="810" />
      </g>

      {/* 刻度 */}
      <g stroke="#ffd600" strokeOpacity="0.4" strokeWidth="2">
        {Array.from({ length: 24 }).map((_, i) => {
          const a = (i * 15 * Math.PI) / 180;
          const r1 = 430;
          const r2 = i % 6 === 0 ? 408 : 420;
          return (
            <line
              key={i}
              x1={800 + r1 * Math.cos(a)}
              y1={500 + r1 * Math.sin(a)}
              x2={800 + r2 * Math.cos(a)}
              y2={500 + r2 * Math.sin(a)}
            />
          );
        })}
      </g>

      {/* 扫描扇形 */}
      <g className="radar-sweep">
        <path
          d="M800 500 L800 70 A430 430 0 0 1 1130 290 Z"
          fill="url(#radar-sweep)"
        />
        <line
          x1="800"
          y1="500"
          x2="800"
          y2="70"
          stroke="#ffd600"
          strokeOpacity="0.85"
          strokeWidth="2"
        />
      </g>

      {/* 信号点 */}
      {blips.map((b) => (
        <g key={`${b.x}-${b.y}`} className="radar-blip" style={{ animationDelay: b.delay }}>
          <circle cx={b.x} cy={b.y} r={b.r + 8} fill={b.color} opacity="0.18" />
          <circle cx={b.x} cy={b.y} r={b.r} fill={b.color} />
        </g>
      ))}

      <circle cx="800" cy="500" r="6" fill="#ffd600" />
    </svg>
  );
}
