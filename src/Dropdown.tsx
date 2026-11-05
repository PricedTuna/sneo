import { useEffect, useId, useRef, useState, type ReactNode } from 'react';
import { Button } from './Button.js';
import { useThemeStyles, type ThemeConfig, type ElevationProps } from './Theme.js';

export interface DropdownItem {
  /** Identificador estable y único dentro del menú. */
  id: string;
  label: ReactNode;
  icon?: ReactNode;
  onSelect: () => void;
  disabled?: boolean;
}

export interface DropdownProps extends ElevationProps {
  label: ReactNode;
  items: DropdownItem[];
  disabled?: boolean;
  className?: string;
  theme?: ThemeConfig;
}

/** Menú de acciones inspirado en tokens-dashboard. */
export function Dropdown({ label, items, disabled = false, className, theme, shadowOffset, elevation, hoverElevation, pressedOffset }: DropdownProps) {
  const themeStyles = useThemeStyles(theme, shadowOffset, { elevation, hoverElevation, pressedOffset });
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelId = useId();
  const isOpen = open && !disabled;

  useEffect(() => {
    if (!isOpen) return;
    function onPointerDown(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    }
    document.addEventListener('pointerdown', onPointerDown);
    return () => document.removeEventListener('pointerdown', onPointerDown);
  }, [isOpen]);

  return (
    <div
      ref={rootRef}
      style={themeStyles}
      className={['sneo-dropdown', className].filter(Boolean).join(' ')}
      onKeyDown={(event) => {
        if (event.key === 'Escape' && isOpen) {
          event.preventDefault();
          setOpen(false);
          triggerRef.current?.focus();
        }
      }}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
      }}
    >
      <div className="sneo-dropdown__anchor">
      <Button ref={triggerRef} theme={theme} shadowOffset={shadowOffset} elevation={elevation} hoverElevation={hoverElevation} pressedOffset={pressedOffset} variant="blue" disabled={disabled} aria-expanded={isOpen}
        aria-controls={isOpen ? panelId : undefined} onClick={() => setOpen((value) => !value)}>
        {label}<span className="sneo-dropdown__arrow" aria-hidden="true" data-open={isOpen}>⌄</span>
      </Button>
      {isOpen && (
        <div id={panelId} className="sneo-dropdown__content">
          {items.map((item) => (
            <button key={item.id} type="button" className="sneo-dropdown__item" disabled={item.disabled}
              onClick={() => { setOpen(false); item.onSelect(); }}>
              {item.icon != null && <span className="sneo-dropdown__icon" aria-hidden="true">{item.icon}</span>}
              {item.label}
            </button>
          ))}
        </div>
      )}
      </div>
    </div>
  );
}
