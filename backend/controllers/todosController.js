// backend/controllers/todosController.js
const Todo = require('../models/Todo');

exports.createTodo = async (req, res) => {
    try {
        const todo = new Todo(req.body);
        await todo.save();
        res.status(201).json(todo);
    } catch (err) {
        res.status(500).json({ error: 'Failed to create todo' });
    }
};

exports.getTodos = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    try {
        const todos = await Todo.find().sort({ createdAt: -1 }).skip(skip).limit(limit);
        const total = await Todo.countDocuments();
        res.json({ todos, total });
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch todos' });
    }
};

exports.getTodoById = async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id);
        if (!todo) return res.status(404).json({ error: 'Todo not found' });
        res.json(todo);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch todo' });
    }
};

exports.updateTodo = async (req, res) => {
    const { title, description } = req.body;
    try {
        const todo = await Todo.findByIdAndUpdate(
            req.params.id,
            { title, description },
            { new: true, runValidators: true }
        );
        if (!todo) return res.status(404).json({ error: 'Todo not found' });
        res.json(todo);
    } catch (err) {
        res.status(500).json({ error: 'Failed to update todo' });
    }
};
