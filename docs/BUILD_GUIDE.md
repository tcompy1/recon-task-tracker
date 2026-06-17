Recon Task Tracker — Comprehensive Build Guide
Goal
Build a small but production-minded full-stack app that helps a dealership team track recon work on vehicles from intake to completion.

This project is meant to be your first strong portfolio project, not your final capstone. Its job is to teach you the habits that later scale into larger systems like Dealer Recon:

writing clear requirements first

modeling data before coding

building one vertical slice at a time

validating inputs and handling errors

testing important flows

deploying something real

documenting your work like an engineer

What you are building
A user can:

create a recon task

view a list of tasks

edit a task

change status

assign priority

delete a task

filter tasks by status or priority

A task belongs to a single user for Version 1.

Example task:

Title: Replace windshield

Description: Crack on passenger side

Status: In Progress

Priority: High

Due date: 2026-06-20

Why this project matters
Hiring managers usually do not care that a project is flashy. They care that it looks like real work, is easy to understand, and proves that you can build and ship software.

This project shows:

frontend fundamentals with React + TypeScript

backend fundamentals with Node/Express

database CRUD with PostgreSQL

API design

validation and error handling

basic testing

deployment readiness

documentation quality

Recommended stack
Use the stack that best matches your current direction:

Frontend
React

TypeScript

Vite

React Router (optional for future expansion)

TanStack Query or plain fetch (plain fetch is fine for V1)

CSS Modules, Tailwind, or plain CSS

Backend
Node.js

Express

TypeScript

Zod for request validation

bcrypt only if you add auth later

Database
PostgreSQL

Prisma or node-postgres

Dev tooling
Docker + Docker Compose

ESLint

Prettier

Vitest for frontend unit tests

Supertest + Vitest/Jest for backend API tests

If you want the cleanest learning path, use:

React + Vite + TypeScript

Express + TypeScript

PostgreSQL

Prisma

Docker Compose

Zod

Vitest

Learning strategy
Do not build the whole app in one pass.

Build it in vertical slices:

database model

one API route

one UI form

one list screen

edit flow

filter flow

tests

deployment

For every slice, answer these four questions before coding:

What is the user trying to do?

What data do we need?

What request/response shape will we use?

What can go wrong?

That is how you stop “guiding AI” and start thinking like an engineer.

Project scope
Keep Version 1 intentionally small.

Version 1 features
Create task

Read/list tasks

Update task

Delete task

Mark task status: Todo, In Progress, Done

Set priority: Low, Medium, High

Optional due date

Filter by status

Filter by priority

Basic responsive UI

Seeded sample data

README with screenshots

Deployed frontend and backend

Do not include yet
drag-and-drop reordering

file uploads

multi-user collaboration

email notifications

analytics dashboard

websocket live updates

OAuth

role-based access control

Those are good later, but they are not your first win.

User stories
Use these as your build contract.

As a user, I can create a task so I can track recon work.

As a user, I can view all my tasks so I know what is open.

As a user, I can edit a task so I can correct or update information.

As a user, I can delete a task so I can remove work that is no longer needed.

As a user, I can change task status so I can track progress.

As a user, I can assign priority so I know what matters most.

As a user, I can filter tasks so I can focus on a subset of work.

Functional requirements
Task fields
Each task should have:

id

title

description (optional)

status

priority

dueDate (optional)

createdAt

updatedAt

Business rules
Title is required.

Title should be between 3 and 120 characters.

Description is optional.

Status must be one of: todo, in_progress, done.

Priority must be one of: low, medium, high.

Due date is optional, but if provided it must be a valid date.

Data model
Simple entity design
For V1, you only need one main table.

tasks
id UUID primary key

title varchar

description text nullable

status varchar

priority varchar

due_date date nullable

created_at timestamp

updated_at timestamp

If you want to prepare for V2 auth later, you can also add:

user_id UUID nullable for now

TypeScript shape
ts
export type TaskStatus = 'todo' | 'in_progress' | 'done'
export type TaskPriority = 'low' | 'medium' | 'high'

export interface Task {
  id: string
  title: string
  description: string | null
  status: TaskStatus
  priority: TaskPriority
  dueDate: string | null
  createdAt: string
  updatedAt: string
}
API design
Keep the API boring and clean.

Endpoints
GET /tasks

GET /tasks/:id

POST /tasks

PATCH /tasks/:id

DELETE /tasks/:id

Query params for list filtering
GET /tasks?status=todo

GET /tasks?priority=high

GET /tasks?status=in_progress&priority=high

Example create request
json
{
  "title": "Replace windshield",
  "description": "Crack on passenger side",
  "status": "todo",
  "priority": "high",
  "dueDate": "2026-06-20"
}
Example response
json
{
  "id": "uuid-value",
  "title": "Replace windshield",
  "description": "Crack on passenger side",
  "status": "todo",
  "priority": "high",
  "dueDate": "2026-06-20",
  "createdAt": "2026-06-17T15:00:00.000Z",
  "updatedAt": "2026-06-17T15:00:00.000Z"
}
Error response format
Use one consistent error shape:

json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Title is required",
    "details": []
  }
}
Validation design
This is one of the first places where you start acting like an engineer.

Validate at the API boundary:

required fields

allowed enum values

string lengths

date format

Recommended approach:

create Zod schemas for createTask and updateTask

parse req.body

return 400 for invalid input

Pseudo-flow:

Receive request.

Validate request body.

If invalid, return structured error.

If valid, write to DB.

Return normalized result.

UI pages and components
For V1, one page is enough.

Page layout
Header

Create/edit task form

Filter controls

Task list

Empty state

Suggested components
TaskPage

TaskForm

TaskFilters

TaskList

TaskCard

StatusBadge

PriorityBadge

EmptyState

UI behavior
Form supports create mode and edit mode.

Task list updates after create/edit/delete.

Filter controls update visible tasks.

Empty state appears when no tasks match current filter.

Loading and error states are visible.

Folder structure
A simple monorepo-ish layout is fine.

text
recon-task-tracker/
  client/
    src/
      components/
      pages/
      api/
      types/
      utils/
  server/
    src/
      routes/
      controllers/
      services/
      db/
      schemas/
      middleware/
      types/
  docker-compose.yml
  README.md
A simpler alternative is okay too, but keep backend concerns separated:

route

controller

service

data access

Step-by-step build plan
Step 1: Write the spec before code
Create a short file like docs/spec.md.

Write:

project goal

user stories

data model

API endpoints

non-goals

You are training yourself to think before typing.

Step 2: Initialize the repo
Create:

frontend app with Vite React TypeScript

backend app with Express TypeScript

shared .gitignore

root README

Add scripts for:

frontend dev

backend dev

lint

test

db migrate or db push

Step 3: Set up PostgreSQL
Use Docker Compose.

You want:

postgres container

named volume for data persistence

environment variables for DB credentials

If using Prisma:

initialize Prisma

define Task model

run migration

inspect DB

You should be able to answer:

What is my connection string?

What command creates the schema?

How do I reset local data safely?

Step 4: Implement the Task model
Create the database schema.

Decide:

UUID generation strategy

timestamps default values

nullable fields

Then verify manually:

can a task be created?

are timestamps set automatically?

are enum-like values controlled in app validation?

Step 5: Build the first API route
Start with POST /tasks.

Why first?
Because it forces you to think about:

request body shape

validation

DB insert

response shape

error handling

Checklist:

create request schema

create controller

create service function

write DB insert logic

return 201

return 400 for bad input

test with Postman, Bruno, or curl

Example curl:

bash
curl -X POST http://localhost:8080/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "title":"Replace windshield",
    "description":"Crack on passenger side",
    "status":"todo",
    "priority":"high"
  }'
Step 6: Build GET /tasks
After create works, build read/list.

Requirements:

return all tasks sorted by created date descending

optionally filter by status

optionally filter by priority

Questions to answer:

What happens if query params are invalid?

Should missing filters return all tasks? Yes.

Should filters be case-sensitive? Prefer normalized lowercase values.

Step 7: Build the frontend shell
Create the page with:

title/header

form area

filter area

task list area

At this stage, hard-code sample tasks first if needed.

Why?
Because it lets you solve layout and component structure before network wiring.

Step 8: Connect frontend to backend
Now replace mock data with real API calls.

Implement:

fetch tasks on page load

create task via form submit

refresh task list after successful create

show loading state

show error message

Learning focus:

async flow

request lifecycle

state updates after mutation

Step 9: Add edit flow
Implement:

click Edit on a task

populate form with task data

switch form into edit mode

submit PATCH request

refresh list

clear form after save or cancel

This teaches one of the most important UI concepts: one form, two modes.

Step 10: Add delete flow
Implement:

click Delete

show confirmation prompt

delete task

update list without stale UI

Important thought:
Deleting is easy technically, but it teaches you to think about user safety and destructive actions.

Step 11: Add filters
Implement:

status dropdown

priority dropdown

optional clear filters button

Decide whether filtering is:

server-side, by query params, or

client-side, after fetching all tasks

Recommendation:
Use server-side filtering so you practice API query design.

Step 12: Add polished states
Add:

loading spinner or loading text

empty state

validation messages

backend error message area

disabled submit button during save

These details make a beginner project feel like software instead of a tutorial clone.

Step 13: Add tests
You do not need huge coverage.
You do need meaningful tests.

Backend tests
Write tests for:

create task success

create task validation failure

get tasks returns array

patch task updates status

delete task removes item

Frontend tests
Write tests for:

form validation behavior

rendering tasks from API data

switching into edit mode

filter control changes query state

Even 5 to 10 good tests is enough for V1.

Step 14: Seed data
Create sample tasks so your app demo is never empty.

Good demo seed examples:

Replace windshield — high — todo

Detail interior — medium — in progress

Touch up bumper paint — high — in progress

Install floor mats — low — done

Seed data makes screenshots, demos, and recruiter review much better.

Step 15: Deploy it
Deploy as early as possible.

Typical simple deployment options:

frontend: Vercel or Netlify

backend: Render, Railway, or Fly.io

database: Neon, Railway Postgres, Supabase Postgres, or Render Postgres

Your deployed project should have:

live URL

working API

environment variables configured

sample/demo data

no broken CORS

Deployment is a core part of the project, not an optional extra.

Step 16: Write the README
Your README matters more than most juniors think.

Include:

project summary

screenshot or GIF

tech stack

features

architecture overview

local setup steps

environment variables

API overview

testing commands

deployment links

future improvements

Good README sections make it easier for hiring managers to understand your project quickly.

Suggested implementation order
If you get overwhelmed, follow this exact order:

Spec document

Repo setup

Database setup

Task table/model

POST /tasks

GET /tasks

Basic frontend layout

Create task from UI

Render task list from API

Edit task

Delete task

Filter task list

Loading/error/empty states

Tests

Seed data

Deploy

README polish

Common mistakes to avoid
Building too many features before CRUD works

Skipping validation

Not handling loading and error states

Mixing all backend logic into one file

Making the UI fancy before the data flow works

Waiting until the end to deploy

Using AI output you do not understand

Not writing down your API contracts first

Engineering habits to practice while building
For every feature, write these before coding:

Input

Output

Data changes

Edge cases

After AI gives code, ask:

What file changed and why?

What happens on invalid input?

What SQL or ORM call is actually running?

What should the response be if the task does not exist?

Can I explain this line by line?

If you cannot explain it, do not merge it yet.

Example acceptance checklist
Use this checklist before calling V1 done.

Backend
Can create a task

Can fetch all tasks

Can fetch one task

Can update a task

Can delete a task

Invalid data returns 400

Missing task returns 404

Filtering works

Frontend
User can create a task

User can edit a task

User can delete a task

User can filter tasks

Loading state is visible

Empty state is visible

Error state is visible

Form errors are understandable

Portfolio quality
App is deployed

Seed data exists

README is clear

Screenshots included

Repo is organized

Commit history is readable

Stretch goals for Version 2
Only do these after V1 is fully deployed.

User authentication

Role-based access control

Notes or comments on tasks

Vehicle entity with tasks attached to a vehicle

Search by title

Sorting by due date or priority

Audit log of task changes

Dashboard metrics

Drag-and-drop task board

These begin turning the project from a task tracker into an early Dealer Recon building block.

Interview talking points
When this is done, you should be able to explain:

Why you chose the stack

How the frontend talks to the backend

How you modeled the task entity

How validation works

How filtering works

How you handled loading/error states

What tradeoffs you made to keep scope realistic

What you would build next if given another week

If you can explain those clearly, the project becomes much more valuable in interviews.

7-day build schedule
Here is a practical first pass.

Day 1
Write spec

Initialize repo

Set up frontend and backend

Create Docker Compose for Postgres

Day 2
Create DB model/migration

Implement POST /tasks

Test with curl or Postman

Day 3
Implement GET /tasks

Build frontend page shell

Render mock tasks

Day 4
Connect frontend to API

Create task from UI

Render real tasks

Day 5
Implement edit and delete

Add filters

Day 6
Add validation polish

Add loading/error/empty states

Write core tests

Day 7
Seed demo data

Deploy frontend/backend/database

Write README and screenshots

Final advice
Your mission with this project is not to prove that you can build a huge app.
It is to prove that you can:

define scope

model data

build CRUD properly

connect UI to API

test key flows

deploy a working product

explain your decisions

That is already real software engineering practice.
