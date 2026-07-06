import React from 'react';

export interface BadgeProps {
  /** Color theme */
  variant?: 'gold' | 'navy' | 'success' | 'warning' | 'error' | 'neutral';
  children?: React.ReactNode;
}

const STYLES: Record<string, React.CSSProperties> = {
  gold:    { background: 'var(--gold-100)',    color: 'var(--gold-800)',     border: '1px solid var(--gold-200)' },
  navy:    { background: 'var(--navy-100)',    color: 'var(--navy-800)',     border: '1px solid var(--navy-200)' },
  success: { background: 'var(--success-bg)',  color: 'var(--text-success)', border: '1px solid var(--success-border)' },
  warning: { background: 'var(--warning-bg)',  color: 'var(--gold-800)',     border: '1px solid var(--warning-border)' },
  error:   { background: 'var(--error-bg)',    color: 'var(--text-error)',   border: '1px solid var(--error-border)' },
  neutral: { background: 'var(--neutral-100)', color: 'var(--neutral-700)', border: '1px solid var(--neutral-200)' },
};

export function Badge({ variant = 'neutral', children = 'Label' }: BadgeProps) {
  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      fontFamily: 'var(--font-jp)',
      fontSize: 'var(--fs-caption)',
      fontWeight: 600,
      letterSpacing: 'var(--ls-wide)',
      borderRadius: 'var(--radius-pill)',
      padding: '3px 10px',
      ...STYLES[variant],
    }}>
      {children}
    </span>
  );
}
