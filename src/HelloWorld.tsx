import { type HTMLAttributes } from 'react';
import { useThemeStyles, type ShadowProps, type ThemeConfig } from './Theme.js';

export interface HelloWorldProps extends HTMLAttributes<HTMLParagraphElement>, ShadowProps { theme?: ThemeConfig }

export function HelloWorld({ theme, shadowOffset, style, className, ...props }: HelloWorldProps) {
  const themeStyles = useThemeStyles(theme, shadowOffset);
  return <p {...props} className={['sneo-hello-world', className].filter(Boolean).join(' ')} style={{ ...themeStyles, ...style }}>¡Hola mundo!</p>;
}
