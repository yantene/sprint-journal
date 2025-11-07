import { type App, Modal, Setting } from "obsidian";
import type { Translations } from "../i18n";

export class DatePickerModal extends Modal {
  private selectedDate: Date;
  private onSubmit: (date: Date) => void;
  private t: Translations;

  constructor(app: App, t: Translations, defaultDate: Date, onSubmit: (date: Date) => void) {
    super(app);
    this.t = t;
    this.selectedDate = new Date(defaultDate);
    this.onSubmit = onSubmit;
  }

  onOpen() {
    const { contentEl } = this;
    contentEl.empty();

    contentEl.createEl("h2", { text: this.t.modals.selectDate });

    new Setting(contentEl).setName(this.t.modals.date).addText((text) => {
      const dateStr = this.formatDate(this.selectedDate);
      text.setValue(dateStr);
      text.inputEl.type = "date";
      text.onChange((value) => {
        const parts = value.split("-");
        if (parts.length === 3) {
          this.selectedDate = new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));
        }
      });
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
            this.onSubmit(this.selectedDate);
            this.close();
          }),
      );
  }

  onClose() {
    const { contentEl } = this;
    contentEl.empty();
  }

  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  }
}
