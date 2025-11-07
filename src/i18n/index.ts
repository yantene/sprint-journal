import { en } from "./en";
import { ja } from "./ja";
import type { Translations } from "./types";

// 型定義と言語タイプを再エクスポート
export type { Language, Translations } from "./types";

/**
 * Obsidianの言語設定から適切な翻訳を取得
 * @param obsidianLocale Obsidianのロケール設定（例: "en", "ja", "zh-CN"）
 * @returns 翻訳オブジェクト
 */
export function getTranslations(obsidianLocale: string): Translations {
  // Obsidianのロケール形式（例: "ja", "zh-CN"）から言語コードを抽出
  const lang = obsidianLocale.split("-")[0].toLowerCase();

  switch (lang) {
    case "ja":
      return ja;
    default:
      return en;
  }
}
