import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { EventForm } from '@/app/components/features/calendar/EventForm';
import { CalendarEvent } from '@/app/types/calendar';

describe('EventForm', () => {
  const mockOnSave = vi.fn();
  const mockOnCancel = vi.fn();

  const defaultProps = {
    date: new Date('2024-01-15'),
    onSave: mockOnSave,
    onCancel: mockOnCancel,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('基本機能', () => {
    it('フォームフィールドが正しく表示される', () => {
      render(<EventForm {...defaultProps} />);

      expect(screen.getByLabelText('イベントタイトル')).toBeInTheDocument();
      expect(screen.getByLabelText('説明')).toBeInTheDocument();
      expect(screen.getByLabelText('開始時間')).toBeInTheDocument();
      expect(screen.getByLabelText('終了時間')).toBeInTheDocument();
      expect(screen.getByLabelText('色')).toBeInTheDocument();
    });

    it('保存・キャンセルボタンが表示される', () => {
      render(<EventForm {...defaultProps} />);

      expect(screen.getByRole('button', { name: '保存' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'キャンセル' })).toBeInTheDocument();
    });

    it('日付が正しく表示される', () => {
      render(<EventForm {...defaultProps} />);

      expect(screen.getByText('2024/01/15')).toBeInTheDocument();
    });
  });

  describe('イベント作成', () => {
    it('新規イベントとして空のフォームが表示される', () => {
      render(<EventForm {...defaultProps} />);

      const titleInput = screen.getByLabelText('イベントタイトル') as HTMLInputElement;
      const descriptionInput = screen.getByLabelText('説明') as HTMLTextAreaElement;

      expect(titleInput.value).toBe('');
      expect(descriptionInput.value).toBe('');
    });

    it('必須フィールドが空の場合、保存ボタンが無効になる', () => {
      render(<EventForm {...defaultProps} />);

      const saveButton = screen.getByRole('button', { name: '保存' });
      expect(saveButton).toBeDisabled();
    });

    it('タイトルを入力すると保存ボタンが有効になる', async () => {
      render(<EventForm {...defaultProps} />);

      const titleInput = screen.getByLabelText('イベントタイトル');
      const saveButton = screen.getByRole('button', { name: '保存' });

      fireEvent.change(titleInput, { target: { value: 'テストイベント' } });

      await waitFor(() => {
        expect(saveButton).not.toBeDisabled();
      });
    });

    it('フォーム送信時にonSaveが呼ばれる', async () => {
      render(<EventForm {...defaultProps} />);

      const titleInput = screen.getByLabelText('イベントタイトル');
      const descriptionInput = screen.getByLabelText('説明');
      const startTimeInput = screen.getByLabelText('開始時間');
      const endTimeInput = screen.getByLabelText('終了時間');
      const colorInput = screen.getByLabelText('色');
      const saveButton = screen.getByRole('button', { name: '保存' });

      fireEvent.change(titleInput, { target: { value: 'テストイベント' } });
      fireEvent.change(descriptionInput, { target: { value: 'テスト説明' } });
      fireEvent.change(startTimeInput, { target: { value: '10:00' } });
      fireEvent.change(endTimeInput, { target: { value: '11:00' } });
      fireEvent.change(colorInput, { target: { value: '#ff0000' } });

      fireEvent.click(saveButton);

      await waitFor(() => {
        expect(mockOnSave).toHaveBeenCalledWith({
          title: 'テストイベント',
          description: 'テスト説明',
          date: new Date('2024-01-15'),
          startTime: '10:00',
          endTime: '11:00',
          color: '#ff0000',
        });
      });
    });
  });

  describe('イベント編集', () => {
    const existingEvent: CalendarEvent = {
      id: 'test-id',
      title: '既存イベント',
      description: '既存説明',
      date: new Date('2024-01-15'),
      startTime: '14:00',
      endTime: '15:00',
      color: '#0000ff',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    it('既存イベントの値でフォームが初期化される', () => {
      render(<EventForm {...defaultProps} event={existingEvent} />);

      const titleInput = screen.getByLabelText('イベントタイトル') as HTMLInputElement;
      const descriptionInput = screen.getByLabelText('説明') as HTMLTextAreaElement;
      const startTimeInput = screen.getByLabelText('開始時間') as HTMLInputElement;
      const endTimeInput = screen.getByLabelText('終了時間') as HTMLInputElement;
      const colorInput = screen.getByLabelText('色') as HTMLInputElement;

      expect(titleInput.value).toBe('既存イベント');
      expect(descriptionInput.value).toBe('既存説明');
      expect(startTimeInput.value).toBe('14:00');
      expect(endTimeInput.value).toBe('15:00');
      expect(colorInput.value).toBe('#0000ff');
    });

    it('編集モードでは保存ボタンが初期状態で有効になる', () => {
      render(<EventForm {...defaultProps} event={existingEvent} />);

      const saveButton = screen.getByRole('button', { name: '保存' });
      expect(saveButton).not.toBeDisabled();
    });
  });

  describe('バリデーション', () => {
    it('終了時間が開始時間より早い場合エラーメッセージが表示される', async () => {
      render(<EventForm {...defaultProps} />);

      const titleInput = screen.getByLabelText('イベントタイトル');
      const startTimeInput = screen.getByLabelText('開始時間');
      const endTimeInput = screen.getByLabelText('終了時間');

      fireEvent.change(titleInput, { target: { value: 'テストイベント' } });
      fireEvent.change(startTimeInput, { target: { value: '15:00' } });
      fireEvent.change(endTimeInput, { target: { value: '14:00' } });

      await waitFor(() => {
        expect(screen.getByText('終了時間は開始時間より後に設定してください')).toBeInTheDocument();
      });
    });

    it('時間エラーがある場合、保存ボタンが無効になる', async () => {
      render(<EventForm {...defaultProps} />);

      const titleInput = screen.getByLabelText('イベントタイトル');
      const startTimeInput = screen.getByLabelText('開始時間');
      const endTimeInput = screen.getByLabelText('終了時間');
      const saveButton = screen.getByRole('button', { name: '保存' });

      fireEvent.change(titleInput, { target: { value: 'テストイベント' } });
      fireEvent.change(startTimeInput, { target: { value: '15:00' } });
      fireEvent.change(endTimeInput, { target: { value: '14:00' } });

      await waitFor(() => {
        expect(saveButton).toBeDisabled();
      });
    });
  });

  describe('キャンセル機能', () => {
    it('キャンセルボタンクリック時にonCancelが呼ばれる', () => {
      render(<EventForm {...defaultProps} />);

      const cancelButton = screen.getByRole('button', { name: 'キャンセル' });
      fireEvent.click(cancelButton);

      expect(mockOnCancel).toHaveBeenCalledTimes(1);
    });
  });

  describe('アクセシビリティ', () => {
    it('フォームにaria-labelが設定されている', () => {
      render(<EventForm {...defaultProps} />);

      const form = screen.getByRole('form', { name: 'イベント作成・編集フォーム' });
      expect(form).toBeInTheDocument();
    });

    it('必須フィールドにaria-requiredが設定されている', () => {
      render(<EventForm {...defaultProps} />);

      const titleInput = screen.getByLabelText('イベントタイトル');
      expect(titleInput).toHaveAttribute('aria-required', 'true');
    });

    it('エラーメッセージがaria-describedbyで関連付けられている', async () => {
      render(<EventForm {...defaultProps} />);

      const titleInput = screen.getByLabelText('イベントタイトル');
      const startTimeInput = screen.getByLabelText('開始時間');
      const endTimeInput = screen.getByLabelText('終了時間');

      fireEvent.change(titleInput, { target: { value: 'テストイベント' } });
      fireEvent.change(startTimeInput, { target: { value: '15:00' } });
      fireEvent.change(endTimeInput, { target: { value: '14:00' } });

      await waitFor(() => {
        const errorMessage = screen.getByText('終了時間は開始時間より後に設定してください');
        expect(errorMessage).toHaveAttribute('id');
        expect(endTimeInput).toHaveAttribute('aria-describedby');
      });
    });
  });
});