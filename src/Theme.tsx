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

/** Desplazamiento de la sombra en píxeles; sobrescribe el tema. */
export interface ShadowProps { shadowOffset?: number }
/** Elevación de controles interactivos, en píxeles. */
export interface ElevationProps extends ShadowProps {
  elevation?: number;
  hoverElevation?: number;
  pressedOffset?: number;
}

export function useThemeStyles(overrides?: ThemeConfig, shadowOffset?: number, elevationProps?: ElevationProps): CSSProperties {
  const { elevation, hoverElevation, pressedOffset } = elevationProps ?? {};
  const config = { ...useContext(ThemeContext), ...overrides, ...(shadowOffset != null && { shadowOffset, dropdownShadowOffset: shadowOffset }), ...(elevation != null && { elevation }), ...(hoverElevation != null && { hoverElevation }), ...(pressedOffset != null && { pressedOffset }) };
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
