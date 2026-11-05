import { forwardRef, type DetailsHTMLAttributes, type ReactNode } from 'react';
import { useThemeStyles, type ThemeConfig, type ShadowProps } from './Theme.js';

export interface AccordionProps extends ShadowProps, Omit<DetailsHTMLAttributes<HTMLDetailsElement>, 'title'> {
  /** Texto de la pregunta o encabezado. */
  title: ReactNode;
  theme?: ThemeConfig;
}

/** Sección desplegable con comportamiento nativo de details y summary. */
export const Accordion = forwardRef<HTMLDetailsElement, AccordionProps>(function Accordion(
  { title, children, theme, shadowOffset, style, className, ...props }, ref,
) {
  const themeStyles = useThemeStyles(theme, shadowOffset);
  return (
    <details {...props} ref={ref} style={{ ...themeStyles, ...style }} className={['sneo-accordion', className].filter(Boolean).join(' ')}>
      <summary className="sneo-accordion__summary">
        <span>{title}</span><span className="sneo-accordion__icon" aria-hidden="true" />
      </summary>
      <div className="sneo-accordion__content">{children}</div>
    </details>
  );
});
