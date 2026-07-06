import React from 'react';

export interface TagProps {
  children?: React.ReactNode;
  /** Color variant */
  color?: 'gold' | 'navy' | 'red' | 'neutral';
}

const STYLES: Record<string, React.CSSProperties> = {
  gold:    { background: 'var(--gold-50)',    color: 'var(--gold-700)',     border: '1px solid var(--gold-200)' },
  navy:    { background: 'var(--navy-50)',    color: 'var(--navy-700)',     border: '1px solid var(--navy-200)' },
  red:     { background: 'var(--red-50)',     color: 'var(--red-700)',      border: '1px solid var(--red-200)' },
  neutral: { background: 'var(--neutral-50)', color: 'var(--neutral-600)', border: '1px solid var(--neutral-200)' },
};

export function Tag({ children = 'Tag', color = 'neutral' }: TagProps) {
  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      fontFamily: 'var(--font-jp)',
      fontSize: '11px',
      fontWeight: 600,
      letterSpacing: '0.12em',
      textTransform: 'uppercase',
      borderRadius: 'var(--radius-xs)',
      padding: '3px 8px',
      ...STYLES[color],
    }}>
      {children}
    </span>
  );
}
