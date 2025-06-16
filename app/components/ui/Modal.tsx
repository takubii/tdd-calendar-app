'use client';

import { useEffect, useRef, useCallback, useMemo, ReactNode } from 'react';
import { cn } from '@/app/lib/utils';
import { generateId } from '@/app/lib/utils';

// フォーカス可能要素のセレクタ
const FOCUSABLE_ELEMENTS_SELECTOR =
  'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
}

// クローズアイコンコンポーネント
function CloseIcon() {
  return (
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  );
}

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);

  // 一意なIDを生成（コンポーネントのライフサイクル中は固定）
  const titleId = useMemo(() => `modal-title-${generateId()}`, []);

  // フォーカス管理のヘルパー関数
  const focusFirstElement = useCallback(() => {
    setTimeout(() => {
      const focusableElements = dialogRef.current?.querySelectorAll(FOCUSABLE_ELEMENTS_SELECTOR);
      if (focusableElements && focusableElements.length > 0) {
        (focusableElements[0] as HTMLElement).focus();
      }
    }, 0);
  }, []);

  // キーボードイベントハンドラー
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      onClose();
    }
  }, [onClose]);

  // オーバーレイクリックハンドラー
  const handleOverlayClick = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  }, [onClose]);

  // Escapeキーでモーダルを閉じる + フォーカス管理
  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      focusFirstElement();
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, handleKeyDown, focusFirstElement]);

  if (!isOpen) {
    return null;
  }

  return (
    <div
      data-testid="modal-overlay"
      className={cn(
        'fixed inset-0 z-50 flex items-center justify-center',
        'bg-black bg-opacity-50'
      )}
      onClick={handleOverlayClick}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
        className={cn(
          'bg-white rounded-lg shadow-xl',
          'max-w-md w-full mx-4',
          'max-h-[90vh] overflow-y-auto'
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {title && (
          <div className="flex items-center justify-between p-6 border-b">
            <h2
              id={titleId}
              className="text-lg font-semibold text-gray-900"
              role="heading"
            >
              {title}
            </h2>
            <button
              type="button"
              onClick={onClose}
              className={cn(
                'text-gray-400 hover:text-gray-600',
                'hover:bg-gray-100 rounded-md p-1',
                'transition-colors duration-200'
              )}
              aria-label="閉じる"
            >
              <CloseIcon />
            </button>
          </div>
        )}

        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
}