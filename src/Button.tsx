import { forwardRef, type ButtonHTMLAttributes } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Color de fondo del botón. */
  variant?: 'yellow' | 'blue' | 'green' | 'pink';
}

/** Botón inspirado en los controles de tokens-dashboard. Importa también sneo-brutalism/styles.css. */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = 'yellow', className, type = 'button', ...props },
  ref,
) {
  return (
    <button
      {...props}
      ref={ref}
      type={type}
      className={['sneo-button', `sneo-button--${variant}`, className].filter(Boolean).join(' ')}
    />
  );
});
