import React from 'react';
import { TiximaxWordmark } from './TiximaxWordmark';

export interface NavbarProps {
  /** Navigation links */
  links?: Array<{ label: string; href?: string }>;
  /** Show the contact CTA button */
  showCta?: boolean;
  /** Dark (navy) background */
  dark?: boolean;
}

const DEFAULT_LINKS = [
  { label: 'サービス' },
  { label: '会社概要' },
  { label: 'ニュース' },
];

export function Navbar({
  links = DEFAULT_LINKS,
  showCta = true,
  dark = false,
}: NavbarProps) {
  const textColor = dark ? 'var(--text-inverse)' : 'var(--text-primary)';
  return (
    <nav style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 40px',
      height: '64px',
      background: dark ? 'var(--brand-navy)' : 'var(--neutral-0)',
      borderBottom: dark ? 'none' : '1px solid var(--border-subtle)',
      fontFamily: 'var(--font-jp)',
    }}>
      <a href="#" aria-label="Tiximax" style={{ display: 'flex', alignItems: 'center' }}>
        <TiximaxWordmark color={dark ? 'var(--text-inverse)' : 'var(--brand-navy)'} height={24} />
      </a>
      <ul style={{ display: 'flex', listStyle: 'none', margin: 0, padding: 0, gap: '32px', alignItems: 'center' }}>
        {links.map((link, i) => (
          <li key={i}>
            <a href={link.href ?? '#'} style={{ fontSize: 'var(--fs-body-sm)', fontWeight: 500, color: textColor, textDecoration: 'none' }}>
              {link.label}
            </a>
          </li>
        ))}
        {showCta && (
          <li>
            <button style={{
              background: 'var(--brand-gold)',
              color: 'var(--brand-navy)',
              border: 'none',
              borderRadius: 'var(--radius-sm)',
              padding: '8px 18px',
              fontSize: 'var(--fs-body-sm)',
              fontWeight: 600,
              cursor: 'pointer',
              fontFamily: 'var(--font-jp)',
            }}>
              お問い合わせ
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
}
