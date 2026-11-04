import { createContext, useContext, type CSSProperties, type ReactNode } from 'react';

export interface ThemeConfig {
  primaryColor?: string;
  accentColor?: string;
  borderColor?: string;
  fontFamily?: string;
  /** Elevación en píxeles en reposo y al pasar el cursor. */
  elevation?: number;
  hoverElevation?: number;
  /** Desplazamiento hacia abajo al pulsar, en píxeles. */
  pressedOffset?: number;
  shadowOffset?: number;
  dropdownShadowOffset?: number;
  borderWidth?: number;
  borderRadius?: number;
  animationDuration?: number;
}

const ThemeContext = createContext<ThemeConfig>({});

export function ThemeProvider({ config, children }: { config: ThemeConfig; children: ReactNode }) {
  const parent = useContext(ThemeContext);
  return <ThemeContext.Provider value={{ ...parent, ...config }}>{children}</ThemeContext.Provider>;
}

export function useThemeStyles(overrides?: ThemeConfig): CSSProperties {
  const config = { ...useContext(ThemeContext), ...overrides };
  return {
    ...(config.primaryColor && { '--sneo-primary': config.primaryColor }),
    ...(config.accentColor && { '--sneo-accent': config.accentColor }),
    ...(config.borderColor && { '--sneo-border': config.borderColor }),
    ...(config.fontFamily && { '--sneo-font': config.fontFamily }),
    ...(config.elevation != null && { '--sneo-elevation': `${config.elevation}px` }),
    ...(config.hoverElevation != null && { '--sneo-hover-elevation': `${config.hoverElevation}px` }),
    ...(config.pressedOffset != null && { '--sneo-pressed-offset': `${config.pressedOffset}px` }),
    ...(config.shadowOffset != null && { '--sneo-shadow-offset': `${config.shadowOffset}px` }),
    ...(config.dropdownShadowOffset != null && { '--sneo-dropdown-shadow-offset': `${config.dropdownShadowOffset}px` }),
    ...(config.borderWidth != null && { '--sneo-border-width': `${config.borderWidth}px` }),
    ...(config.borderRadius != null && { '--sneo-border-radius': `${config.borderRadius}px` }),
    ...(config.animationDuration != null && { '--sneo-duration': `${config.animationDuration}ms` }),
  } as CSSProperties;
}
