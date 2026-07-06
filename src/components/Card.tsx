import React from 'react';

export interface CardProps {
  /** Card title */
  title?: string;
  /** Supporting description */
  description?: string;
  /** Visual background variant */
  variant?: 'default' | 'navy' | 'gold';
  /** Optional icon element at top */
  icon?: React.ReactNode;
  children?: React.ReactNode;
}

const VARIANTS: Record<string, React.CSSProperties> = {
  default: { background: 'var(--surface-card)', color: 'var(--text-primary)', border: '1px solid var(--border-default)' },
  navy:    { background: 'var(--brand-navy)',    color: 'var(--text-inverse)', border: 'none' },
  gold:    { background: 'var(--brand-gold)',    color: 'var(--brand-navy)',   border: 'none' },
};

export function Card({ title, description, variant = 'default', icon, children }: CardProps) {
  const isNavy = variant === 'navy';
  const isGold = variant === 'gold';
  return (
    <div style={{
      borderRadius: 'var(--radius-md)',
      padding: '24px',
      boxShadow: isGold ? 'var(--shadow-gold)' : 'var(--shadow-md)',
      fontFamily: 'var(--font-jp)',
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
      ...VARIANTS[variant],
    }}>
      {icon && <div style={{ fontSize: '28px', lineHeight: 1 }}>{icon}</div>}
      {title && (
        <div style={{
          fontSize: 'var(--fs-title)',
          fontWeight: 600,
          color: isNavy ? 'var(--text-inverse)' : 'var(--text-primary)',
        }}>
          {title}
        </div>
      )}
      {description && (
        <div style={{
          fontSize: 'var(--fs-body-sm)',
          lineHeight: 1.65,
          color: isNavy ? 'rgba(255,255,255,0.75)' : isGold ? 'rgba(12,26,49,0.7)' : 'var(--text-secondary)',
        }}>
          {description}
        </div>
      )}
      {children}
    </div>
  );
}
