import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import MainPage from '@/app/page';
import { loadFromStorage, saveToStorage } from '@/app/lib/storage';

// ストレージのモック
vi.mock('@/app/lib/storage', () => ({
  loadFromStorage: vi.fn(),
  saveToStorage: vi.fn(),
  removeFromStorage: vi.fn(),
}));

const mockLoadFromStorage = vi.mocked(loadFromStorage);
const mockSaveToStorage = vi.mocked(saveToStorage);

describe('MainPage統合テスト', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // デフォルトでは空のイベントリストを返す
    mockLoadFromStorage.mockReturnValue([]);
  });

  it('カレンダーとイベント機能が統合されて表示される', () => {
    render(<MainPage />);

    // ページタイトルが表示される
    expect(screen.getByText('📅 TDD カレンダーアプリ')).toBeInTheDocument();

    // カレンダーヘッダーが表示される
    expect(screen.getByLabelText('前月')).toBeInTheDocument();
    expect(screen.getByLabelText('次月')).toBeInTheDocument();
    expect(screen.getByText('今日')).toBeInTheDocument();

    // カレンダーグリッドが表示される
    expect(screen.getByRole('table', { name: 'カレンダー' })).toBeInTheDocument();

    // イベント関連要素が表示される
    expect(screen.getByText('選択された日のイベント')).toBeInTheDocument();
    expect(screen.getByText('イベントがありません')).toBeInTheDocument();
  });

  it('日付を選択するとその日のイベントが表示される', async () => {
    // テスト用のイベントデータ
    const testEvents = [
      {
        id: '1',
        title: 'テストイベント1',
        description: 'テスト説明1',
        date: new Date(2025, 5, 15), // 2025年6月15日（0ベースなので5が6月）
        startTime: '10:00',
        endTime: '11:00',
        color: '#3b82f6',
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-01-01')
      }
    ];

    mockLoadFromStorage.mockReturnValue(testEvents);

    render(<MainPage />);

    // 6月15日をクリック
    const day15Button = screen.getByRole('button', { name: /15/ });
    fireEvent.click(day15Button);

    // イベントが表示されることを確認
    await waitFor(() => {
      expect(screen.getByText('テストイベント1')).toBeInTheDocument();
      expect(screen.getByText('10:00 - 11:00')).toBeInTheDocument();
    });
  });

  it('イベント追加フォームが正しく動作する', async () => {
    render(<MainPage />);

    // 日付を選択
    const day15Button = screen.getByRole('button', { name: /15/ });
    fireEvent.click(day15Button);

    // イベント追加ボタンをクリック
    const addEventButton = screen.getByRole('button', { name: 'イベントを追加' });
    fireEvent.click(addEventButton);

    // フォームが表示される
    expect(screen.getByRole('dialog', { name: 'イベントを追加' })).toBeInTheDocument();

    // フォームに入力（実際のラベルに合わせる）
    const titleInput = screen.getByLabelText('イベントタイトル');
    fireEvent.change(titleInput, { target: { value: '新しいイベント' } });

    const descriptionInput = screen.getByLabelText('説明');
    fireEvent.change(descriptionInput, { target: { value: 'イベントの説明' } });

    // 保存ボタンをクリック
    const saveButton = screen.getByRole('button', { name: '保存' });
    fireEvent.click(saveButton);

    // フォームが閉じられる
    await waitFor(() => {
      expect(screen.queryByRole('dialog', { name: 'イベントを追加' })).not.toBeInTheDocument();
    });

    // ストレージに保存されることを確認
    expect(mockSaveToStorage).toHaveBeenCalled();
  });

  it('イベントの編集と削除が正しく動作する', async () => {
    // テスト用のイベントデータ
    const testEvents = [
      {
        id: '1',
        title: 'テストイベント1',
        description: 'テスト説明1',
        date: new Date(2025, 5, 15), // 2025年6月15日
        startTime: '10:00',
        endTime: '11:00',
        color: '#3b82f6',
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-01-01')
      }
    ];

    mockLoadFromStorage.mockReturnValue(testEvents);

    render(<MainPage />);

    // 6月15日を選択
    const day15Button = screen.getByRole('button', { name: /15/ });
    fireEvent.click(day15Button);

    // イベントが表示される
    await waitFor(() => {
      expect(screen.getByText('テストイベント1')).toBeInTheDocument();
    });

    // 編集ボタンをクリック
    const editButton = screen.getByLabelText('イベントを編集');
    fireEvent.click(editButton);

    // 編集フォームが表示される
    expect(screen.getByRole('dialog', { name: 'イベントを編集' })).toBeInTheDocument();

    // タイトルを変更
    const titleInput = screen.getByDisplayValue('テストイベント1');
    fireEvent.change(titleInput, { target: { value: '編集済みイベント' } });

    // 保存ボタンをクリック
    const saveButton = screen.getByRole('button', { name: '保存' });
    fireEvent.click(saveButton);

    // 編集が反映される
    await waitFor(() => {
      expect(screen.queryByRole('dialog', { name: 'イベントを編集' })).not.toBeInTheDocument();
    });

    expect(mockSaveToStorage).toHaveBeenCalled();
  });

  it('月移動時にイベントが正しく表示される', async () => {
    // 異なる月のイベントデータ
    const testEvents = [
      {
        id: '1',
        title: '6月のイベント',
        date: new Date(2025, 5, 15), // 2025年6月15日
        color: '#3b82f6',
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-01-01')
      },
      {
        id: '2',
        title: '7月のイベント',
        date: new Date(2025, 6, 15), // 2025年7月15日
        color: '#ef4444',
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-01-01')
      }
    ];

    mockLoadFromStorage.mockReturnValue(testEvents);

    render(<MainPage />);

    // 次月ボタンをクリック（7月に移動）
    const nextMonthButton = screen.getByLabelText('次月');
    fireEvent.click(nextMonthButton);

    // 7月15日を選択
    await waitFor(() => {
      const day15Button = screen.getByRole('button', { name: /15/ });
      fireEvent.click(day15Button);
    });

    // 7月のイベントが表示される
    await waitFor(() => {
      expect(screen.getByText('7月のイベント')).toBeInTheDocument();
    });
  });
});