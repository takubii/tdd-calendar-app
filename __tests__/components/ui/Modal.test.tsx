import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Modal } from '@/app/components/ui/Modal';

describe('Modal', () => {
  const mockOnClose = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('基本機能', () => {
    it('isOpenがfalseの時はモーダルを表示しない', () => {
      render(
        <Modal isOpen={false} onClose={mockOnClose}>
          <p>モーダルコンテンツ</p>
        </Modal>
      );

      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
      expect(screen.queryByText('モーダルコンテンツ')).not.toBeInTheDocument();
    });

    it('isOpenがtrueの時はモーダルを表示する', () => {
      render(
        <Modal isOpen={true} onClose={mockOnClose}>
          <p>モーダルコンテンツ</p>
        </Modal>
      );

      expect(screen.getByRole('dialog')).toBeInTheDocument();
      expect(screen.getByText('モーダルコンテンツ')).toBeInTheDocument();
    });

    it('子要素を正しく表示する', () => {
      render(
        <Modal isOpen={true} onClose={mockOnClose}>
          <div>
            <h2>見出し</h2>
            <p>本文</p>
            <button>ボタン</button>
          </div>
        </Modal>
      );

      expect(screen.getByText('見出し')).toBeInTheDocument();
      expect(screen.getByText('本文')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'ボタン' })).toBeInTheDocument();
    });

    it('titleが指定された時はタイトルを表示する', () => {
      render(
        <Modal isOpen={true} onClose={mockOnClose} title="テストタイトル">
          <p>コンテンツ</p>
        </Modal>
      );

      expect(screen.getByText('テストタイトル')).toBeInTheDocument();
    });

    it('titleが指定されていない時はタイトルを表示しない', () => {
      render(
        <Modal isOpen={true} onClose={mockOnClose}>
          <p>コンテンツ</p>
        </Modal>
      );

      // タイトル要素が存在しないことを確認
      expect(screen.queryByRole('heading')).not.toBeInTheDocument();
    });
  });

  describe('閉じる機能', () => {
    it('オーバーレイクリック時にonCloseが呼ばれる', () => {
      render(
        <Modal isOpen={true} onClose={mockOnClose}>
          <p>コンテンツ</p>
        </Modal>
      );

      const overlay = screen.getByTestId('modal-overlay');
      fireEvent.click(overlay);

      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });

    it('閉じるボタンクリック時にonCloseが呼ばれる', () => {
      render(
        <Modal isOpen={true} onClose={mockOnClose} title="タイトル">
          <p>コンテンツ</p>
        </Modal>
      );

      const closeButton = screen.getByRole('button', { name: '閉じる' });
      fireEvent.click(closeButton);

      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });

    it('Escapeキー押下時にonCloseが呼ばれる', () => {
      render(
        <Modal isOpen={true} onClose={mockOnClose}>
          <p>コンテンツ</p>
        </Modal>
      );

      fireEvent.keyDown(document, { key: 'Escape' });

      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });

    it('Escapeキー以外のキー押下時はonCloseが呼ばれない', () => {
      render(
        <Modal isOpen={true} onClose={mockOnClose}>
          <p>コンテンツ</p>
        </Modal>
      );

      fireEvent.keyDown(document, { key: 'Enter' });
      fireEvent.keyDown(document, { key: 'Space' });

      expect(mockOnClose).not.toHaveBeenCalled();
    });
  });

  describe('アクセシビリティ', () => {
    it('dialog roleが設定されている', () => {
      render(
        <Modal isOpen={true} onClose={mockOnClose}>
          <p>コンテンツ</p>
        </Modal>
      );

      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    it('aria-modal属性が設定されている', () => {
      render(
        <Modal isOpen={true} onClose={mockOnClose}>
          <p>コンテンツ</p>
        </Modal>
      );

      const dialog = screen.getByRole('dialog');
      expect(dialog).toHaveAttribute('aria-modal', 'true');
    });

    it('titleが指定された時aria-labelledby属性が設定される', () => {
      render(
        <Modal isOpen={true} onClose={mockOnClose} title="テストタイトル">
          <p>コンテンツ</p>
        </Modal>
      );

      const dialog = screen.getByRole('dialog');
      const title = screen.getByText('テストタイトル');

      expect(dialog).toHaveAttribute('aria-labelledby');
      expect(title).toHaveAttribute('id');
      expect(dialog.getAttribute('aria-labelledby')).toBe(title.getAttribute('id'));
    });

    it('モーダル内のコンテンツにフォーカスが移る', async () => {
      render(
        <Modal isOpen={true} onClose={mockOnClose}>
          <button>フォーカス対象</button>
        </Modal>
      );

      const button = screen.getByRole('button', { name: 'フォーカス対象' });

      // フォーカス処理が非同期なので少し待つ
      await new Promise(resolve => setTimeout(resolve, 10));

      expect(button).toHaveFocus();
    });
  });

  describe('スタイリング', () => {
    it('基本的なスタイルクラスが適用されている', () => {
      render(
        <Modal isOpen={true} onClose={mockOnClose}>
          <p>コンテンツ</p>
        </Modal>
      );

      const overlay = screen.getByTestId('modal-overlay');
      const dialog = screen.getByRole('dialog');

      // オーバーレイのスタイル確認
      expect(overlay).toHaveClass('fixed', 'inset-0', 'z-50');

      // ダイアログのスタイル確認
      expect(dialog).toHaveClass('bg-white', 'rounded-lg', 'shadow-xl');
    });

    it('タイトル付きモーダルでヘッダースタイルが適用される', () => {
      render(
        <Modal isOpen={true} onClose={mockOnClose} title="テストタイトル">
          <p>コンテンツ</p>
        </Modal>
      );

      const title = screen.getByText('テストタイトル');
      const closeButton = screen.getByRole('button', { name: '閉じる' });

      expect(title).toHaveClass('text-lg', 'font-semibold');
      expect(closeButton).toHaveClass('text-gray-400', 'hover:text-gray-600');
    });
  });

  describe('イベント処理', () => {
    it('モーダル内部のクリックではonCloseが呼ばれない', () => {
      render(
        <Modal isOpen={true} onClose={mockOnClose}>
          <div data-testid="modal-content">
            <p>コンテンツ</p>
          </div>
        </Modal>
      );

      const content = screen.getByTestId('modal-content');
      fireEvent.click(content);

      expect(mockOnClose).not.toHaveBeenCalled();
    });

    it('モーダルが閉じられた時はイベントリスナーが削除される', () => {
      const { rerender } = render(
        <Modal isOpen={true} onClose={mockOnClose}>
          <p>コンテンツ</p>
        </Modal>
      );

      // モーダルを閉じる
      rerender(
        <Modal isOpen={false} onClose={mockOnClose}>
          <p>コンテンツ</p>
        </Modal>
      );

      // Escapeキーを押してもonCloseが呼ばれないことを確認
      fireEvent.keyDown(document, { key: 'Escape' });
      expect(mockOnClose).not.toHaveBeenCalled();
    });
  });
});