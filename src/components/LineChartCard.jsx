import React, { useMemo, useState } from 'react';
import {
  CartesianGrid,
  Line,
  LineChart,
  ReferenceArea,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import './LineChartCard.css';

const HOUR_MS = 60 * 60 * 1000;

const DEFAULT_PERIODS = [
  { key: '24h', label: '24h', hours: 24 },
  { key: '7d', label: '7 dias', hours: 24 * 7 },
  { key: '30d', label: '30 dias', hours: 24 * 30 },
];

const SOURCE_LABELS = {
  sensor: 'Sensor',
  manual: 'Manual',
  estimado: 'Estimado',
  simulado: 'Simulado',
};

const STATUS_META = {
  ideal: { label: 'Ideal', className: 'lc-badge--ideal' },
  fora: { label: 'Fora da faixa', className: 'lc-badge--fora' },
  semFaixa: { label: 'Sem faixa definida', className: 'lc-badge--sem-faixa' },
};

const toMs = (t) => (t instanceof Date ? t.getTime() : new Date(t).getTime());
const isNum = (v) => typeof v === 'number' && Number.isFinite(v);

const fmtAxis = new Intl.DateTimeFormat('pt-BR', {
  day: '2-digit',
  month: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
});
const fmtFull = new Intl.DateTimeFormat('pt-BR', {
  dateStyle: 'short',
  timeStyle: 'short',
});
const fmtValue = new Intl.NumberFormat('pt-BR', { maximumFractionDigits: 1 });

/** Calcula o selo de situação a partir do valor e da faixa ideal. */
function getStatus(value, range) {
  const min = range?.min;
  const max = range?.max;
  const hasMin = isNum(min);
  const hasMax = isNum(max);
  if (!isNum(value) || (!hasMin && !hasMax)) return 'semFaixa';
  if ((hasMin && value < min) || (hasMax && value > max)) return 'fora';
  return 'ideal';
}

/**
 * Gráfico de linha genérico (ar, solo ou qualquer outra grandeza).
 *
 * Props:
 * - title:      string
 * - series:     [{ timestamp: Date | ms | ISO string, value: number }]
 * - unit:       string (ex.: '°C', '%')
 * - range:      { min?: number, max?: number } | null  (faixa ideal)
 * - source:     'sensor' | 'manual' | 'estimado' | 'simulado' | string
 * - periods:    [{ key, label, hours }]  (padrão: 24h, 7 dias, 30 dias)
 * - defaultPeriod: key do período inicial (padrão: o primeiro)
 * - now:        referência de "agora" em ms (padrão: momento em que o componente montou)
 * - color:      cor da linha
 * - height:     altura do gráfico em px
 */
export default function LineChartCard({
  title,
  series = [],
  unit = '',
  range = null,
  source = null,
  periods = DEFAULT_PERIODS,
  defaultPeriod,
  now,
  color = '#10b981',
  height = 260,
}) {
  const [periodKey, setPeriodKey] = useState(defaultPeriod ?? periods[0]?.key);
  const [mountedAt] = useState(() => Date.now());
  const period = periods.find((p) => p.key === periodKey) ?? periods[0];

  const points = useMemo(
    () =>
      series
        .map((p) => ({ t: toMs(p.timestamp), value: p.value }))
        .filter((p) => Number.isFinite(p.t) && isNum(p.value))
        .sort((a, b) => a.t - b.t),
    [series],
  );

  const end = now ?? mountedAt;
  const start = end - (period?.hours ?? 24) * HOUR_MS;

  const visible = useMemo(
    () => points.filter((p) => p.t >= start && p.t <= end),
    [points, start, end],
  );

  const ticks = useMemo(
    () => Array.from({ length: 5 }, (_, i) => start + ((end - start) * i) / 4),
    [start, end],
  );

  const last = points.length ? points[points.length - 1] : null;
  const status = STATUS_META[getStatus(last?.value, range)];
  const sourceLabel = source ? SOURCE_LABELS[source] ?? source : null;
  const hasRange = isNum(range?.min) || isNum(range?.max);
  const withUnit = (v) => `${fmtValue.format(v)}${unit ? ` ${unit}` : ''}`;

  return (
    <section className="lc-card">
      <header className="lc-header">
        <div>
          <h3 className="lc-title">{title}</h3>
          {last && <p className="lc-current">{withUnit(last.value)}</p>}
        </div>
        <div className="lc-badges">
          <span className={`lc-badge ${status.className}`}>{status.label}</span>
          {sourceLabel && <span className="lc-badge lc-badge--source">{sourceLabel}</span>}
        </div>
      </header>

      <div className="lc-periods" role="group" aria-label="Período">
        {periods.map((p) => (
          <button
            key={p.key}
            type="button"
            className={`lc-period${p.key === period?.key ? ' lc-period--active' : ''}`}
            aria-pressed={p.key === period?.key}
            onClick={() => setPeriodKey(p.key)}
          >
            {p.label}
          </button>
        ))}
      </div>

      {visible.length === 0 ? (
        <div className="lc-empty" style={{ height }}>
          Sem leituras neste período.
        </div>
      ) : (
        <div style={{ width: '100%', height }}>
          <ResponsiveContainer>
            <LineChart data={visible} margin={{ top: 8, right: 16, bottom: 0, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#edf0f2" />
              <XAxis
                dataKey="t"
                type="number"
                scale="time"
                domain={[start, end]}
                ticks={ticks}
                tickFormatter={(v) => fmtAxis.format(v)}
                tick={{ fontSize: 11, fill: '#6b7280' }}
              />
              <YAxis
                domain={['auto', 'auto']}
                tickFormatter={(v) => fmtValue.format(v)}
                tick={{ fontSize: 11, fill: '#6b7280' }}
                width={48}
                unit={unit ? ` ${unit}` : ''}
              />
              {hasRange && (
                <ReferenceArea
                  y1={isNum(range.min) ? range.min : undefined}
                  y2={isNum(range.max) ? range.max : undefined}
                  fill="#10b981"
                  fillOpacity={0.1}
                  ifOverflow="extendDomain"
                />
              )}
              <Tooltip
                labelFormatter={(v) => fmtFull.format(v)}
                formatter={(v) => [withUnit(v), title]}
              />
              <Line
                type="monotone"
                dataKey="value"
                stroke={color}
                strokeWidth={2}
                dot={false}
                isAnimationActive={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </section>
  );
}
