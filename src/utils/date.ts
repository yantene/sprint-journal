/**
 * ISO 8601週番号を計算する
 * @param date 日付
 * @returns ISO週番号 (1-53)
 */
export function getISOWeek(date: Date): number {
  const target = new Date(date.valueOf());
  const dayNr = (date.getDay() + 6) % 7;
  target.setDate(target.getDate() - dayNr + 3);
  const firstThursday = target.valueOf();
  target.setMonth(0, 1);
  if (target.getDay() !== 4) {
    target.setMonth(0, 1 + ((4 - target.getDay() + 7) % 7));
  }
  return 1 + Math.ceil((firstThursday - target.valueOf()) / 604800000);
}

/**
 * ISO 8601週年を計算する（週番号に対応する年）
 * @param date 日付
 * @returns ISO週年
 */
export function getISOWeekYear(date: Date): number {
  const target = new Date(date.valueOf());
  const dayNr = (date.getDay() + 6) % 7;
  target.setDate(target.getDate() - dayNr + 3);
  return target.getFullYear();
}

/**
 * 日付からフォルダパスを生成 (例: "2025/W45")
 * @param date 日付
 * @returns フォルダパス
 */
export function getWeekFolderPath(date: Date): string {
  const year = getISOWeekYear(date);
  const week = getISOWeek(date);
  return `${year}/W${week.toString().padStart(2, "0")}`;
}

/**
 * 日付から日次ジャーナルのファイル名を生成 (例: "2025-11-07.md")
 * @param date 日付
 * @returns ファイル名
 */
export function getDailyJournalFileName(date: Date): string {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}.md`;
}

/**
 * タスク名からタスクジャーナルのファイル名を生成 (例: "2025-W45_implement-feature-x.md")
 * @param date 日付
 * @param taskName タスク名
 * @returns ファイル名
 */
export function getTaskJournalFileName(date: Date, taskName: string): string {
  const year = getISOWeekYear(date);
  const week = getISOWeek(date);
  // ファイル名に使えない文字を削除し、スペースをハイフンに変換
  const sanitized = taskName
    .toLowerCase()
    .replace(/[/\\:*?"<>|]/g, "") // 禁止文字を削除
    .replace(/\s+/g, "-") // スペースをハイフンに
    .replace(/-+/g, "-") // 連続ハイフンを1つに
    .replace(/^-+|-+$/g, ""); // 先頭・末尾のハイフンを削除
  return `${year}-W${week.toString().padStart(2, "0")}_${sanitized}.md`;
}

/**
 * 指定した週の開始日（月曜日）を取得
 * @param date 週内の任意の日付
 * @returns 週の開始日
 */
export function getWeekStart(date: Date): Date {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1); // 月曜日を週の開始とする
  return new Date(d.setDate(diff));
}

/**
 * 指定した週の全日付を取得（月曜日〜日曜日）
 * @param date 週内の任意の日付
 * @returns 7日分の日付の配列
 */
export function getWeekDates(date: Date): Date[] {
  const start = getWeekStart(date);
  const dates: Date[] = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    dates.push(d);
  }
  return dates;
}

/**
 * スプリント識別子を生成 (例: "2025-W45")
 * @param date 日付
 * @returns スプリント識別子
 */
export function getSprintIdentifier(date: Date): string {
  const year = getISOWeekYear(date);
  const week = getISOWeek(date);
  return `${year}-W${week.toString().padStart(2, "0")}`;
}
