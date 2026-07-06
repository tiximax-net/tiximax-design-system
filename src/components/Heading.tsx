import React from 'react';

export interface HeadingProps {
  /** Heading level */
  level?: 1 | 2 | 3 | 4;
  /** Color variant */
  variant?: 'primary' | 'navy' | 'gold' | 'inverse';
  /** Text alignment */
  align?: 'left' | 'center' | 'right';
  children?: React.ReactNode;
}

const LEVEL_STYLES: Record<number, React.CSSProperties> = {
  1: { fontSize: 'var(--fs-h1)', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.1 },
  2: { fontSize: 'var(--fs-h2)', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.25 },
  3: { fontSize: 'var(--fs-h3)', fontWeight: 600, lineHeight: 1.25 },
  4: { fontSize: 'var(--fs-h4)', fontWeight: 600, lineHeight: 1.25 },
};

const COLORS: Record<string, string> = {
  primary: 'var(--text-primary)',
  navy:    'var(--brand-navy)',
  gold:    'var(--text-brand)',
  inverse: 'var(--text-inverse)',
};

export function Heading({ level = 1, variant = 'primary', align = 'left', children = 'Heading' }: HeadingProps) {
  const Tag = `h${level}` as 'h1' | 'h2' | 'h3' | 'h4';
  return (
    <Tag style={{
      margin: 0,
      fontFamily: 'var(--font-jp)',
      textAlign: align,
      color: COLORS[variant],
      ...LEVEL_STYLES[level],
    }}>
      {children}
    </Tag>
  );
}
