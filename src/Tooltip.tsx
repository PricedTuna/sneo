import { useId, useState, type ReactNode } from 'react';
import { useThemeStyles, type ThemeConfig, type ShadowProps } from './Theme.js';

export interface TooltipProps extends ShadowProps {
  content: ReactNode;
  label?: string;
  theme?: ThemeConfig;
  className?: string;
}

/** Ayuda breve disponible al pasar el cursor o enfocar el botón. */
export function Tooltip({ content, label = 'Más información', theme, className, shadowOffset }: TooltipProps) {
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const id = useId();
  const themeStyles = useThemeStyles(theme, shadowOffset);
  const visible = (hovered || focused) && !dismissed;

  return (
    <span className={['sneo-tooltip', className].filter(Boolean).join(' ')} style={themeStyles}
      onMouseEnter={() => { setHovered(true); setDismissed(false); }}
      onMouseLeave={() => { setHovered(false); setDismissed(false); }}
      onKeyDown={(event) => { if (event.key === 'Escape') setDismissed(true); }}>
      <button type="button" className="sneo-tooltip__trigger" aria-label={label} aria-describedby={visible ? id : undefined}
        onFocus={() => { setFocused(true); setDismissed(false); }} onBlur={() => { setFocused(false); setDismissed(false); }}
        onClick={() => { setFocused(true); setDismissed(false); }}>?</button>
      {visible && <span id={id} role="tooltip" className="sneo-tooltip__content">{content}</span>}
    </span>
  );
}
