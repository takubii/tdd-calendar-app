# TDD カレンダーアプリ開発進捗

## 📋 プロジェクト概要

### 技術スタック

- **フレームワーク**: Next.js 15 (App Router)
- **言語**: TypeScript
- **ライブラリ**: React 19
- **テストフレームワーク**: Vitest
- **テストライブラリ**: @testing-library/react, @testing-library/dom
- **スタイリング**: TailwindCSS 4
- **パッケージマネージャー**: pnpm

### アプリケーション仕様

- 日本のユーザー向けカレンダーアプリ
- 月間ビューを基本とした表示
- イベントの追加・編集・削除機能
- レスポンシブデザイン対応
- ローカルストレージでのデータ永続化

## 🎯 開発フェーズ

### Phase 1: 基盤構築 ✅ **完了**

#### 1.1 ユーティリティ関数の実装 ✅ **完了**

- [x] 日付操作関数（`app/lib/dateUtils.ts`）
- [x] 汎用ユーティリティ関数（`app/lib/utils.ts`）
- [x] ローカルストレージ操作（`app/lib/storage.ts`）
- [x] 対応するテストファイル

#### 1.2 基本 UI コンポーネント ✅ **完了**

- [x] Button コンポーネント ✅ **完了**
- [x] Input コンポーネント ✅ **完了**
- [x] Modal コンポーネント ✅ **完了**
- [x] IconButton コンポーネント ✅ **完了**

### Phase 2: カレンダー表示 ✅ **完了**

- [x] CalendarGrid（メインカレンダー表示）✅ **完了**
- [x] CalendarHeader（月移動ヘッダー）✅ **完了**
- [x] CalendarDay（日付セル）✅ **完了**
- [x] カレンダー状態管理（useCalendar フック）✅ **完了**
- [x] 画面統合・動作確認 ✅ **完了**

### Phase 3: イベント機能 ⏳ **予定**

- [ ] EventList（イベント一覧）
- [ ] EventForm（イベント作成・編集フォーム）
- [ ] EventItem（イベント項目）
- [ ] イベント状態管理
- [ ] 画面統合・動作確認

### Phase 4: UI/UX 向上 ⏳ **予定**

- [ ] レスポンシブ対応
- [ ] ダークモード
- [ ] アニメーション
- [ ] 画面統合・動作確認

## 🧪 現在のテスト状況

### 実装済み（✅ 全 191 テスト成功）

#### `__tests__/lib/dateUtils.test.ts`

- formatDate: 日本語形式フォーマット
- isWeekend: 週末判定
- addDays: 日付加算（イミュータブル）
- isSameDay: 同日判定
- isToday: 今日判定
- getWeekStart: 週開始日取得
- getMonthStart/End: 月開始・終了日取得
- getMonthDays: 月内全日付取得

#### `__tests__/lib/utils.test.ts`

- cn: CSS クラス名結合
- generateId: ランダム ID 生成
- clamp: 値の範囲制限
- debounce: 関数呼び出し遅延

#### `__tests__/lib/storage.test.ts`

- saveToStorage: データ保存
- loadFromStorage: データ読み込み（デフォルト値対応）
- removeFromStorage: データ削除
- clearStorage: 全データ削除

#### `__tests__/components/ui/Button.test.tsx`

- 基本機能: 子要素表示、クリックハンドラー、disabled 状態
- loading 状態: 読み込み中表示、ボタン無効化
- variant props: primary、secondary、danger（デフォルト値対応）
- size props: sm、md、lg（デフォルト値対応）
- アクセシビリティ: role、focus-ring、outline-none
- カスタムクラス: カスタムクラス適用、基本クラスとの併用
- HTML 属性: type 属性、その他属性の透過

#### `__tests__/components/ui/Input.test.tsx`

- 基本機能: プレースホルダー表示、初期値表示、onChange ハンドラー、disabled 状態
- type props: text（デフォルト）、email、password、date、time
- エラー表示: エラーメッセージ表示、エラー時スタイル、通常スタイル
- スタイリング: 基本スタイル、disabled スタイル、カスタムクラス対応
- アクセシビリティ: role 属性、aria-invalid 属性
- HTML 属性: カスタム属性透過、id 属性設定

#### `__tests__/components/ui/Modal.test.tsx`

- 基本機能: isOpen 制御（表示・非表示）、title 表示、children 表示
- 閉じる機能: オーバーレイクリック、閉じるボタン、Escape キー対応
- アクセシビリティ: dialog role、aria-modal 属性、aria-labelledby 属性、フォーカス管理
- スタイリング: 基本スタイル、タイトル付きモーダルスタイル
- イベント処理: 内部クリック無効化、イベントリスナー適切な削除

#### `__tests__/components/ui/IconButton.test.tsx`

- 基本機能: アイコン表示、aria-label 必須、クリックハンドラー、disabled 状態
- loading 状態: スピナー表示、ボタン無効化
- variant props: primary、secondary、danger、ghost（デフォルト値対応）
- size props: sm、md、lg（デフォルト値対応）
- アクセシビリティ: role、focus-ring、outline-none、aria-label 必須
- スタイリング: 基本スタイル、カスタムクラス対応
- HTML 属性: type 属性、その他属性の透過

#### `__tests__/components/features/calendar/CalendarGrid.test.tsx`

- 基本機能: カレンダーグリッド表示、曜日ヘッダー、当月・前月・次月日付表示
- 日付選択: クリック選択、選択状態表示、今日の日付強調表示
- アクセシビリティ: table role、aria-label、ボタンのキーボードナビゲーション
- スタイリング: 週末色分け（日曜日=赤、土曜日=青）、他月日付の薄表示

#### `__tests__/components/features/calendar/CalendarHeader.test.tsx`

- 基本機能: 年月表示、前月・次月・今日ボタンの表示・動作
- 月移動機能: onPrevMonth、onNextMonth、onToday コールバック実行
- 年月表示: 日本語形式（2024 年 1 月〜12 月）、年またぎ対応
- アクセシビリティ: aria-label 設定、HTML ボタンタグ認識
- スタイリング: ヘッダーコンテナレイアウト、年月テキストスタイル
- キーボードナビゲーション: フォーカス可能性、標準キーボードサポート

#### `__tests__/components/features/calendar/CalendarDay.test.tsx`

- 基本機能: 日付表示、クリック選択、ボタンアクセシビリティ
- 状態表示: 今日・選択・週末・他月の視覚的表現
- 優先順位: 選択状態 > 今日 > 週末の適切なスタイル適用
- イベント表示: イベント数バッジ表示、イベント存在/非存在での表示切替
- イベント追加: ダブルクリックでのイベント追加機能
- アクセシビリティ: aria-label（今日・選択中・イベント数情報含む）

#### `__tests__/hooks/useCalendar.test.ts`

- 初期化: 初期日付・選択状態・表示モード設定
- 日付選択: 選択・選択解除・同一日付再選択での選択解除
- 月移動: 前月・次月・今日・特定日付への移動
- 年跨ぎ: 1 月 ←→12 月の年跨ぎ移動対応
- 表示モード: month/week の切り替え
- ヘルパー関数: 月内日付取得、選択日付の今日判定

## 📁 現在のファイル構造

```
app/
├── lib/
│   ├── dateUtils.ts      ✅ 実装済み
│   ├── utils.ts          ✅ 実装済み
│   └── storage.ts        ✅ 実装済み
├── components/
│   ├── ui/
│   │   ├── Button.tsx    ✅ 実装済み
│   │   ├── Input.tsx     ✅ 実装済み
│   │   ├── Modal.tsx     ✅ 実装済み
│   │   └── IconButton.tsx ✅ 実装済み
│   └── features/
│       └── calendar/
│           ├── CalendarGrid.tsx ✅ 実装済み
│           ├── CalendarHeader.tsx ✅ 実装済み
│           └── CalendarDay.tsx ✅ 実装済み
├── hooks/
│   └── useCalendar.ts    ✅ 実装済み
└── types/
    └── calendar.ts       ✅ 実装済み

__tests__/
├── lib/
│   ├── dateUtils.test.ts  ✅ 実装済み
│   ├── utils.test.ts      ✅ 実装済み
│   └── storage.test.ts    ✅ 実装済み
    ├── components/
    │   ├── ui/
    │   │   ├── Button.test.tsx ✅ 実装済み
    │   │   ├── Input.test.tsx  ✅ 実装済み
    │   │   ├── Modal.test.tsx  ✅ 実装済み
    │   │   └── IconButton.test.tsx ✅ 実装済み
    │   └── features/
    │       └── calendar/
    │           ├── CalendarGrid.test.tsx ✅ 実装済み
    │           ├── CalendarHeader.test.tsx ✅ 実装済み
    │           └── CalendarDay.test.tsx ✅ 実装済み
    └── hooks/
        └── useCalendar.test.ts ✅ 実装済み
```

## 🎨 設計済み型定義（未実装）

### カレンダー関連

```typescript
// types/calendar.ts（予定）
export interface CalendarDate {
  year: number;
  month: number;
  day: number;
  isCurrentMonth: boolean;
  isToday: boolean;
  isWeekend: boolean;
}

export interface CalendarState {
  currentDate: Date;
  selectedDate: Date | null;
  viewMode: "month" | "week";
}
```

### イベント関連

```typescript
// types/event.ts（予定）
export interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  date: Date;
  startTime?: string;
  endTime?: string;
  color: string;
  createdAt: Date;
  updatedAt: Date;
}
```

## 🚀 次にやること

### ✅ Phase 2 カレンダー表示 - 完了！

CalendarGrid、CalendarHeader、CalendarDay コンポーネント、および useCalendar フックの実装が完了しました！

### 最優先: Phase 3 イベント機能 - 開始準備

Phase 2 が完了したので、次は Phase 3 のイベント機能に移ります。

1. **EventList コンポーネント**（イベント一覧表示）
2. **EventForm コンポーネント**（イベント作成・編集フォーム）
3. **EventItem コンポーネント**（個別イベント項目）
4. **イベント状態管理**（useEvents フック）

### TDD 開発手順（次回作業時）

Phase 3 の最初のコンポーネントから TDD で開発を開始：

1. **Red**: EventList コンポーネントの失敗するテストを書く
2. **Green**: テストが通る最小限のコードを書く
3. **Refactor**: コードを改善する
4. **UI 統合**: 各コンポーネント完成後に画面に反映して動作確認

### テスト実行コマンド

```bash
# 全テスト実行
pnpm test

# 監視モード
pnpm test --watch

# 特定ファイル
pnpm test Button.test.tsx
```

## 📝 開発メモ

### 実装済み主要関数・コンポーネント

**ユーティリティ関数:**

- **formatDate**: 日本語形式（YYYY/MM/DD）でフォーマット
- **isWeekend**: 土日判定（日曜日=0, 土曜日=6）
- **addDays**: イミュータブル日付加算
- **generateId**: 英数字ランダム ID 生成
- **cn**: TailwindCSS 向けクラス名結合
- **debounce**: 関数呼び出し遅延制御

**UI コンポーネント:**

- **Button**: バリアント対応（primary/secondary/danger）、サイズ対応、loading 状態
- **Input**: 型対応（text/email/password/date/time）、エラー表示、アクセシビリティ
- **Modal**: ダイアログ表示、Escape/オーバーレイクリック対応、フォーカス管理、アリア属性
- **IconButton**: アイコンボタン、バリアント・サイズ対応、loading 状態

**カレンダーコンポーネント:**

- **CalendarGrid**: 月間カレンダー表示、日付選択、曜日ヘッダー、アクセシビリティ対応
- **CalendarHeader**: 年月表示、月移動ナビゲーション、今日ボタン
- **CalendarDay**: 日付セル、選択状態・今日・週末の視覚表現、イベント数表示

**カスタムフック:**

- **useCalendar**: カレンダー状態管理、日付選択、月移動、表示モード切り替え

**画面統合:**

- **Phase 2 完了**: useCalendar フック統合による状態管理の一元化
- **実動確認**: localhost:3000 でカレンダーが完全に動作可能

### 技術的決定事項

- 週の開始は日曜日（`getWeekStart`）
- ローカルストレージで JSON 保存
- エラーハンドリング付きストレージ操作
- TypeScript 厳格モード使用
