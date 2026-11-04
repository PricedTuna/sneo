import { forwardRef, type ButtonHTMLAttributes, type CSSProperties } from 'react';
import { useThemeStyles, type ThemeConfig } from './Theme.js';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Color de fondo del botón. */
  variant?: 'yellow' | 'blue' | 'green' | 'pink';
  /** Padding CSS del botón; por defecto es 10px 20px. */
  padding?: CSSProperties['padding'];
  theme?: ThemeConfig;
}

/** Botón inspirado en los controles de tokens-dashboard. Importa también sneo-brutalism/styles.css. */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = 'yellow', padding, theme, style, className, type = 'button', ...props },
  ref,
) {
  const themeStyles = useThemeStyles(theme);
  return (
    <button
      {...props}
      ref={ref}
      type={type}
      style={{ ...themeStyles, ...(padding !== undefined && { padding }), ...style }}
      className={['sneo-button', `sneo-button--${variant}`, className].filter(Boolean).join(' ')}
    />
  );
});
