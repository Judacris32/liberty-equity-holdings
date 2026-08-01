"use client";

/**
 * Lightweight inline SVG sparkline — no charting library needed for a
 * simple 7-day trend line. Colored by overall trend direction.
 */
export function Sparkline({
  data,
  width = 100,
  height = 32,
}: {
  data: number[];
  width?: number;
  height?: number;
}) {
  if (!data || data.length < 2) {
    return <div style={{ width, height }} />;
  }

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const isUp = data[data.length - 1] >= data[0];

  const points = data
    .map((value, i) => {
      const x = (i / (data.length - 1)) * width;
      const y = height - ((value - min) / range) * height;
      return `${x.toFixed(2)},${y.toFixed(2)}`;
    })
    .join(" ");

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} fill="none">
      <polyline
        points={points}
        fill="none"
        stroke={isUp ? "#00ff88" : "#ff3b30"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
