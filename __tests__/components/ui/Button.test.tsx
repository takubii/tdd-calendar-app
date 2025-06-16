import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from '@/app/components/ui/Button';

describe('Button', () => {
  it('子要素を正しく表示する', () => {
    render(<Button>クリック</Button>);
    expect(screen.getByRole('button', { name: 'クリック' })).toBeInTheDocument();
  });

  it('クリック時にonClickハンドラーが呼ばれる', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>クリック</Button>);

    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('disabled状態の時クリックできない', () => {
    const handleClick = vi.fn();
    render(
      <Button onClick={handleClick} disabled>
        クリック
      </Button>
    );

    const button = screen.getByRole('button');
    expect(button).toBeDisabled();

    fireEvent.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('loading状態の時「読み込み中...」を表示する', () => {
    render(<Button loading>送信</Button>);

    expect(screen.getByText('読み込み中...')).toBeInTheDocument();
    expect(screen.queryByText('送信')).not.toBeInTheDocument();
  });

  it('loading状態の時ボタンが無効化される', () => {
    render(<Button loading>送信</Button>);

    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });

  describe('variant props', () => {
    it('primaryバリアント（デフォルト）のスタイルが適用される', () => {
      render(<Button>Primary</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('bg-blue-600', 'text-white');
    });

    it('primaryバリアントのスタイルが適用される', () => {
      render(<Button variant="primary">Primary</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('bg-blue-600', 'text-white');
    });

    it('secondaryバリアントのスタイルが適用される', () => {
      render(<Button variant="secondary">Secondary</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('bg-gray-200', 'text-gray-900');
    });

    it('dangerバリアントのスタイルが適用される', () => {
      render(<Button variant="danger">Danger</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('bg-red-600', 'text-white');
    });
  });

  describe('size props', () => {
    it('mediumサイズ（デフォルト）のスタイルが適用される', () => {
      render(<Button>Medium</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('px-4', 'py-2');
    });

    it('smallサイズのスタイルが適用される', () => {
      render(<Button size="sm">Small</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('px-3', 'py-1.5', 'text-sm');
    });

    it('largeサイズのスタイルが適用される', () => {
      render(<Button size="lg">Large</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('px-6', 'py-3', 'text-lg');
    });
  });

  describe('アクセシビリティ', () => {
    it('ボタンのroleが正しく設定される', () => {
      render(<Button>テスト</Button>);
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('フォーカス時にfocus-ring-2クラスが適用される', () => {
      render(<Button>テスト</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('focus:ring-2');
    });

    it('outline-noneクラスが適用される', () => {
      render(<Button>テスト</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('focus:outline-none');
    });
  });

  describe('カスタムクラス', () => {
    it('カスタムクラス名が適用される', () => {
      render(<Button className="custom-class">カスタム</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('custom-class');
    });

    it('基本クラスとカスタムクラスが両方適用される', () => {
      render(<Button className="custom-class">カスタム</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('custom-class');
      expect(button).toHaveClass('rounded-md');
      expect(button).toHaveClass('font-medium');
    });
  });

  describe('HTMLボタン属性', () => {
    it('type属性が渡される', () => {
      render(<Button type="submit">送信</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('type', 'submit');
    });

    it('その他のHTML属性が渡される', () => {
      render(<Button data-testid="test-button">テスト</Button>);
      expect(screen.getByTestId('test-button')).toBeInTheDocument();
    });
  });
});