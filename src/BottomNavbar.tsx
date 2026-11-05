import { forwardRef, type AnchorHTMLAttributes, type HTMLAttributes } from 'react';
import { useThemeStyles, type ThemeConfig, type ShadowProps } from './Theme.js';

export interface BottomNavbarProps extends ShadowProps, HTMLAttributes<HTMLElement> {
  theme?: ThemeConfig;
}

/** Barra de navegación flotante fijada al borde inferior de la pantalla. */
export const BottomNavbar = forwardRef<HTMLElement, BottomNavbarProps>(function BottomNavbar(
  { theme, shadowOffset, style, className, 'aria-label': ariaLabel = 'Navegación inferior', ...props },
  ref,
) {
  const themeStyles = useThemeStyles(theme, shadowOffset);
  return <nav {...props} ref={ref} aria-label={ariaLabel} style={{ ...themeStyles, ...style }} className={['sneo-bottom-navbar', className].filter(Boolean).join(' ')} />;
});

export interface BottomNavbarItemProps extends ShadowProps, AnchorHTMLAttributes<HTMLAnchorElement> {
  /** Marca el enlace correspondiente a la página actual. */
  active?: boolean;
}

export const BottomNavbarItem = forwardRef<HTMLAnchorElement, BottomNavbarItemProps>(function BottomNavbarItem(
  { active = false, shadowOffset, style, className, 'aria-current': ariaCurrent, ...props },
  ref,
) {
  const shadowStyle = shadowOffset != null ? { '--sneo-shadow-offset': `${shadowOffset}px` } : {};
  return <a {...props} ref={ref} style={{ ...shadowStyle, ...style }} aria-current={ariaCurrent ?? (active ? 'page' : undefined)} className={['sneo-bottom-navbar__item', active && 'sneo-bottom-navbar__item--active', className].filter(Boolean).join(' ')} />;
});
