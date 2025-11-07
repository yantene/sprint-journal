/**
 * 翻訳の型定義
 * すべての言語ファイルはこの型を満たす必要があります
 */
export interface Translations {
  commands: {
    createDailyJournal: string;
    createTaskJournal: string;
  };
  modals: {
    selectDate: string;
    createTaskJournal: string;
    date: string;
    sprint: string;
    currentWeek: string;
    taskName: string;
    taskNamePlaceholder: string;
    cancel: string;
    create: string;
  };
  settings: {
    title: string;
    journalFolder: {
      name: string;
      desc: string;
    };
    dailyTemplate: {
      name: string;
      desc: string;
    };
    taskTemplate: {
      name: string;
      desc: string;
    };
  };
  notices: {
    openedDailyJournal: string;
    createdTaskJournal: string;
    openingExistingTaskJournal: string;
    failedToOpenDailyJournal: string;
    failedToCreateDailyJournal: string;
    failedToOpenTaskJournal: string;
    failedToCreateTaskJournal: string;
    errorCreatingDailyJournal: string;
    errorCreatingTaskJournal: string;
    journalFolderEmpty: string;
    journalFolderInvalidPath: string;
  };
}

export type Language = "en" | "ja";
