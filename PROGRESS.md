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

### Phase 3: イベント機能 ✅ **完了**

- [x] EventList（イベント一覧）✅ **完了**
- [x] EventForm（イベント作成・編集フォーム）✅ **完了**
- [x] EventItem（イベント項目）✅ **完了**
- [x] イベント状態管理（useEvents フック）✅ **完了**
- [x] 画面統合・動作確認 ✅ **完了**

### Phase 4: UI/UX 向上 🎯 **準備完了**

- [ ] レスポンシブ対応
- [ ] ダークモード
- [ ] アニメーション・トランジション
- [ ] アクセシビリティ向上
- [ ] 画面統合・動作確認

## 🧪 現在のテスト状況

### 実装済み（✅ 全 253 テスト成功）

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

#### `__tests__/components/features/calendar/EventList.test.tsx`

- 基本機能: イベント一覧表示、空状態での「イベントがありません」表示
- イベント情報表示: タイトル、時間（開始-終了）、説明文表示
- イベントクリック: onEventClick ハンドラー実行
- 編集・削除機能: onEventEdit、onEventDelete ハンドラー対応、ボタン表示制御
- スタイリング: イベント色の境界線適用、アイコンボタンの適切な配置
- 条件付き表示: 時間なしイベント対応、説明なしイベント対応
- アクセシビリティ: 編集・削除ボタンの aria-label 設定

#### `__tests__/components/features/calendar/EventForm.test.tsx`

- 基本機能: フォームフィールド表示（タイトル・説明・時間・色）、保存・キャンセルボタン表示、日付表示
- イベント作成: 空フォーム初期化、必須フィールドバリデーション、タイトル入力時保存ボタン有効化、フォーム送信時 onSave 実行
- イベント編集: 既存イベント値での初期化、編集モードでの保存ボタン有効化
- バリデーション: 終了時間 < 開始時間エラー表示、バリデーションエラー時保存ボタン無効化
- キャンセル機能: キャンセルボタンクリック時 onCancel 実行
- アクセシビリティ: フォーム aria-label、必須フィールド aria-required、エラーメッセージ aria-describedby 関連付け

#### `__tests__/components/features/calendar/EventItem.test.tsx`

- 基本機能: イベントタイトル・時間・説明表示、イベントクリック処理、イベント色境界線適用
- 条件付き表示: 時間なし・説明なし・開始時間のみの各パターン対応
- 編集・削除機能: 編集・削除ボタン表示制御、各ハンドラー実行、ボタン非表示制御
- スタイリング: 基本スタイルクラス適用、ホバー時の遷移エフェクト
- アクセシビリティ: メインボタンの適切な aria-label、編集・削除ボタンの aria-label 設定

#### `__tests__/hooks/useEvents.test.ts`

- 初期化: 空配列初期状態、ローカルストレージからのデータ読み込み
- イベント追加: 新規イベント追加、自動 ID・タイムスタンプ生成、ローカルストレージ保存
- イベント更新: 既存イベント更新、存在しない ID 処理、更新時間自動設定、ローカルストレージ保存
- イベント削除: 指定 ID 削除、存在しない ID 処理、ローカルストレージ保存
- 日付絞り込み: 指定日付のイベント取得、存在しない日付の空配列返却、同日複数イベント対応
- 全削除: 全イベント削除、ローカルストレージからの削除

#### `__tests__/integration/MainPage.test.tsx` ✅ **新規追加**

- カレンダー・イベント統合: カレンダー表示とイベント機能の完全統合テスト
- 日付選択・イベント表示: 選択日付のイベント一覧表示、空状態対応
- イベント追加機能: フォーム表示、データ入力、保存処理、表示更新の統合テスト
- イベント編集・削除: 既存イベントの編集・削除機能の統合動作確認
- 月移動・データ連携: 月移動時のイベントデータ保持・表示更新の確認

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
│           ├── CalendarDay.tsx ✅ 実装済み
│           ├── EventList.tsx ✅ 実装済み
│           ├── EventForm.tsx ✅ 実装済み
│           └── EventItem.tsx ✅ 実装済み
├── hooks/
│   ├── useCalendar.ts    ✅ 実装済み
│   └── useEvents.ts      ✅ 実装済み
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
│           ├── CalendarDay.test.tsx ✅ 実装済み
│           ├── EventList.test.tsx ✅ 実装済み
│           ├── EventForm.test.tsx ✅ 実装済み
│           └── EventItem.test.tsx ✅ 実装済み
├── hooks/
│   ├── useCalendar.test.ts ✅ 実装済み
│   └── useEvents.test.ts ✅ 実装済み
└── integration/
    └── MainPage.test.tsx ✅ 実装済み
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

### ✅ Phase 1: 基盤構築 - 完了！

TDD 環境構築、ユーティリティ関数、UI コンポーネント（Button、Input、Modal、IconButton）の実装が完了しました！

### ✅ Phase 2: カレンダー表示 - 完了！

CalendarGrid、CalendarHeader、CalendarDay コンポーネント、および useCalendar フックの実装が完了しました！

### ✅ Phase 3: イベント機能 - 完了！ 🎉

Phase 3 のすべてのコンポーネント・フック・統合テストの TDD サイクル（Red → Green → Refactor）が完了しました！

**完了した機能:**

- **EventList**: イベント一覧表示、EventItem コンポーネントを使用するようにリファクタリング済み
- **EventForm**: イベント作成・編集フォーム（タイトル・説明・時間・色）、バリデーション機能
- **EventItem**: 個別イベント項目表示、編集・削除ボタン、条件付き表示対応
- **useEvents**: イベント状態管理フック、CRUD 操作、ローカルストレージ連携、日付絞り込み
- **画面統合**: メインページでのカレンダー・イベント機能完全統合
- **統合テスト**: MainPage 統合テスト（5 項目）の実装・成功
- **動作確認**: ブラウザでの実際の動作確認完了
- すべてのコンポーネントでアクセシビリティ対応（aria-label、aria-required、aria-describedby）
- TypeScript 型安全性、包括的テストカバレッジ（253 テスト成功）

### 🎯 次のフェーズ: Phase 4 - UI/UX 向上

準備完了！次の開発対象：

1. **レスポンシブ対応**: モバイル・タブレット対応の改善
2. **ダークモード**: ライトモード・ダークモードの切り替え機能
3. **アニメーション・トランジション**: スムーズな画面遷移とフィードバック
4. **アクセシビリティ向上**: さらなる WCAG 準拠とユーザビリティ改善
5. **動作確認**: 各機能のブラウザでの動作確認

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

**イベントコンポーネント:**

- **EventList**: イベント一覧表示、EventItem コンポーネント活用、空状態対応
- **EventForm**: イベント作成・編集フォーム、バリデーション、アクセシビリティ対応
- **EventItem**: 個別イベント項目表示、編集・削除ボタン、条件付き表示、イベント色適用

**カスタムフック:**

- **useCalendar**: カレンダー状態管理、日付選択、月移動、表示モード切り替え
- **useEvents**: イベント状態管理、CRUD 操作、ローカルストレージ連携、日付絞り込み機能

**画面統合:**

- **Phase 2 完了**: useCalendar フック統合による状態管理の一元化
- **Phase 3 完了**: useEvents フック統合によるイベント機能完全統合
- **統合テスト**: MainPage 統合テスト（253 テスト中 5 テスト）実装・成功
- **実動確認**: localhost:3000 でカレンダー・イベント機能が完全に動作可能

### 技術的決定事項

- 週の開始は日曜日（`getWeekStart`）
- ローカルストレージで JSON 保存
- エラーハンドリング付きストレージ操作
- TypeScript 厳格モード使用
