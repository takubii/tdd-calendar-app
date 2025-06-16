import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { CalendarHeader } from '@/app/components/features/calendar/CalendarHeader';

describe('CalendarHeader', () => {
  const mockProps = {
    currentDate: new Date('2024-12-25'),
    onPrevMonth: vi.fn(),
    onNextMonth: vi.fn(),
    onToday: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('基本機能', () => {
    it('現在の年月を正しく表示する', () => {
      render(<CalendarHeader {...mockProps} />);

      expect(screen.getByText('2024年12月')).toBeInTheDocument();
    });

    it('前月ボタンがクリック可能である', () => {
      render(<CalendarHeader {...mockProps} />);

      const prevButton = screen.getByLabelText('前月');
      expect(prevButton).toBeInTheDocument();
      expect(prevButton).toBeEnabled();
    });

    it('次月ボタンがクリック可能である', () => {
      render(<CalendarHeader {...mockProps} />);

      const nextButton = screen.getByLabelText('次月');
      expect(nextButton).toBeInTheDocument();
      expect(nextButton).toBeEnabled();
    });

    it('今日ボタンが表示される', () => {
      render(<CalendarHeader {...mockProps} />);

      expect(screen.getByText('今日')).toBeInTheDocument();
    });
  });

  describe('月移動機能', () => {
    it('前月ボタンクリック時にonPrevMonthが呼ばれる', () => {
      render(<CalendarHeader {...mockProps} />);

      const prevButton = screen.getByLabelText('前月');
      fireEvent.click(prevButton);

      expect(mockProps.onPrevMonth).toHaveBeenCalledTimes(1);
    });

    it('次月ボタンクリック時にonNextMonthが呼ばれる', () => {
      render(<CalendarHeader {...mockProps} />);

      const nextButton = screen.getByLabelText('次月');
      fireEvent.click(nextButton);

      expect(mockProps.onNextMonth).toHaveBeenCalledTimes(1);
    });

    it('今日ボタンクリック時にonTodayが呼ばれる', () => {
      render(<CalendarHeader {...mockProps} />);

      const todayButton = screen.getByText('今日');
      fireEvent.click(todayButton);

      expect(mockProps.onToday).toHaveBeenCalledTimes(1);
    });
  });

  describe('年月表示', () => {
    it('1月の場合「2024年1月」と表示される', () => {
      const props = {
        ...mockProps,
        currentDate: new Date('2024-01-15'),
      };
      render(<CalendarHeader {...props} />);

      expect(screen.getByText('2024年1月')).toBeInTheDocument();
    });

    it('12月の場合「2024年12月」と表示される', () => {
      const props = {
        ...mockProps,
        currentDate: new Date('2024-12-15'),
      };
      render(<CalendarHeader {...props} />);

      expect(screen.getByText('2024年12月')).toBeInTheDocument();
    });

    it('年をまたぐ場合も正しく表示される', () => {
      const props = {
        ...mockProps,
        currentDate: new Date('2025-01-15'),
      };
      render(<CalendarHeader {...props} />);

      expect(screen.getByText('2025年1月')).toBeInTheDocument();
    });
  });

    describe('アクセシビリティ', () => {
    it('前月ボタンに適切なaria-labelが設定されている', () => {
      render(<CalendarHeader {...mockProps} />);

      const prevButton = screen.getByLabelText('前月');
      expect(prevButton).toHaveAttribute('aria-label', '前月');
    });

    it('次月ボタンに適切なaria-labelが設定されている', () => {
      render(<CalendarHeader {...mockProps} />);

      const nextButton = screen.getByLabelText('次月');
      expect(nextButton).toHaveAttribute('aria-label', '次月');
    });

    it('すべてのボタンがbutton roleを持つ', () => {
      render(<CalendarHeader {...mockProps} />);

      const prevButton = screen.getByLabelText('前月');
      const nextButton = screen.getByLabelText('次月');
      const todayButton = screen.getByText('今日');

      // すべてのボタンが実際にHTMLのbuttonタグとして認識されることを確認
      expect(prevButton.tagName).toBe('BUTTON');
      expect(nextButton.tagName).toBe('BUTTON');
      expect(todayButton.tagName).toBe('BUTTON');
    });
  });

  describe('スタイリング', () => {
        it('ヘッダーコンテナに基本スタイルが適用される', () => {
      render(<CalendarHeader {...mockProps} />);

      // divに変更されたため、テキストコンテンツから要素を取得
      const header = screen.getByText('2024年12月').closest('div');
      expect(header).toHaveClass('flex', 'items-center', 'justify-between');
    });

    it('年月表示に適切なスタイルが適用される', () => {
      render(<CalendarHeader {...mockProps} />);

      const yearMonth = screen.getByText('2024年12月');
      expect(yearMonth).toHaveClass('text-xl', 'font-semibold');
    });
  });

      describe('キーボードナビゲーション', () => {
    it('ボタンがフォーカス可能である', () => {
      render(<CalendarHeader {...mockProps} />);

      const prevButton = screen.getByLabelText('前月');
      const nextButton = screen.getByLabelText('次月');
      const todayButton = screen.getByText('今日');

      // ボタンがフォーカス可能であることを確認
      expect(prevButton).not.toHaveAttribute('disabled');
      expect(nextButton).not.toHaveAttribute('disabled');
      expect(todayButton).not.toHaveAttribute('disabled');

      // tabIndexが設定されていないか、正しい値であることを確認
      expect(prevButton.tabIndex).toBeGreaterThanOrEqual(0);
      expect(nextButton.tabIndex).toBeGreaterThanOrEqual(0);
      expect(todayButton.tabIndex).toBeGreaterThanOrEqual(0);
    });

        it('ボタンがキーボードサポートを持つ', () => {
      render(<CalendarHeader {...mockProps} />);

      const prevButton = screen.getByLabelText('前月');
      const nextButton = screen.getByLabelText('次月');

      // ボタンがHTMLのbutton要素であることを確認（キーボードサポートは自動）
      expect(prevButton.tagName).toBe('BUTTON');
      expect(nextButton.tagName).toBe('BUTTON');

      // フォーカス可能であることを確認
      expect(prevButton.tabIndex).toBeGreaterThanOrEqual(0);
      expect(nextButton.tabIndex).toBeGreaterThanOrEqual(0);
    });
  });
});