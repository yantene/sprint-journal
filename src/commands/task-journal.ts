import { type App, Notice, TFile } from "obsidian";
import type { Translations } from "../i18n";
import type { SprintJournalSettings } from "../settings";
import { getSprintIdentifier, getTaskJournalFileName, getWeekFolderPath } from "../utils/date";
import { ensureFolderExists } from "../utils/filesystem";

/**
 * タスクジャーナルを作成・開く
 * @param app Obsidianアプリケーション
 * @param settings プラグイン設定
 * @param t 翻訳
 * @param date 週の日付
 * @param taskName タスク名
 */
export async function createTaskJournal(
  app: App,
  settings: SprintJournalSettings,
  t: Translations,
  date: Date,
  taskName: string,
): Promise<void> {
  try {
    const weekFolder = getWeekFolderPath(date);
    const folderPath = `${settings.journalRootFolder}/${weekFolder}`;

    // フォルダが存在しない場合は作成
    await ensureFolderExists(app, folderPath);

    // タスクジャーナルファイルを作成
    const fileName = getTaskJournalFileName(date, taskName);
    const filePath = `${folderPath}/${fileName}`;
    const sprintId = getSprintIdentifier(date);

    const existingFile = app.vault.getAbstractFileByPath(filePath);
    if (existingFile) {
      new Notice(`${t.notices.openingExistingTaskJournal}: ${fileName}`);
    } else {
      const content = settings.taskTemplate.replace(/\{\{sprint\}\}/g, sprintId);
      try {
        await app.vault.create(filePath, content);
        new Notice(`${t.notices.createdTaskJournal}: ${fileName}`);
      } catch (error) {
        console.error(`Failed to create task journal: ${filePath}`, error);
        new Notice(`${t.notices.failedToCreateTaskJournal}: ${fileName}. ${error}`);
        return;
      }
    }

    // ファイルを開く
    const file = app.vault.getAbstractFileByPath(filePath);
    if (file instanceof TFile) {
      const leaf = app.workspace.getLeaf(false);
      await leaf.openFile(file);
    } else {
      new Notice(`${t.notices.failedToOpenTaskJournal}: ${fileName}`);
    }
  } catch (error) {
    console.error("Error creating task journal:", error);
    new Notice(`${t.notices.errorCreatingTaskJournal}: ${error}`);
  }
}
