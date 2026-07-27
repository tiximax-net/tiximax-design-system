import type { ReactNode } from 'react';

// Shared scaffold placeholder. Each feature page renders one until its
// domain logic is built. Keeps the shell navigable without faking behaviour.
interface PagePlaceholderProps {
  title: string;
  /** FR references this screen maps to, e.g. "FR-1, FR-2, FR-3". */
  requirements: string;
  children?: ReactNode;
}

export function PagePlaceholder({ title, requirements, children }: PagePlaceholderProps) {
  return (
    <section className="page">
      <h1 className="page__title">{title}</h1>
      <p className="page__req">Maps to: {requirements}</p>
      <div className="page__todo">
        <p>Structural placeholder — business logic not implemented yet.</p>
        {children}
      </div>
    </section>
  );
}
