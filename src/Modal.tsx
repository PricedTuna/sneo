import { useEffect, useId, useRef, type ReactNode } from 'react';
import { useThemeStyles, type ThemeConfig } from './Theme.js';

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: ReactNode;
  children: ReactNode;
  closeLabel?: string;
  closeOnBackdrop?: boolean;
  theme?: ThemeConfig;
}

/** Diálogo modal controlado con foco y fondo modal nativos. */
export function Modal({ open, onClose, title, children, closeLabel = 'Cerrar', closeOnBackdrop = true, theme }: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const themeStyles = useThemeStyles(theme);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
    return () => { if (dialog.open) dialog.close(); };
  }, [open]);

  return (
    <dialog ref={dialogRef} className="sneo-modal" style={themeStyles} aria-labelledby={titleId}
      onCancel={(event) => { event.preventDefault(); onClose(); }}
      onClick={(event) => {
        if (!closeOnBackdrop || event.target !== event.currentTarget) return;
        const rect = event.currentTarget.getBoundingClientRect();
        if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) onClose();
      }}>
      <header className="sneo-modal__header">
        <h2 id={titleId} className="sneo-modal__title">{title}</h2>
        <button type="button" className="sneo-modal__close" aria-label={closeLabel} onClick={onClose}>×</button>
      </header>
      <div className="sneo-modal__body">{children}</div>
    </dialog>
  );
}
