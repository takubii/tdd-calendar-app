import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Input } from '@/app/components/ui/Input';

describe('Input', () => {
  describe('基本機能', () => {
    it('プレースホルダーを正しく表示する', () => {
      render(<Input placeholder="名前を入力してください" />);
      expect(screen.getByPlaceholderText('名前を入力してください')).toBeInTheDocument();
    });

    it('初期値を正しく表示する', () => {
      render(<Input value="初期値" />);
      const input = screen.getByDisplayValue('初期値');
      expect(input).toBeInTheDocument();
    });

    it('入力時にonChangeハンドラーが呼ばれる', () => {
      const handleChange = vi.fn();
      render(<Input onChange={handleChange} />);

      const input = screen.getByRole('textbox');
      fireEvent.change(input, { target: { value: 'テスト入力' } });

      expect(handleChange).toHaveBeenCalledTimes(1);
      expect(handleChange).toHaveBeenCalledWith('テスト入力');
    });

    it('disabled状態の時入力できない', () => {
      const handleChange = vi.fn();
      render(<Input onChange={handleChange} disabled />);

      const input = screen.getByRole('textbox');
      expect(input).toBeDisabled();

      fireEvent.change(input, { target: { value: 'テスト' } });
      expect(handleChange).not.toHaveBeenCalled();
    });
  });

  describe('type props', () => {
    it('text type（デフォルト）が適用される', () => {
      render(<Input />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('type', 'text');
    });

    it('email type が適用される', () => {
      render(<Input type="email" />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('type', 'email');
    });

    it('password type が適用される', () => {
      const { container } = render(<Input type="password" />);
      const input = container.querySelector('input[type="password"]');
      expect(input).toBeInTheDocument();
      expect(input).toHaveAttribute('type', 'password');
    });

    it('date type が適用される', () => {
      render(<Input type="date" />);
      const input = screen.getByDisplayValue('') || screen.getByRole('textbox');
      expect(input).toHaveAttribute('type', 'date');
    });

    it('time type が適用される', () => {
      render(<Input type="time" />);
      const input = screen.getByDisplayValue('') || screen.getByRole('textbox');
      expect(input).toHaveAttribute('type', 'time');
    });
  });

  describe('エラー表示', () => {
    it('エラーメッセージが表示される', () => {
      render(<Input error="必須項目です" />);
      expect(screen.getByText('必須項目です')).toBeInTheDocument();
    });

    it('エラー時に適切なスタイルが適用される', () => {
      render(<Input error="エラーです" />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveClass('border-red-500');
    });

    it('エラーがない場合は通常のスタイルが適用される', () => {
      render(<Input />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveClass('border-gray-300');
      expect(input).not.toHaveClass('border-red-500');
    });
  });

  describe('スタイリング', () => {
    it('基本スタイルが適用される', () => {
      render(<Input />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveClass(
        'w-full',
        'px-3',
        'py-2',
        'border',
        'rounded-md',
        'focus:outline-none',
        'focus:ring-2'
      );
    });

    it('disabled状態で適切なスタイルが適用される', () => {
      render(<Input disabled />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveClass('opacity-50', 'cursor-not-allowed');
    });

    it('カスタムクラスが適用される', () => {
      render(<Input className="custom-class" />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveClass('custom-class');
    });
  });

  describe('アクセシビリティ', () => {
    it('適切なrole属性が設定される', () => {
      render(<Input />);
      expect(screen.getByRole('textbox')).toBeInTheDocument();
    });

    it('エラー時にaria-invalid属性が設定される', () => {
      render(<Input error="エラーです" />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('aria-invalid', 'true');
    });

    it('エラーがない場合はaria-invalid属性がfalse', () => {
      render(<Input />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('aria-invalid', 'false');
    });
  });

  describe('HTML属性の透過', () => {
    it('カスタムHTML属性が透過される', () => {
      render(<Input data-testid="custom-input" />);
      expect(screen.getByTestId('custom-input')).toBeInTheDocument();
    });

    it('id属性が設定される', () => {
      render(<Input id="test-input" />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('id', 'test-input');
    });
  });
});