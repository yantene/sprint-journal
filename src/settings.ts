import dailyTemplate from "./templates/daily.md";
import taskTemplate from "./templates/task.md";

export interface SprintJournalSettings {
  journalRootFolder: string;
  dailyTemplate: string;
  taskTemplate: string;
}

export const DEFAULT_SETTINGS: SprintJournalSettings = {
  journalRootFolder: "journal",
  dailyTemplate,
  taskTemplate,
};
