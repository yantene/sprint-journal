import type { Translations } from "./types";

export const ja: Translations = {
  commands: {
    createDailyJournal: "日次ジャーナルを作成",
    createTaskJournal: "タスクジャーナルを作成",
  },
  modals: {
    selectDate: "日付を選択",
    createTaskJournal: "タスクジャーナルを作成",
    date: "日付",
    sprint: "スプリント",
    currentWeek: "現在の週",
    taskName: "タスク名",
    taskNamePlaceholder: "機能xを実装",
    cancel: "キャンセル",
    create: "作成",
  },
  settings: {
    title: "スプリントジャーナル設定",
    journalFolder: {
      name: "ジャーナルフォルダ",
      desc: "ジャーナルを保存するルートフォルダ",
    },
    dailyTemplate: {
      name: "日次ジャーナルテンプレート",
      desc: "日次ジャーナル作成時に使用するテンプレート",
    },
    taskTemplate: {
      name: "タスクジャーナルテンプレート",
      desc: "タスクジャーナル作成時に使用するテンプレート",
    },
  },
  notices: {
    openedDailyJournal: "日次ジャーナルを開きました",
    createdTaskJournal: "タスクジャーナルを作成しました",
    openingExistingTaskJournal: "既存のタスクジャーナルを開きます",
    failedToOpenDailyJournal: "日次ジャーナルを開けませんでした",
    failedToCreateDailyJournal: "日次ジャーナルを作成できませんでした",
    failedToOpenTaskJournal: "タスクジャーナルを開けませんでした",
    failedToCreateTaskJournal: "タスクジャーナルを作成できませんでした",
    errorCreatingDailyJournal: "日次ジャーナルの作成中にエラーが発生しました",
    errorCreatingTaskJournal: "タスクジャーナルの作成中にエラーが発生しました",
    journalFolderEmpty: "ジャーナルフォルダのパスを空にすることはできません",
    journalFolderInvalidPath: 'ジャーナルフォルダのパスに".."を含めることはできません',
  },
};
