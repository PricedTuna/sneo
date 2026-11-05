import { type HTMLAttributes, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { useThemeStyles, type ThemeConfig, type ElevationProps } from './Theme.js';

type CardBaseProps = ElevationProps & { title?: ReactNode; children?: ReactNode; theme?: ThemeConfig };

export type CardProps = CardBaseProps & (
  | ({ selectable?: false } & Omit<HTMLAttributes<HTMLElement>, 'title'>)
  | ({ selectable: true; selected: boolean } & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'title'>)
);

/** Tarjeta de contenido; usa selectable para convertirla en un botón de selección. */
export function Card(props: CardProps) {
  const themeStyles = useThemeStyles(props.theme, props.shadowOffset, props);
  if (props.selectable) {
    const { selectable, selected, title, children, theme, shadowOffset, elevation, hoverElevation, pressedOffset, style, className, type = 'button', ...rest } = props;
    return (
      <button {...rest} style={{ ...themeStyles, ...style }} type={type} aria-pressed={selected}
        className={['sneo-card', 'sneo-card--selectable', selected && 'sneo-card--selected', className].filter(Boolean).join(' ')}>
        {title != null && <span className="sneo-card__title">{title}</span>}
        {children}
        {selected && <span className="sneo-card__check" aria-hidden="true">✓</span>}
      </button>
    );
  }

  const { selectable, title, children, theme, shadowOffset, elevation, hoverElevation, pressedOffset, style, className, ...rest } = props;
  return (
    <article {...rest} style={{ ...themeStyles, ...style }} className={['sneo-card', className].filter(Boolean).join(' ')}>
      {title != null && <span className="sneo-card__title">{title}</span>}
      {children}
    </article>
  );
}
