# Recon Task Tracker Spec

## Project Goal

Build a small full-stack task tracking app that lets a user create, view, update, organize, and delete recon-style tasks. The purpose of this project is to practice core software engineering skills: data modeling, CRUD APIs, frontend state management, validation, testing, and deployment.

This project is the first stepping stone toward a larger Dealer Recon-style system, but Version 1 will stay focused on simple task management. Version 1 is a single-user app.

## User Stories

- As a user, I can create a task so I can track work that needs to be done.
- As a user, I can view a list of tasks so I can see all current work in one place.
- As a user, I can edit an existing task so I can update incorrect or outdated information.
- As a user, I can delete a task so I can remove work that is no longer needed.
- As a user, I can filter tasks by status or priority so I can focus on the most important work. Optionaly I can sort by newest first.
- As a user, I can mark a task as completed so I know when work is done.

## Data model

### Task

Each task should contain: 

- `id`: unique identifier
- `title`: shor ttask title, requried
- `description`: optional longer details
- `status`: current stat of task (`todo`, `in_progress`, `done`)
- `priority`: importance level (`low`, `medium`, `high`)
- `dueDate`: optional due date
- `createdAt`: timestamp when task was created
- `updatedAt`: timetamp when task was last updated

### Notes on validation

- `title` is required
- `title` should be between 3 and 120 characters
- `status` must be one of the allowed enum values
- `priority` must be one of the allowed enum values
- `dueDate` is optional

## API endpoints

### Get all tasks
- `GET /tasks`
- Returns all tasks
- Supports optional filtering by status and priority

### Get one task
- `GET /tasks/:id`
- Returns one task by id

### Create task
- `POST /tasks`
- Creates a new task

### Update task
- `PATCH / tasks/:id`
- Updates one or more task fields

### Delte task
- `DELETE / tasks/:id`
- Deletes a task by id

## Non-goals

The following are out of scope for Version 1:

- User authentication
- Role-based access control
- File uploads
- Comments or notes history
- Activity audit log
- Vehicle records
- Multi-user collaboration
- Real-time updates
- Dashboard analytics
- Drag-and-drop task board

## Version 1 success criteria

Version 1 is complete when:

- A user can create, view, edit, and delete tasks
- A user can change status and priority
- A user can filter tasks
- Invalid input is handled cleanly
- The app is deployed and usable online
- The repo inlcudes a clear README