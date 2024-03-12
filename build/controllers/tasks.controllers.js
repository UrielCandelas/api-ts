"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTask = exports.updateTask = exports.getTask = exports.getTasks = exports.registerNewTask = void 0;
const tasks_models_1 = __importDefault(require("../models/tasks.models"));
const registerNewTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description, date } = req.body;
    try {
        const newTask = tasks_models_1.default.build({
            title,
            description,
            date,
        });
        yield newTask.save();
        return res.status(200).json({
            message: "User created successfully",
            title: title,
            description: description,
            date: date,
        });
    }
    catch (error) {
        console.error("Error:", error);
        return res.status(500).json({
            message: "Error creating the user",
        });
    }
});
exports.registerNewTask = registerNewTask;
const getTasks = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tasksArray = [];
    try {
        const tasks = yield tasks_models_1.default.findAll();
        for (let index = 0; index < tasks.length; index++) {
            const task = {
                id: tasks[index].get().id,
                title: tasks[index].get().title,
                description: tasks[index].get().description,
                date: tasks[index].get().date,
            };
            tasksArray.push(task);
        }
        return res.status(200).json(tasksArray);
    }
    catch (error) {
        console.error("Error:", error);
        return res.status(500).json({
            message: "Error getting tasks",
        });
    }
});
exports.getTasks = getTasks;
const getTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const taskFound = yield tasks_models_1.default.findByPk(id);
        if (!taskFound) {
            return res.status(404).json({
                message: "Task not found",
            });
        }
        return res.status(200).json({
            title: taskFound === null || taskFound === void 0 ? void 0 : taskFound.get().title,
            description: taskFound === null || taskFound === void 0 ? void 0 : taskFound.get().description,
            date: taskFound === null || taskFound === void 0 ? void 0 : taskFound.get().date,
            createdAt: taskFound === null || taskFound === void 0 ? void 0 : taskFound.get().createdAt,
        });
    }
    catch (error) {
        console.error("Error:", error);
        return res.status(500).json({
            message: "Error getting tasks",
        });
    }
});
exports.getTask = getTask;
const updateTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, title, description, date } = req.body;
    try {
        const taskFound = yield tasks_models_1.default.findByPk(id);
        if (!taskFound) {
            return res.status(404).json({
                message: "Task not found",
            });
        }
        yield tasks_models_1.default.update({ title, description, date }, {
            where: {
                id,
            },
        });
        const taskFoundUpdated = yield tasks_models_1.default.findByPk(id);
        return res.status(200).json({
            title: taskFoundUpdated === null || taskFoundUpdated === void 0 ? void 0 : taskFoundUpdated.get().title,
            description: taskFoundUpdated === null || taskFoundUpdated === void 0 ? void 0 : taskFoundUpdated.get().description,
            date: taskFoundUpdated === null || taskFoundUpdated === void 0 ? void 0 : taskFoundUpdated.get().date,
            createdAt: taskFoundUpdated === null || taskFoundUpdated === void 0 ? void 0 : taskFoundUpdated.get().createdAt,
            updatedAt: taskFoundUpdated === null || taskFoundUpdated === void 0 ? void 0 : taskFoundUpdated.get().updatedAt,
        });
    }
    catch (error) {
        console.error("Error:", error);
        return res.status(500).json({
            message: "Error updating tasks",
        });
    }
});
exports.updateTask = updateTask;
const deleteTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const taskFound = yield tasks_models_1.default.findByPk(id);
        if (!taskFound) {
            return res.status(404).json({
                message: "Task not found",
            });
        }
        yield tasks_models_1.default.destroy({
            where: {
                id,
            },
        });
        return res.status(200).json({ message: "Task deleted" });
    }
    catch (error) {
        console.error("Error:", error);
        return res.status(500).json({
            message: "Error getting tasks",
        });
    }
});
exports.deleteTask = deleteTask;
