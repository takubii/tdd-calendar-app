import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { CalendarGrid } from '@/app/components/features/calendar/CalendarGrid';

describe('CalendarGrid', () => {
  const mockOnDateSelect = vi.fn();

  const defaultProps = {
    currentDate: new Date('2024-12-25'),
    selectedDate: null,
    onDateSelect: mockOnDateSelect,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('基本機能', () => {
    it('カレンダーグリッドが表示される', () => {
      render(<CalendarGrid {...defaultProps} />);

      // カレンダーのテーブル要素が存在することを確認
      expect(screen.getByRole('table')).toBeInTheDocument();
      expect(screen.getByRole('table')).toHaveAttribute('aria-label', 'カレンダー');
    });

    it('曜日ヘッダーが正しく表示される', () => {
      render(<CalendarGrid {...defaultProps} />);

      // 日本語の曜日ヘッダーが表示されることを確認
      const dayHeaders = ['日', '月', '火', '水', '木', '金', '土'];
      dayHeaders.forEach((day) => {
        expect(screen.getByText(day)).toBeInTheDocument();
      });
    });

        it('指定した月の日付が表示される', () => {
      render(<CalendarGrid {...defaultProps} />);

      // 2024年12月の日付が表示されることを確認
      expect(screen.getByRole('button', { name: '2024年12月1日' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: '2024年12月25日' })).toBeInTheDocument(); // クリスマス
      expect(screen.getByRole('button', { name: '2024年12月31日' })).toBeInTheDocument(); // 大晦日
    });

        it('前月・次月の日付も表示される', () => {
      render(<CalendarGrid {...defaultProps} />);

      // 前月（11月）と次月（1月）の日付も表示されることを確認
      // 2024年12月1日は日曜日なので、前月の日付は表示されない
      // 2024年12月31日は火曜日なので、次月1月1日〜4日が表示される
      expect(screen.getByRole('button', { name: '2025年1月1日' })).toBeInTheDocument(); // 1月1日
      expect(screen.getByRole('button', { name: '2025年1月2日' })).toBeInTheDocument(); // 1月2日
      expect(screen.getByRole('button', { name: '2025年1月3日' })).toBeInTheDocument(); // 1月3日
      expect(screen.getByRole('button', { name: '2025年1月4日' })).toBeInTheDocument(); // 1月4日
    });
  });

    describe('日付選択', () => {
    it('日付をクリックすると選択される', () => {
      render(<CalendarGrid {...defaultProps} />);

      const dateButton = screen.getByRole('button', { name: '2024年12月25日' });
      fireEvent.click(dateButton);

      expect(mockOnDateSelect).toHaveBeenCalledTimes(1);
      expect(mockOnDateSelect).toHaveBeenCalledWith(new Date(2024, 11, 25, 0, 0, 0, 0));
    });

    it('選択された日付にはselected状態が適用される', () => {
      const selectedDate = new Date('2024-12-25');
      render(
        <CalendarGrid
          {...defaultProps}
          selectedDate={selectedDate}
        />
      );

      const selectedButton = screen.getByRole('button', { name: '2024年12月25日' });
      expect(selectedButton).toHaveAttribute('aria-selected', 'true');
      expect(selectedButton).toHaveClass('bg-blue-600', 'text-white');
    });

    it('今日の日付には特別なスタイルが適用される', () => {
      // 今日を2024年12月25日に設定
      vi.setSystemTime(new Date('2024-12-25'));

      render(<CalendarGrid {...defaultProps} />);

      const todayButton = screen.getByRole('button', { name: '2024年12月25日' });
      expect(todayButton).toHaveClass('ring-2', 'ring-blue-500');

      vi.useRealTimers();
    });
  });

    describe('アクセシビリティ', () => {
    it('適切なARIA属性が設定される', () => {
      render(<CalendarGrid {...defaultProps} />);

      const table = screen.getByRole('table');
      expect(table).toHaveAttribute('aria-label', 'カレンダー');

      // 各日付ボタンにaria-label属性が設定されることを確認
      const dateButton = screen.getByRole('button', { name: '2024年12月25日' });
      expect(dateButton).toHaveAttribute('aria-label', '2024年12月25日');
    });

    it('キーボードナビゲーションが可能', () => {
      render(<CalendarGrid {...defaultProps} />);

      const dateButton = screen.getByRole('button', { name: '2024年12月25日' });
      expect(dateButton).toHaveAttribute('tabIndex', '0');

      // フォーカス移動のテスト
      dateButton.focus();
      expect(dateButton).toHaveFocus();
    });
  });

    describe('スタイリング', () => {
        it('週末の日付には特別なスタイルが適用される', () => {
      render(<CalendarGrid {...defaultProps} />);

      // 2024年12月1日は日曜日、12月7日は土曜日
      const sundayButton = screen.getByRole('button', { name: '2024年12月1日' });
      const saturdayButton = screen.getByRole('button', { name: '2024年12月7日' });

      // 日曜日は赤色、土曜日は青色
      expect(sundayButton).toHaveClass('text-red-500');
      expect(saturdayButton).toHaveClass('text-blue-500');
    });

    it('他の月の日付には薄いスタイルが適用される', () => {
      render(<CalendarGrid {...defaultProps} />);

      // 次月の日付（2025年1月1日）
      const nextMonthButton = screen.getByRole('button', { name: '2025年1月1日' });
      expect(nextMonthButton).toHaveClass('text-gray-400');
    });
  });
});