import { type App, Notice, PluginSettingTab, Setting } from "obsidian";
import type { SprintJournalPluginInterface } from "../main";

export class SprintJournalSettingTab extends PluginSettingTab {
  plugin: SprintJournalPluginInterface;

  constructor(app: App, plugin: SprintJournalPluginInterface) {
    super(app, plugin);
    this.plugin = plugin;
  }

  display(): void {
    const { containerEl } = this;
    const { t } = this.plugin;

    containerEl.empty();

    containerEl.createEl("h2", { text: t.settings.title });

    new Setting(containerEl)
      .setName(t.settings.journalFolder.name)
      .setDesc(t.settings.journalFolder.desc)
      .addText((text) =>
        text
          .setPlaceholder("journal")
          .setValue(this.plugin.settings.journalRootFolder)
          .onChange(async (value) => {
            const trimmed = value.trim();
            if (!trimmed) {
              new Notice(t.notices.journalFolderEmpty);
              return;
            }
            // パストラバーサル対策
            if (trimmed.includes("..")) {
              new Notice(t.notices.journalFolderInvalidPath);
              return;
            }
            this.plugin.settings.journalRootFolder = trimmed;
            await this.plugin.saveSettings();
          }),
      );

    new Setting(containerEl)
      .setName(t.settings.dailyTemplate.name)
      .setDesc(t.settings.dailyTemplate.desc)
      .addTextArea((text) => {
        text.inputEl.rows = 10;
        text.inputEl.cols = 50;
        text
          .setPlaceholder("Enter template...")
          .setValue(this.plugin.settings.dailyTemplate)
          .onChange(async (value) => {
            this.plugin.settings.dailyTemplate = value;
            await this.plugin.saveSettings();
          });
      });

    new Setting(containerEl)
      .setName(t.settings.taskTemplate.name)
      .setDesc(t.settings.taskTemplate.desc)
      .addTextArea((text) => {
        text.inputEl.rows = 10;
        text.inputEl.cols = 50;
        text
          .setPlaceholder("Enter template...")
          .setValue(this.plugin.settings.taskTemplate)
          .onChange(async (value) => {
            this.plugin.settings.taskTemplate = value;
            await this.plugin.saveSettings();
          });
      });
  }
}
