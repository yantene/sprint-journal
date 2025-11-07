import type { Translations } from "./types";

export const en: Translations = {
  commands: {
    createDailyJournal: "Create daily journal",
    createTaskJournal: "Create task journal",
  },
  modals: {
    selectDate: "Select Date",
    createTaskJournal: "Create Task Journal",
    date: "Date",
    sprint: "Sprint",
    currentWeek: "Current week",
    taskName: "Task name",
    taskNamePlaceholder: "implement feature x",
    cancel: "Cancel",
    create: "Create",
  },
  settings: {
    title: "Sprint Journal Settings",
    journalFolder: {
      name: "Journal folder",
      desc: "Root folder to store journals",
    },
    dailyTemplate: {
      name: "Daily journal template",
      desc: "Template used when creating daily journals",
    },
    taskTemplate: {
      name: "Task journal template",
      desc: "Template used when creating task journals",
    },
  },
  notices: {
    openedDailyJournal: "Opened daily journal",
    createdTaskJournal: "Created task journal",
    openingExistingTaskJournal: "Opening existing task journal",
    failedToOpenDailyJournal: "Failed to open daily journal",
    failedToCreateDailyJournal: "Failed to create daily journal",
    failedToOpenTaskJournal: "Failed to open task journal",
    failedToCreateTaskJournal: "Failed to create task journal",
    errorCreatingDailyJournal: "Error creating daily journal",
    errorCreatingTaskJournal: "Error creating task journal",
    journalFolderEmpty: "Journal folder path cannot be empty",
    journalFolderInvalidPath: 'Journal folder path cannot contain ".."',
  },
};
