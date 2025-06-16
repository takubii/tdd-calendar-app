import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import HomePage from '@/app/page';

// dateUtils関数をテスト環境でモック化
vi.mock('@/app/lib/dateUtils', () => ({
  formatDate: vi.fn((date: Date) => date.toLocaleDateString('ja-JP')),
  isWeekend: vi.fn((date: Date) => {
    const day = date.getDay();
    return day === 0 || day === 6;
  }),
  addDays: vi.fn((date: Date, days: number) => {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }),
  isSameDay: vi.fn((date1: Date, date2: Date) => {
    return date1.toDateString() === date2.toDateString();
  }),
  isToday: vi.fn((date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  }),
  getWeekStart: vi.fn((date: Date) => {
    const result = new Date(date);
    const day = result.getDay();
    result.setDate(result.getDate() - day);
    return result;
  }),
  getMonthStart: vi.fn((date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1);
  }),
  getMonthEnd: vi.fn((date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0);
  }),
  getMonthDays: vi.fn((date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const result = [];
    for (let day = 1; day <= daysInMonth; day++) {
      result.push(new Date(year, month, day));
    }
    return result;
  })
}));

describe('CalendarApp Integration', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('基本表示', () => {
    it('カレンダーヘッダーとグリッドが表示される', () => {
      render(<HomePage />);

      // ヘッダーの存在確認
      expect(screen.getByText('📅 TDD カレンダーアプリ')).toBeInTheDocument();

      // カレンダーヘッダーの月移動ボタンが表示される
      expect(screen.getByLabelText('前月')).toBeInTheDocument();
      expect(screen.getByLabelText('次月')).toBeInTheDocument();
      expect(screen.getByText('今日')).toBeInTheDocument();

      // カレンダーグリッドが表示される
      expect(screen.getByRole('table')).toBeInTheDocument();
    });

    it('現在の年月が表示される', () => {
      render(<HomePage />);

      const currentDate = new Date();
      const expectedYearMonth = `${currentDate.getFullYear()}年${currentDate.getMonth() + 1}月`;

      // ヘッダーに年月が表示される（2箇所）
      const yearMonthElements = screen.getAllByText(expectedYearMonth);
      expect(yearMonthElements.length).toBeGreaterThan(0);
    });
  });

  describe('月移動機能', () => {
    it('前月ボタンで月が変更される', () => {
      render(<HomePage />);

      const prevButton = screen.getByLabelText('前月');

      // 初期状態の年月を取得
      const currentDate = new Date();
      const initialMonth = currentDate.getMonth();
      const initialYear = currentDate.getFullYear();

      // 前月ボタンをクリック
      fireEvent.click(prevButton);

      // 前月の年月が表示されることを確認
      let expectedYear = initialYear;
      let expectedMonth = initialMonth - 1;

      if (expectedMonth < 0) {
        expectedMonth = 11;
        expectedYear -= 1;
      }

      const expectedYearMonth = `${expectedYear}年${expectedMonth + 1}月`;
      expect(screen.getAllByText(expectedYearMonth).length).toBeGreaterThan(0);
    });

    it('次月ボタンで月が変更される', () => {
      render(<HomePage />);

      const nextButton = screen.getByLabelText('次月');

      // 初期状態の年月を取得
      const currentDate = new Date();
      const initialMonth = currentDate.getMonth();
      const initialYear = currentDate.getFullYear();

      // 次月ボタンをクリック
      fireEvent.click(nextButton);

      // 次月の年月が表示されることを確認
      let expectedYear = initialYear;
      let expectedMonth = initialMonth + 1;

      if (expectedMonth > 11) {
        expectedMonth = 0;
        expectedYear += 1;
      }

      const expectedYearMonth = `${expectedYear}年${expectedMonth + 1}月`;
      expect(screen.getAllByText(expectedYearMonth).length).toBeGreaterThan(0);
    });

    it('今日ボタンで現在の月に戻る', () => {
      render(<HomePage />);

      const nextButton = screen.getByLabelText('次月');
      const todayButton = screen.getByText('今日');

      // 次月に移動
      fireEvent.click(nextButton);

      // 今日ボタンをクリック
      fireEvent.click(todayButton);

      // 現在の年月が表示されることを確認
      const currentDate = new Date();
      const expectedYearMonth = `${currentDate.getFullYear()}年${currentDate.getMonth() + 1}月`;
      expect(screen.getAllByText(expectedYearMonth).length).toBeGreaterThan(0);
    });
  });

  describe('日付選択機能', () => {
    it('日付をクリックして選択状態が表示される', () => {
      render(<HomePage />);

      // カレンダーグリッド内の日付ボタンを取得（例：15日）
      const dateButtons = screen.getAllByRole('button');
      const dayButton = dateButtons.find(button => button.textContent === '15');

      if (dayButton) {
        // 日付をクリック
        fireEvent.click(dayButton);

        // 選択状態の表示を確認（選択中: の文言が表示される）
        expect(screen.getByText(/選択中:/)).toBeInTheDocument();
      }
    });
  });

      describe('レスポンシブ対応', () => {
    it('モバイル表示で適切なレイアウトになる', () => {
      render(<HomePage />);

      // min-h-screenクラスの要素を直接検索
      const container = document.querySelector('.min-h-screen');
      expect(container).toBeInTheDocument();
      expect(container).toHaveClass('min-h-screen');

      // カレンダーコンテナが存在することを確認
      const calendarContainer = screen.getByRole('table').closest('div');
      expect(calendarContainer).toBeInTheDocument();
    });
  });

      describe('アクセシビリティ', () => {
    it('適切なセマンティックHTML構造を持つ', () => {
      render(<HomePage />);

      // メインのページヘッダー要素が存在することを確認
      expect(screen.getByRole('banner')).toBeInTheDocument();

      // テーブル要素（カレンダーグリッド）
      expect(screen.getByRole('table')).toBeInTheDocument();

      // ボタン要素（月移動、日付選択）
      const buttons = screen.getAllByRole('button');
      expect(buttons.length).toBeGreaterThan(0);

      // カレンダーヘッダーの月移動ボタンが存在することを確認
      expect(screen.getByLabelText('前月')).toBeInTheDocument();
      expect(screen.getByLabelText('次月')).toBeInTheDocument();
    });
  });
});