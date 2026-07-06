import React from 'react';

export interface ButtonProps {
  /** Visual style */
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  /** Button size */
  size?: 'sm' | 'md' | 'lg';
  children?: React.ReactNode;
  disabled?: boolean;
  /** Stretch to full container width */
  fullWidth?: boolean;
  onClick?: () => void;
}

const VARIANTS: Record<string, React.CSSProperties> = {
  primary:   { background: 'var(--brand-gold)',  color: 'var(--brand-navy)',    borderColor: 'var(--brand-gold)' },
  secondary: { background: 'var(--brand-navy)',  color: 'var(--text-inverse)',  borderColor: 'var(--brand-navy)' },
  outline:   { background: 'transparent',        color: 'var(--brand-navy)',    borderColor: 'var(--brand-navy)' },
  ghost:     { background: 'transparent',        color: 'var(--text-secondary)', borderColor: 'transparent' },
};

const SIZES: Record<string, React.CSSProperties> = {
  sm: { fontSize: 'var(--fs-body-sm)', padding: '6px 14px' },
  md: { fontSize: 'var(--fs-body)',    padding: '10px 20px' },
  lg: { fontSize: 'var(--fs-body-lg)', padding: '14px 28px' },
};

export function Button({
  variant = 'primary',
  size = 'md',
  children = 'Button',
  disabled = false,
  fullWidth = false,
  onClick,
}: ButtonProps) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'var(--font-jp)',
        fontWeight: 600,
        borderRadius: 'var(--radius-sm)',
        border: '2px solid transparent',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.45 : 1,
        width: fullWidth ? '100%' : undefined,
        whiteSpace: 'nowrap',
        lineHeight: 1,
        transition: 'opacity 0.15s',
        ...VARIANTS[variant],
        ...SIZES[size],
      }}
    >
      {children}
    </button>
  );
}
