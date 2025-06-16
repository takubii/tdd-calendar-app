import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { IconButton } from '@/app/components/ui/IconButton';

// テスト用のアイコンコンポーネント
const TestIcon = () => <svg data-testid="test-icon" />;

describe('IconButton', () => {
  it('アイコンを正しく表示する', () => {
    render(<IconButton icon={<TestIcon />} aria-label="テストボタン" />);

    expect(screen.getByRole('button', { name: 'テストボタン' })).toBeInTheDocument();
    expect(screen.getByTestId('test-icon')).toBeInTheDocument();
  });

  it('aria-labelが必須で正しく設定される', () => {
    render(<IconButton icon={<TestIcon />} aria-label="アイコンボタン" />);

    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-label', 'アイコンボタン');
  });

  it('クリック時にonClickハンドラーが呼ばれる', () => {
    const handleClick = vi.fn();
    render(
      <IconButton
        icon={<TestIcon />}
        aria-label="クリックボタン"
        onClick={handleClick}
      />
    );

    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('disabled状態の時クリックできない', () => {
    const handleClick = vi.fn();
    render(
      <IconButton
        icon={<TestIcon />}
        aria-label="無効ボタン"
        onClick={handleClick}
        disabled
      />
    );

    const button = screen.getByRole('button');
    expect(button).toBeDisabled();

    fireEvent.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('loading状態の時アイコンがスピナーに変わる', () => {
    render(
      <IconButton
        icon={<TestIcon />}
        aria-label="読み込み中"
        loading
      />
    );

    expect(screen.queryByTestId('test-icon')).not.toBeInTheDocument();
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
  });

  it('loading状態の時ボタンが無効化される', () => {
    render(
      <IconButton
        icon={<TestIcon />}
        aria-label="読み込み中"
        loading
      />
    );

    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });

  describe('variant props', () => {
    it('primaryバリアント（デフォルト）のスタイルが適用される', () => {
      render(<IconButton icon={<TestIcon />} aria-label="Primary" />);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('bg-blue-600', 'text-white');
    });

    it('primaryバリアントのスタイルが適用される', () => {
      render(
        <IconButton
          icon={<TestIcon />}
          aria-label="Primary"
          variant="primary"
        />
      );
      const button = screen.getByRole('button');
      expect(button).toHaveClass('bg-blue-600', 'text-white');
    });

    it('secondaryバリアントのスタイルが適用される', () => {
      render(
        <IconButton
          icon={<TestIcon />}
          aria-label="Secondary"
          variant="secondary"
        />
      );
      const button = screen.getByRole('button');
      expect(button).toHaveClass('bg-gray-200', 'text-gray-900');
    });

    it('dangerバリアントのスタイルが適用される', () => {
      render(
        <IconButton
          icon={<TestIcon />}
          aria-label="Danger"
          variant="danger"
        />
      );
      const button = screen.getByRole('button');
      expect(button).toHaveClass('bg-red-600', 'text-white');
    });

    it('ghostバリアントのスタイルが適用される', () => {
      render(
        <IconButton
          icon={<TestIcon />}
          aria-label="Ghost"
          variant="ghost"
        />
      );
      const button = screen.getByRole('button');
      expect(button).toHaveClass('bg-transparent', 'text-gray-600');
    });
  });

  describe('size props', () => {
    it('mediumサイズ（デフォルト）のスタイルが適用される', () => {
      render(<IconButton icon={<TestIcon />} aria-label="Medium" />);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('p-2');
    });

    it('smallサイズのスタイルが適用される', () => {
      render(
        <IconButton
          icon={<TestIcon />}
          aria-label="Small"
          size="sm"
        />
      );
      const button = screen.getByRole('button');
      expect(button).toHaveClass('p-1.5');
    });

    it('largeサイズのスタイルが適用される', () => {
      render(
        <IconButton
          icon={<TestIcon />}
          aria-label="Large"
          size="lg"
        />
      );
      const button = screen.getByRole('button');
      expect(button).toHaveClass('p-3');
    });
  });

  describe('アクセシビリティ', () => {
    it('ボタンのroleが正しく設定される', () => {
      render(<IconButton icon={<TestIcon />} aria-label="テスト" />);
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('フォーカス時にfocus-ring-2クラスが適用される', () => {
      render(<IconButton icon={<TestIcon />} aria-label="テスト" />);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('focus:ring-2');
    });

    it('outline-noneクラスが適用される', () => {
      render(<IconButton icon={<TestIcon />} aria-label="テスト" />);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('focus:outline-none');
    });
  });

  describe('スタイリング', () => {
    it('基本スタイルが適用される', () => {
      render(<IconButton icon={<TestIcon />} aria-label="テスト" />);
      const button = screen.getByRole('button');
      expect(button).toHaveClass(
        'rounded-md',
        'transition-colors',
        'inline-flex',
        'items-center',
        'justify-center'
      );
    });

    it('カスタムクラス名が適用される', () => {
      render(
        <IconButton
          icon={<TestIcon />}
          aria-label="カスタム"
          className="custom-class"
        />
      );
      const button = screen.getByRole('button');
      expect(button).toHaveClass('custom-class');
    });
  });

  describe('HTMLボタン属性', () => {
    it('type属性が渡される', () => {
      render(
        <IconButton
          icon={<TestIcon />}
          aria-label="送信"
          type="submit"
        />
      );
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('type', 'submit');
    });

    it('その他のHTML属性が渡される', () => {
      render(
        <IconButton
          icon={<TestIcon />}
          aria-label="テスト"
          data-testid="test-icon-button"
        />
      );
      expect(screen.getByTestId('test-icon-button')).toBeInTheDocument();
    });
  });
});