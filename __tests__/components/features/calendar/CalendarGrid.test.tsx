import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { CalendarGrid } from '@/app/components/features/calendar/CalendarGrid';

describe('CalendarGrid', () => {
  it('カレンダーグリッドを正しく表示する', () => {
    render(<CalendarGrid year={2024} month={11} />); // 2024年12月

    // ヘッダー行の曜日が表示されること
    expect(screen.getByText('日')).toBeInTheDocument();
    expect(screen.getByText('月')).toBeInTheDocument();
    expect(screen.getByText('火')).toBeInTheDocument();
    expect(screen.getByText('水')).toBeInTheDocument();
    expect(screen.getByText('木')).toBeInTheDocument();
    expect(screen.getByText('金')).toBeInTheDocument();
    expect(screen.getByText('土')).toBeInTheDocument();
  });

  it('指定した年月の日付が表示される', () => {
    render(<CalendarGrid year={2024} month={11} />); // 2024年12月

    // 12月の日付が表示されること
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('25')).toBeInTheDocument();
    expect(screen.getByText('31')).toBeInTheDocument();
  });

  it('今日の日付にtoday styleが適用される', () => {
    const today = new Date();
    render(<CalendarGrid year={today.getFullYear()} month={today.getMonth()} />);

    const todayButton = screen.getByText(today.getDate().toString());
    expect(todayButton).toHaveClass('bg-blue-500');
  });

  it('現在の月以外の日付にはnon-current-month styleが適用される', () => {
    render(<CalendarGrid year={2024} month={11} />); // 2024年12月

    // 前月の日付（薄い色で表示）
    const nonCurrentMonthDays = screen.getAllByText(/^(2[4-9]|30)$/); // 11月の日付
    if (nonCurrentMonthDays.length > 0) {
      expect(nonCurrentMonthDays[0]).toHaveClass('text-gray-400');
    }
  });

  it('日付をクリックすると選択される', () => {
    render(<CalendarGrid year={2024} month={11} />);

    const dayButton = screen.getByText('15');
    dayButton.click();

    expect(dayButton).toHaveClass('bg-blue-100');
  });

  it('週末の日付には特別なスタイルが適用される', () => {
    render(<CalendarGrid year={2024} month={11} />); // 2024年12月

    // 2024年12月1日は日曜日
    const sunday = screen.getByText('1');
    expect(sunday).toHaveClass('text-red-500');
  });

  it('正しいaria-labelが設定される', () => {
    render(<CalendarGrid year={2024} month={11} />);

    const grid = screen.getByRole('grid');
    expect(grid).toHaveAttribute('aria-label', '2024年12月のカレンダー');
  });

  it('各日付セルにはbutton roleが設定される', () => {
    render(<CalendarGrid year={2024} month={11} />);

    const dayButtons = screen.getAllByRole('button');
    expect(dayButtons.length).toBeGreaterThan(0);

    // 最初の日付ボタンにaria-labelが設定されていること
    expect(dayButtons[0]).toHaveAttribute('aria-label');
  });
});