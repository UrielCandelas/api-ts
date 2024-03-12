import { Request, Response } from "express";
import { JSONTask, RegisterTaks } from "../../types";

import Task from "../models/tasks.models";

export const registerNewTask = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { title, description, date }: RegisterTaks = req.body;

  try {
    const newTask = Task.build({
      title,
      description,
      date,
    });

    await newTask.save();

    return res.status(200).json({
      message: "Task created successfully",
      title: title,
      description: description,
      date: date,
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({
      message: "Error creating the user",
    });
  }
};

export const getTasks = async (
  _req: Request,
  res: Response
): Promise<Response> => {
  const tasksArray: JSONTask[] = [];
  try {
    const tasks = await Task.findAll();

    for (let index = 0; index < tasks.length; index++) {
      const task: JSONTask = {
        id: tasks[index].get().id,
        title: tasks[index].get().title,
        description: tasks[index].get().description,
        date: tasks[index].get().date,
      };

      tasksArray.push(task);
    }

    return res.status(200).json(tasksArray);
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({
      message: "Error getting tasks",
    });
  }
};

export const getTask = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.params;
  try {
    const taskFound = await Task.findByPk(id);
    if (!taskFound) {
      return res.status(404).json({
        message: "Task not found",
      });
    }
    return res.status(200).json({
      title: taskFound?.get().title,
      description: taskFound?.get().description,
      date: taskFound?.get().date,
      createdAt: taskFound?.get().createdAt,
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({
      message: "Error getting tasks",
    });
  }
};

export const updateTask = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id, title, description, date }: JSONTask = req.body;
  try {
    const taskFound = await Task.findByPk(id);
    if (!taskFound) {
      return res.status(404).json({
        message: "Task not found",
      });
    }
    await Task.update(
      { title, description, date },
      {
        where: {
          id,
        },
      }
    );
    const taskFoundUpdated = await Task.findByPk(id);
    return res.status(200).json({
      title: taskFoundUpdated?.get().title,
      description: taskFoundUpdated?.get().description,
      date: taskFoundUpdated?.get().date,
      createdAt: taskFoundUpdated?.get().createdAt,
      updatedAt: taskFoundUpdated?.get().updatedAt,
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({
      message: "Error updating tasks",
    });
  }
};

export const deleteTask = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.params;
  try {
    const taskFound = await Task.findByPk(id);
    if (!taskFound) {
      return res.status(404).json({
        message: "Task not found",
      });
    }
    await Task.destroy({
      where: {
        id,
      },
    });
    return res.status(200).json({ message: "Task deleted" });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({
      message: "Error getting tasks",
    });
  }
};
