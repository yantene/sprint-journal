# Sprint Journal

An Obsidian plugin that provides a journaling methodology based on ISO 8601 week numbers. It supports weekly sprint-based task management and daily journal creation.

## Features

### Daily Journal

- Create daily journals based on ISO weeks (Monday through Sunday)
- Automatically creates journal files for the entire week
- Customizable templates
- Automatic week-based folder structure (e.g., `journal/2025/W45/`)

### Task Journal

- Create task journals on a sprint (weekly) basis
- Automatically generates file names from task names
- Project management-friendly templates
- Week selection capability

## Installation

### Manual Installation

1. Clone or download this repository
2. Run `npm install` to install dependencies
3. Run `npm run build` to build the plugin
4. Copy `main.js`, `manifest.json`, and `styles.css` to `<Vault>/.obsidian/plugins/sprint-journal/`
5. Open Obsidian settings, go to **Community plugins**, and enable Sprint Journal

### Development Mode

```bash
npm install
npm run dev
```

Development mode watches for file changes and automatically rebuilds.

## Usage

### Recommended Workflow

This plugin is designed to support a structured journaling workflow:

#### Starting Your Day

1. Open today's Daily Journal
2. In the **Journal** section, write a bullet list of tasks you plan to work on today
3. Start working on your tasks

#### During Work

- As you work, nest additional details under each task bullet point
- Dig deeper into subtasks and progress as you go
- When a task becomes too complex (deep nesting) or large, create a Task Journal for it
- Link the Task Journal from your Daily Journal using `[[YYYY-Www_task-name]]`

#### Working with Task Journals

In a Task Journal:
- **Context**: Document the background, references, and links related to the task
- **Goals**: Define completion criteria and objectives
- **Journal**: Track progress and activities, similar to Daily Journal
- **Thoughts**: Record quick insights and ideas

#### Capturing Thoughts

Use the **Thoughts** section in both Daily and Task Journals like a microblog:
- Write quick thoughts and ideas as they come to you
- No need to overthink or structure them
- Great for capturing fleeting insights

### Creating a Daily Journal

1. Open the command palette (`Ctrl/Cmd + P`)
2. Select **Create daily journal**
3. Choose a date
4. Journal files for all dates in the selected week will be created, and the file for the selected date will open

Example of created files:
```
journal/
  2025/
    W45/
      2025-11-03.md
      2025-11-04.md
      2025-11-05.md
      2025-11-06.md
      2025-11-07.md
      2025-11-08.md
      2025-11-09.md
```

### Creating a Task Journal

1. Open the command palette (`Ctrl/Cmd + P`)
2. Select **Create task journal**
3. Choose a sprint (week)
4. Enter a task name (e.g., `implement feature x`)
5. A task journal file will be created and opened

Example of created file:
```
journal/2025/W45/2025-W45_implement-feature-x.md
```

## Settings

Plugin settings can be changed from **Settings → Community plugins → Sprint Journal**.

### Journal folder

Specify the root folder where journal files will be saved.

- Default: `journal`

### Daily journal template

The template used when creating daily journals.

Default template:
```markdown
---
type: daily
sprint: {{sprint}}
---
## Journal
- [ ] 
## Thoughts
- 
```

### Task journal template

The template used when creating task journals.

Default template:
```markdown
---
type: task
project:
sprint: {{sprint}}
---
## Context

## Goals
- [ ] 
## Journal
- [ ] 
## Thoughts
- 
```

### Template Variables

Variables available in templates:

- `{{sprint}}` - Sprint identifier (e.g., `2025-W45`)

## File Structure

```
journal/
  YYYY/                    # Year
    Www/                   # ISO week number
      YYYY-MM-DD.md        # Daily journal
      YYYY-Www_task-name.md # Task journal
```

Example:
```
journal/
  2025/
    W45/
      2025-11-03.md
      2025-11-04.md
      2025-11-05.md
      2025-11-06.md
      2025-11-07.md
      2025-11-08.md
      2025-11-09.md
      2025-W45_implement-authentication.md
      2025-W45_refactor-database.md
```

## About ISO 8601 Week Numbers

This plugin uses ISO 8601 week numbers:

- Weeks start on Monday and end on Sunday
- Week 1 of a year is the week containing the first Thursday of that year
- Week numbers range from 1 to 53

## Development

### Build

```bash
# Development build (watch mode)
npm run dev

# Production build
npm run build
```

### Project Structure

```
src/
  main.ts              # Plugin entry point
  settings.ts          # Settings interface and defaults
  commands/            # Command implementations
    daily-journal.ts   # Daily journal creation
    task-journal.ts    # Task journal creation
  ui/                  # UI components
    date-picker-modal.ts    # Date picker modal
    task-name-modal.ts      # Task name input modal
    settings-tab.ts         # Settings tab
  utils/               # Utilities
    date.ts            # Date-related helper functions
  templates/           # Template files
    daily.md           # Daily journal template
    task.md            # Task journal template
```

## License

MIT

## Author

[yantene](https://github.com/yantene)

## Version History

### 0.1.0

- Initial release
- Daily journal creation feature
- Task journal creation feature
- Customizable templates
- ISO week-based folder structure
