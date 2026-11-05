import { type Key, type ReactNode, type TableHTMLAttributes } from 'react';
import { useThemeStyles, type ThemeConfig, type ShadowProps } from './Theme.js';

export interface TableColumn<T> {
  id: string;
  header: ReactNode;
  render: (row: T) => ReactNode;
}

export interface TableProps<T> extends ShadowProps, Omit<TableHTMLAttributes<HTMLTableElement>, 'children'> {
  columns: TableColumn<T>[];
  rows: T[];
  getRowKey: (row: T) => Key;
  emptyMessage?: ReactNode;
  caption?: string;
  theme?: ThemeConfig;
}

export function Table<T>({ columns, rows, getRowKey, emptyMessage = 'No hay datos disponibles', caption, theme, shadowOffset, className, style, ...props }: TableProps<T>) {
  const themeStyles = useThemeStyles(theme, shadowOffset);
  return (
    <div className="sneo-table-root" style={themeStyles}>
      {caption && <div className="sneo-table-title" aria-hidden="true">{caption}</div>}
      <div className="sneo-table-container">
      <table {...props} className={['sneo-table', className].filter(Boolean).join(' ')} style={style}>
        {caption && <caption>{caption}</caption>}
        <thead><tr>{columns.map(column => <th key={column.id} scope="col">{column.header}</th>)}</tr></thead>
        <tbody>
          {rows.map(row => <tr key={getRowKey(row)}>{columns.map(column => <td key={column.id}>{column.render(row)}</td>)}</tr>)}
          {rows.length === 0 && columns.length > 0 && <tr><td colSpan={columns.length}>{emptyMessage}</td></tr>}
        </tbody>
      </table>
      </div>
    </div>
  );
}
