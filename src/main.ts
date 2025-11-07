import { moment, Plugin } from "obsidian";
import { createDailyJournal } from "./commands/daily-journal";
import { createTaskJournal } from "./commands/task-journal";
import { getTranslations, type Translations } from "./i18n";
import { DEFAULT_SETTINGS, type SprintJournalSettings } from "./settings";
import { DatePickerModal } from "./ui/date-picker-modal";
import { SprintJournalSettingTab } from "./ui/settings-tab";
import { TaskNameModal } from "./ui/task-name-modal";

export interface SprintJournalPluginInterface extends Plugin {
  settings: SprintJournalSettings;
  t: Translations;
  saveSettings(): Promise<void>;
}

export default class SprintJournalPlugin extends Plugin implements SprintJournalPluginInterface {
  settings: SprintJournalSettings;
  t: Translations;

  async onload() {
    await this.loadSettings();

    // Obsidianの言語設定を取得
    const locale = moment.locale();
    this.t = getTranslations(locale);

    // Create daily journal command
    this.addCommand({
      id: "create-daily-journal",
      name: this.t.commands.createDailyJournal,
      callback: () => {
        new DatePickerModal(this.app, this.t, new Date(), async (date) => {
          await createDailyJournal(this.app, this.settings, this.t, date);
        }).open();
      },
    });

    // Create task journal command
    this.addCommand({
      id: "create-task-journal",
      name: this.t.commands.createTaskJournal,
      callback: () => {
        new TaskNameModal(this.app, this.t, new Date(), async (date, taskName) => {
          await createTaskJournal(this.app, this.settings, this.t, date, taskName);
        }).open();
      },
    });

    // Add settings tab
    this.addSettingTab(new SprintJournalSettingTab(this.app, this));
  }

  onunload() {
    // Cleanup
  }

  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  }

  async saveSettings() {
    await this.saveData(this.settings);
  }
}
