import { forwardRef, type CSSProperties, type HTMLAttributes } from 'react';
import { useThemeStyles, type ThemeConfig, type ShadowProps } from './Theme.js';

export interface BadgeProps extends ShadowProps, HTMLAttributes<HTMLSpanElement> {
  variant?: 'yellow' | 'blue' | 'green' | 'pink';
  padding?: CSSProperties['padding'];
  theme?: ThemeConfig;
}

/** Etiqueta visual con los colores de Button, sin comportamiento interactivo. */
export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(function Badge(
  { variant = 'yellow', padding, theme, shadowOffset, style, className, ...props }, ref,
) {
  const themeStyles = useThemeStyles(theme, shadowOffset);
  return <span {...props} ref={ref} style={{ ...themeStyles, ...(padding !== undefined && { padding }), ...style }} className={['sneo-badge', `sneo-badge--${variant}`, className].filter(Boolean).join(' ')} />;
});
