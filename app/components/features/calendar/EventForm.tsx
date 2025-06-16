'use client';

import { useState, useEffect } from 'react';
import { CalendarEvent } from '@/app/types/calendar';
import { formatDate } from '@/app/lib/dateUtils';
import { Button } from '@/app/components/ui/Button';
import { Input } from '@/app/components/ui/Input';

interface EventFormData {
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  color: string;
}

interface EventFormProps {
  date: Date;
  event?: CalendarEvent;
  onSave: (eventData: Omit<CalendarEvent, 'id' | 'createdAt' | 'updatedAt'>) => void;
  onCancel: () => void;
}

export function EventForm({ date, event, onSave, onCancel }: EventFormProps) {
  const [formData, setFormData] = useState<EventFormData>({
    title: event?.title || '',
    description: event?.description || '',
    startTime: event?.startTime || '',
    endTime: event?.endTime || '',
    color: event?.color || '#3b82f6',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateTimeRange = (): boolean => {
    if (!formData.startTime || !formData.endTime) {
      return true; // 時間が空の場合はバリデーション対象外
    }
    return formData.startTime < formData.endTime;
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!validateTimeRange()) {
      newErrors.endTime = '終了時間は開始時間より後に設定してください';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    validateForm();
  }, [formData.startTime, formData.endTime]);

    const handleInputChange = (field: keyof EventFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

    const buildEventData = () => ({
    title: formData.title.trim(),
    description: formData.description.trim(),
    date,
    startTime: formData.startTime || undefined,
    endTime: formData.endTime || undefined,
    color: formData.color,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title.trim()) return;
    if (!validateForm()) return;

    onSave(buildEventData());
  };

  const isFormValid = formData.title.trim() !== '' && Object.keys(errors).length === 0;
  const canSave = event ? isFormValid : isFormValid; // 編集モードでも同じバリデーション

  return (
    <form
      onSubmit={handleSubmit}
      role="form"
      aria-label="イベント作成・編集フォーム"
      className="space-y-4"
    >
      <div className="mb-4">
        <p className="text-lg font-medium text-gray-900">
          {formatDate(date)}
        </p>
      </div>

      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
          イベントタイトル
        </label>
        <Input
          id="title"
          type="text"
          value={formData.title}
          onChange={(value) => handleInputChange('title', value)}
          placeholder="イベントタイトルを入力"
          aria-required="true"
          className="w-full"
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
          説明
        </label>
        <textarea
          id="description"
          value={formData.description}
          onChange={(e) => handleInputChange('description', e.target.value)}
          placeholder="説明を入力（任意）"
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="startTime" className="block text-sm font-medium text-gray-700 mb-1">
            開始時間
          </label>
          <Input
            id="startTime"
            type="time"
            value={formData.startTime}
            onChange={(value) => handleInputChange('startTime', value)}
            className="w-full"
          />
        </div>

        <div>
          <label htmlFor="endTime" className="block text-sm font-medium text-gray-700 mb-1">
            終了時間
          </label>
          <Input
            id="endTime"
            type="time"
            value={formData.endTime}
            onChange={(value) => handleInputChange('endTime', value)}
            aria-describedby={errors.endTime ? "endTime-error" : undefined}
            className="w-full"
          />
          {errors.endTime && (
            <p id="endTime-error" className="mt-1 text-sm text-red-600" role="alert">
              {errors.endTime}
            </p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="color" className="block text-sm font-medium text-gray-700 mb-1">
          色
        </label>
        <input
          id="color"
          type="color"
          value={formData.color}
          onChange={(e) => handleInputChange('color', e.target.value)}
          className="w-full h-10 border border-gray-300 rounded-md cursor-pointer"
        />
      </div>

      <div className="flex gap-3 pt-4">
        <Button
          type="submit"
          variant="primary"
          disabled={!canSave}
          className="flex-1"
        >
          保存
        </Button>
        <Button
          type="button"
          variant="secondary"
          onClick={onCancel}
          className="flex-1"
        >
          キャンセル
        </Button>
      </div>
    </form>
  );
}