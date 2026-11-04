import { forwardRef, useId, type InputHTMLAttributes, type SelectHTMLAttributes, type ReactNode, type HTMLAttributes } from 'react';
import { useThemeStyles, type ThemeConfig } from './Theme.js';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> { theme?: ThemeConfig }
export const Input = forwardRef<HTMLInputElement, InputProps>(function Input({ theme, className, style, ...props }, ref) {
  const styles = useThemeStyles(theme);
  return <input {...props} ref={ref} className={['sneo-input', className].filter(Boolean).join(' ')} style={{ ...styles, ...style }} />;
});

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> { theme?: ThemeConfig }
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox({ theme, className, style, ...props }, ref) {
  const styles = useThemeStyles(theme);
  return <input {...props} ref={ref} type="checkbox" className={['sneo-checkbox', className].filter(Boolean).join(' ')} style={{ ...styles, ...style }} />;
});

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> { theme?: ThemeConfig }
export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select({ theme, className, style, ...props }, ref) {
  const styles = useThemeStyles(theme);
  return <select {...props} ref={ref} className={['sneo-input', 'sneo-select', className].filter(Boolean).join(' ')} style={{ ...styles, ...style }} />;
});

export interface FieldProps {
  id?: string;
  label: ReactNode;
  hint?: ReactNode;
  error?: ReactNode;
  theme?: ThemeConfig;
  children: (props: { id: string; 'aria-describedby'?: string; 'aria-invalid'?: true }) => ReactNode;
}
export function Field({ id, label, hint, error, theme, children }: FieldProps) {
  const generatedId = useId();
  const fieldId = id ?? generatedId;
  const styles = useThemeStyles(theme);
  const describedBy = [hint != null && `${fieldId}-hint`, error != null && `${fieldId}-error`].filter(Boolean).join(' ') || undefined;
  return <div className="sneo-field" style={styles}>
    <label className="sneo-field__label" htmlFor={fieldId}>{label}</label>
    {children({ id: fieldId, 'aria-describedby': describedBy, ...(error != null && { 'aria-invalid': true as const }) })}
    {hint != null && <div id={`${fieldId}-hint`} className="sneo-field__hint">{hint}</div>}
    {error != null && <div id={`${fieldId}-error`} className="sneo-field__error">{error}</div>}
  </div>;
}

export interface AlertProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'info' | 'success' | 'warning' | 'error';
  theme?: ThemeConfig;
}
export function Alert({ variant = 'info', theme, className, style, role, ...props }: AlertProps) {
  const styles = useThemeStyles(theme);
  return <div {...props} role={role ?? (variant === 'error' ? 'alert' : 'status')} className={['sneo-alert', `sneo-alert--${variant}`, className].filter(Boolean).join(' ')} style={{ ...styles, ...style }} />;
}
