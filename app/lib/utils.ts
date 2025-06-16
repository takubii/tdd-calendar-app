// TailwindCSSクラス結合ユーティリティ
export function cn(...inputs: (string | undefined | boolean | Record<string, boolean>)[]): string {
  return inputs
    .map(input => {
      if (typeof input === 'string') return input;
      if (typeof input === 'object' && input !== null) {
        return Object.entries(input)
          .filter(([, condition]) => Boolean(condition))
          .map(([className]) => className)
          .join(' ');
      }
      return '';
    })
    .filter(Boolean)
    .join(' ')
    .replace(/\s+/g, ' ')
    .trim();
}