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

### Phase 2: カレンダー表示 ⏳ **進行中**

- [x] CalendarGrid（メインカレンダー表示）✅ **完了**
- [ ] CalendarHeader（月移動ヘッダー）
- [ ] CalendarDay（日付セル）
- [ ] カレンダー状態管理

### Phase 3: イベント機能 ⏳ **予定**

- [ ] EventList（イベント一覧）
- [ ] EventForm（イベント作成・編集フォーム）
- [ ] EventItem（イベント項目）
- [ ] イベント状態管理

### Phase 4: UI/UX 向上 ⏳ **予定**

- [ ] レスポンシブ対応
- [ ] ダークモード
- [ ] アニメーション

## 🧪 現在のテスト状況

### 実装済み（✅ 全 130 テスト成功）

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
│           └── CalendarGrid.tsx ✅ 実装済み
└── types/
    └── calendar.ts       ✅ 実装済み

__tests__/
├── lib/
│   ├── dateUtils.test.ts  ✅ 実装済み
│   ├── utils.test.ts      ✅ 実装済み
│   └── storage.test.ts    ✅ 実装済み
└── components/
    ├── ui/
    │   ├── Button.test.tsx ✅ 実装済み
    │   ├── Input.test.tsx  ✅ 実装済み
    │   ├── Modal.test.tsx  ✅ 実装済み
    │   └── IconButton.test.tsx ✅ 実装済み
    └── features/
        └── calendar/
            └── CalendarGrid.test.tsx ✅ 実装済み
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

### 最優先: Phase 2 カレンダー表示 - 継続

CalendarGrid コンポーネントが完了しました！次はカレンダーヘッダーの実装に移ります。

1. **CalendarHeader コンポーネント**（月移動ヘッダー）

   ```typescript
   interface CalendarHeaderProps {
     currentDate: Date;
     onPrevMonth: () => void;
     onNextMonth: () => void;
     onToday: () => void;
   }
   ```

### TDD 開発手順（次回作業時）

1. **Red**: 失敗するテストを書く

   - `__tests__/components/features/calendar/CalendarHeader.test.tsx` を作成
   - カレンダーヘッダーの基本機能テストケース作成

2. **Green**: テストが通る最小限のコードを書く

   - `app/components/features/calendar/CalendarHeader.tsx` を実装

3. **Refactor**: コードを改善する
   - レスポンシブ対応
   - アクセシビリティ対応

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

### 技術的決定事項

- 週の開始は日曜日（`getWeekStart`）
- ローカルストレージで JSON 保存
- エラーハンドリング付きストレージ操作
- TypeScript 厳格モード使用
