import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { useThemeStyles, type ThemeConfig } from './Theme.js';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Color de fondo del botón. */
  variant?: 'yellow' | 'blue' | 'green' | 'pink';
  theme?: ThemeConfig;
}

/** Botón inspirado en los controles de tokens-dashboard. Importa también sneo-brutalism/styles.css. */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = 'yellow', theme, style, className, type = 'button', ...props },
  ref,
) {
  const themeStyles = useThemeStyles(theme);
  return (
    <button
      {...props}
      ref={ref}
      type={type}
      style={{ ...themeStyles, ...style }}
      className={['sneo-button', `sneo-button--${variant}`, className].filter(Boolean).join(' ')}
    />
  );
});
