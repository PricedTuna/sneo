import { forwardRef, type AnchorHTMLAttributes, type HTMLAttributes, type ReactNode } from 'react';
import { useThemeStyles, type ThemeConfig, type ShadowProps } from './Theme.js';

export interface TopNavbarProps extends ShadowProps, HTMLAttributes<HTMLElement> {
  /** Marca o enlace principal, situado al inicio de la barra. */
  brand?: ReactNode;
  /** Acción opcional situada al final de la barra. */
  action?: ReactNode;
  /** Muestra la sombra de la barra; activada por defecto. */
  shadow?: boolean;
  theme?: ThemeConfig;
}

/** Barra flotante superior con marca, enlaces y acción opcional. */
export const TopNavbar = forwardRef<HTMLElement, TopNavbarProps>(function TopNavbar(
  { brand, action, children, shadow = true, theme, shadowOffset, style, className, 'aria-label': ariaLabel = 'Navegación principal', ...props },
  ref,
) {
  const themeStyles = useThemeStyles(theme, shadowOffset);
  return (
    <nav {...props} ref={ref} aria-label={ariaLabel} style={{ ...themeStyles, ...style }} className={['sneo-top-navbar', shadow && 'sneo-top-navbar--shadow', className].filter(Boolean).join(' ')}>
      {brand != null && <div className="sneo-top-navbar__brand">{brand}</div>}
      <div className="sneo-top-navbar__links">{children}</div>
      {action != null && <div className="sneo-top-navbar__action">{action}</div>}
    </nav>
  );
});

export interface TopNavbarItemProps extends ShadowProps, AnchorHTMLAttributes<HTMLAnchorElement> {
  active?: boolean;
}

export const TopNavbarItem = forwardRef<HTMLAnchorElement, TopNavbarItemProps>(function TopNavbarItem(
  { active = false, shadowOffset, style, className, 'aria-current': ariaCurrent, ...props }, ref,
) {
  const shadowStyle = shadowOffset != null ? { '--sneo-shadow-offset': `${shadowOffset}px` } : {};
  return <a {...props} ref={ref} style={{ ...shadowStyle, ...style }} aria-current={ariaCurrent ?? (active ? 'page' : undefined)} className={['sneo-top-navbar__item', active && 'sneo-top-navbar__item--active', className].filter(Boolean).join(' ')} />;
});
