import express from 'express';
import cors from 'cors';
import { prisma } from './lib/prisma.js';
import { Stats } from 'node:fs';
import { Prisma } from '@prisma/client';

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ ok: true });
});

app.get('/tasks', async (_req, res) => {
  try {
    const tasks = await prisma.task.findMany({
      orderBy: { createdAt: 'desc' },
    });

    res.json(tasks);
  } catch (error) {
    console.error('Failed to fetch tasks', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/tasks', async (req, res) => {
  try {
    const { title, description, priority, dueDate } = req.body;

    if (!title || typeof title !== 'string' || title.trim().length < 3) {
      return res
        .status(400)
        .json({ error: 'Title must be at least 3 characters long.' });
    }
  
    const task = await prisma.task.create({
      data: {
        title: title.trim(),
        description:
          typeof description === 'string' && description.trim().length > 0
          ? description.trim()
          : null,
        priority:
          priority === 'low' || priority === 'medium' || priority === 'high'
          ? priority
          : 'medium',
        dueDate: dueDate ? new Date(dueDate) : null,
      },
    });

    res.status(201).json(task);
  } catch (error) {
    console.error('Failed to create task', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});  

app.patch('/tasks/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, status, priority, dueDate } = req.body;

    const updateData: {
      title?: string;
      description?: string | null;
      status?: string;
      priority?: string;
      dueDate?: Date | null;
    } = {};

    if (title !== undefined) {
      if (typeof title !== 'string' || title.trim().length < 3) {
        return res.status(400).json({ error: 'Title must be at least 3 characters long.' });
      }
      updateData.title = title.trim();
    }

    if (description !== undefined) {
      updateData.description =
        typeof description === 'string' && description.trim().length > 0
          ? description.trim()
          : null;
    }

    if (status !== undefined) {
      if (status !== 'todo' && status !== 'in_progress' && status !== 'done') {
        return res.status(400).json({ error: 'Invalid status value.' });
      }
      updateData.status = status;
    }

    if (priority !== undefined) {
      if (priority !== 'low' && priority !== 'medium' && priority !== 'high') {
        return res.status(400).json({ error: 'Invalid priority value.' });
      }
      updateData.priority = priority;
    }

    if (dueDate !== undefined) {
      updateData.dueDate = dueDate ? new Date(dueDate) : null;
    }

    const updatedTask = await prisma.task.update({
      where: { id },
      data: updateData,
    });

    res.json(updatedTask);
  } catch (error) {
    console.error('Failed to update task', error);

    if (
      error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025'
    ) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.status(500).json({ error: 'Internal server error'});
  }
});

app.delete('/tasks/:id', async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.task.delete({
      where: { id },
    });

    res.status(204).send();
  } catch (error) {
    console.error('Failed to delete task', error);
    
    if (
      error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025'
    ) {
      return res.status(404).json({ error: 'Task not found' });
    }
    
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});