import React from 'react';

export interface StatBlockProps {
  /** The numeric or text value */
  value?: string | number;
  /** Unit suffix (e.g. "ヶ国", "+", "%") */
  unit?: string;
  /** Descriptive label */
  label?: string;
  /** Color emphasis */
  accent?: 'gold' | 'navy' | 'none';
}

const ACCENT_COLORS: Record<string, string> = {
  gold: 'var(--brand-gold)',
  navy: 'var(--brand-navy)',
  none: 'var(--text-primary)',
};

export function StatBlock({ value = 5, unit = 'ヶ国', label = '展開国', accent = 'gold' }: StatBlockProps) {
  const color = ACCENT_COLORS[accent];
  return (
    <div style={{ fontFamily: 'var(--font-jp)', textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '4px' }}>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: '2px' }}>
        <span style={{ fontSize: 'var(--fs-display)', fontWeight: 900, lineHeight: 1, color }}>
          {value}
        </span>
        {unit && (
          <span style={{ fontSize: 'var(--fs-h3)', fontWeight: 600, lineHeight: 1, color }}>
            {unit}
          </span>
        )}
      </div>
      {label && (
        <div style={{ fontSize: 'var(--fs-body-sm)', color: 'var(--text-secondary)', letterSpacing: '0.04em' }}>
          {label}
        </div>
      )}
    </div>
  );
}
