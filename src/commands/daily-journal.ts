import { type App, Notice, TFile } from "obsidian";
import type { Translations } from "../i18n";
import type { SprintJournalSettings } from "../settings";
import { getDailyJournalFileName, getSprintIdentifier, getWeekDates, getWeekFolderPath } from "../utils/date";
import { ensureFolderExists } from "../utils/filesystem";

/**
 * 日次ジャーナルを作成・開く
 * @param app Obsidianアプリケーション
 * @param settings プラグイン設定
 * @param t 翻訳
 * @param date 日付
 */
export async function createDailyJournal(
  app: App,
  settings: SprintJournalSettings,
  t: Translations,
  date: Date,
): Promise<void> {
  try {
    const weekFolder = getWeekFolderPath(date);
    const folderPath = `${settings.journalRootFolder}/${weekFolder}`;

    // フォルダが存在しない場合は作成
    await ensureFolderExists(app, folderPath);

    // 週の全日付のジャーナルを作成（存在しない場合のみ）
    const weekDates = getWeekDates(date);
    const sprintId = getSprintIdentifier(date);

    for (const weekDate of weekDates) {
      const fileName = getDailyJournalFileName(weekDate);
      const filePath = `${folderPath}/${fileName}`;

      const existingFile = app.vault.getAbstractFileByPath(filePath);
      if (!existingFile) {
        const content = settings.dailyTemplate.replace(/\{\{sprint\}\}/g, sprintId);
        try {
          await app.vault.create(filePath, content);
        } catch (error) {
          console.error(`Failed to create daily journal: ${filePath}`, error);
          new Notice(`${t.notices.failedToCreateDailyJournal}: ${fileName}. ${error}`);
          return;
        }
      }
    }

    // 選択した日付のファイルを開く
    const targetFileName = getDailyJournalFileName(date);
    const targetFilePath = `${folderPath}/${targetFileName}`;
    const file = app.vault.getAbstractFileByPath(targetFilePath);

    if (file instanceof TFile) {
      const leaf = app.workspace.getLeaf(false);
      await leaf.openFile(file);
      new Notice(`${t.notices.openedDailyJournal}: ${targetFileName}`);
    } else {
      new Notice(`${t.notices.failedToOpenDailyJournal}: ${targetFileName}`);
    }
  } catch (error) {
    console.error("Error creating daily journal:", error);
    new Notice(`${t.notices.errorCreatingDailyJournal}: ${error}`);
  }
}
