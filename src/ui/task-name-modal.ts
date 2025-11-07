import { type App, Modal, Setting } from "obsidian";
import type { Translations } from "../i18n";
import { getISOWeek, getISOWeekYear, getSprintIdentifier } from "../utils/date";

export class TaskNameModal extends Modal {
  private taskName = "";
  private selectedDate: Date;
  private onSubmit: (date: Date, taskName: string) => void;
  private t: Translations;

  constructor(app: App, t: Translations, defaultDate: Date, onSubmit: (date: Date, taskName: string) => void) {
    super(app);
    this.t = t;
    this.selectedDate = new Date(defaultDate);
    this.onSubmit = onSubmit;
  }

  onOpen() {
    const { contentEl } = this;
    contentEl.empty();

    contentEl.createEl("h2", { text: this.t.modals.createTaskJournal });

    new Setting(contentEl)
      .setName(this.t.modals.sprint)
      .setDesc(`${this.t.modals.currentWeek}: ${getSprintIdentifier(this.selectedDate)}`)
      .addText((text) => {
        const weekStr = this.formatWeek(this.selectedDate);
        text.setValue(weekStr);
        text.inputEl.type = "week";
        text.onChange((value) => {
          // ISO 8601形式: YYYY-Www (例: 2025-W45)
          const match = value.match(/^(\d{4})-W(\d{2})$/);
          if (match) {
            const year = parseInt(match[1], 10);
            const week = parseInt(match[2], 10);
            // その年の週からおおよその日付を計算（週の月曜日）
            this.selectedDate = this.getDateFromWeek(year, week);
            // 説明文を更新
            const desc = contentEl.querySelector(".setting-item-description");
            if (desc) {
              desc.textContent = `${this.t.modals.currentWeek}: ${getSprintIdentifier(this.selectedDate)}`;
            }
          }
        });
      });

    new Setting(contentEl).setName(this.t.modals.taskName).addText((text) => {
      text.setPlaceholder(this.t.modals.taskNamePlaceholder);
      text.onChange((value) => {
        this.taskName = value;
      });
      text.inputEl.addEventListener("keydown", (e: KeyboardEvent) => {
        if (e.key === "Enter") {
          e.preventDefault();
          this.submit();
        }
      });
      // フォーカスを当てる
      setTimeout(() => text.inputEl.focus(), 10);
    });

    new Setting(contentEl)
      .addButton((btn) =>
        btn.setButtonText(this.t.modals.cancel).onClick(() => {
          this.close();
        }),
      )
      .addButton((btn) =>
        btn
          .setButtonText(this.t.modals.create)
          .setCta()
          .onClick(() => {
            this.submit();
          }),
      );
  }

  onClose() {
    const { contentEl } = this;
    contentEl.empty();
  }

  private submit() {
    if (this.taskName.trim()) {
      this.onSubmit(this.selectedDate, this.taskName.trim());
      this.close();
    }
  }

  private formatWeek(date: Date): string {
    const year = getISOWeekYear(date);
    const week = getISOWeek(date);
    return `${year}-W${week.toString().padStart(2, "0")}`;
  }

  private getDateFromWeek(year: number, week: number): Date {
    // ISO週の定義に基づいて、その年の週番号から日付を計算
    // 1月4日は常に第1週に含まれる
    const jan4 = new Date(year, 0, 4);
    const jan4Day = (jan4.getDay() + 6) % 7; // 月曜日を0とする
    const weekStart = new Date(jan4);
    weekStart.setDate(jan4.getDate() - jan4Day + (week - 1) * 7);
    return weekStart;
  }
}
