import React from 'react';

export interface ServiceCardProps {
  /** Service number label */
  number?: '01' | '02' | '03' | '04';
  /** Service name */
  title?: string;
  /** Short description */
  description?: string;
  /** Optional icon / emoji */
  icon?: React.ReactNode;
  /** Gold highlight variant */
  highlighted?: boolean;
}

export function ServiceCard({
  number = '01',
  title = '国際輸送',
  description = '航空・海上輸送、ルート最適化、フルトラッキング対応',
  icon,
  highlighted = false,
}: ServiceCardProps) {
  return (
    <div style={{
      background: highlighted ? 'var(--brand-gold)' : 'var(--surface-card)',
      color:      highlighted ? 'var(--brand-navy)' : 'var(--text-primary)',
      border:     highlighted ? 'none' : '1px solid var(--border-default)',
      borderRadius: 'var(--radius-md)',
      padding: '28px 24px',
      fontFamily: 'var(--font-jp)',
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
      boxShadow: highlighted ? 'var(--shadow-gold)' : 'var(--shadow-sm)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <span style={{
          fontSize: '11px',
          fontWeight: 700,
          letterSpacing: '0.12em',
          textTransform: 'uppercase' as const,
          color: highlighted ? 'rgba(12,26,49,0.55)' : 'var(--text-brand)',
        }}>
          {number}
        </span>
        {icon && <span style={{ fontSize: '22px', lineHeight: 1 }}>{icon}</span>}
      </div>
      <div>
        <div style={{ fontSize: 'var(--fs-title)', fontWeight: 600, marginBottom: '8px' }}>
          {title}
        </div>
        <div style={{
          fontSize: 'var(--fs-body-sm)',
          lineHeight: 1.65,
          color: highlighted ? 'rgba(12,26,49,0.7)' : 'var(--text-secondary)',
        }}>
          {description}
        </div>
      </div>
    </div>
  );
}
