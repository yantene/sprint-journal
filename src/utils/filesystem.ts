import { type App, TFolder } from "obsidian";

/**
 * フォルダが存在することを確認し、なければ作成する
 * @param app Obsidianアプリケーション
 * @param folderPath フォルダパス
 * @throws {Error} パスがフォルダではない場合、または作成に失敗した場合
 */
export async function ensureFolderExists(app: App, folderPath: string): Promise<void> {
  const parts = folderPath.split("/").filter((part) => part.length > 0);
  let currentPath = "";

  for (const part of parts) {
    // パストラバーサル対策
    if (part === ".." || part === ".") {
      throw new Error(`Invalid folder path: ${folderPath}`);
    }

    currentPath = currentPath ? `${currentPath}/${part}` : part;
    const folder = app.vault.getAbstractFileByPath(currentPath);

    if (!folder) {
      try {
        await app.vault.createFolder(currentPath);
      } catch (error) {
        throw new Error(`Failed to create folder: ${currentPath}. ${error}`);
      }
    } else if (!(folder instanceof TFolder)) {
      throw new Error(`Path exists but is not a folder: ${currentPath}`);
    }
  }
}
