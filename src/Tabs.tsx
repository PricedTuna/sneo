import { useId, useRef, useState, type HTMLAttributes, type KeyboardEvent, type ReactNode } from 'react';
import { useThemeStyles, type ShadowProps, type ThemeConfig } from './Theme.js';

export interface TabItem {
  /** Identificador único y estable dentro del grupo. */
  id: string;
  label: ReactNode;
  content: ReactNode;
  disabled?: boolean;
}

export interface TabsProps extends Omit<HTMLAttributes<HTMLDivElement>, 'defaultValue' | 'onChange'>, ShadowProps {
  items: TabItem[];
  /** Identificador seleccionado; omítelo para usar estado interno. */
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  /** Nombre accesible del grupo de pestañas. */
  label?: string;
  /** Desplazamiento hacia arriba de la pestaña activa, en píxeles. */
  elevation?: number;
  theme?: ThemeConfig;
}

/** Pestañas horizontales con activación mediante teclado. */
export function Tabs({ items, value, defaultValue, onChange, label = 'Pestañas', elevation, shadowOffset, theme, className, style, ...props }: TabsProps) {
  const id = useId();
  const [internalValue, setInternalValue] = useState(() => defaultValue ?? items.find(item => !item.disabled)?.id);
  const buttons = useRef<Array<HTMLButtonElement | null>>([]);
  const themeStyles = useThemeStyles(theme, shadowOffset, { elevation });
  const selected = value ?? internalValue;
  const selectedIndex = items.findIndex(item => item.id === selected && !item.disabled);
  // A missing or disabled selection must not leave the group without a keyboard entry point.
  const activeIndex = selectedIndex >= 0 ? selectedIndex : items.findIndex(item => !item.disabled);

  function select(index: number) {
    const item = items[index];
    if (!item || item.disabled) return;
    if (value === undefined) setInternalValue(item.id);
    if (item.id !== selected) onChange?.(item.id);
  }

  function onKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    const enabled = items.map((item, i) => !item.disabled ? i : -1).filter(i => i >= 0);
    if (!enabled.length) return;
    const current = enabled.indexOf(index);
    const next = event.key === 'Home' ? enabled[0] : event.key === 'End' ? enabled[enabled.length - 1]
      : enabled[(current + (event.key === 'ArrowRight' ? 1 : -1) + enabled.length) % enabled.length];
    buttons.current[next]?.focus();
    select(next);
  }

  return (
    <div {...props} className={['sneo-tabs', className].filter(Boolean).join(' ')} style={{ ...themeStyles, ...style }}>
      <div className="sneo-tabs__list" role="tablist" aria-label={label}>
        {items.map((item, index) => (
          <button key={item.id} ref={node => { buttons.current[index] = node; }} type="button" role="tab"
            id={`${id}-tab-${index}`} aria-controls={`${id}-panel-${index}`} aria-selected={index === activeIndex}
            tabIndex={index === activeIndex ? 0 : -1} disabled={item.disabled} className="sneo-tabs__tab"
            onClick={() => select(index)} onKeyDown={event => onKeyDown(event, index)}>{item.label}</button>
        ))}
      </div>
      {items.map((item, index) => (
        <div key={item.id} role="tabpanel" id={`${id}-panel-${index}`} aria-labelledby={`${id}-tab-${index}`}
          hidden={index !== activeIndex} tabIndex={0} className="sneo-tabs__panel">{item.content}</div>
      ))}
    </div>
  );
}
