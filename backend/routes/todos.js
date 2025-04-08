const router = require('express').Router();
const { createTodo, getTodos, getTodoById, updateTodo } = require('../controllers/todosController');

router.post('/', createTodo);

router.get('/', getTodos);

router.get('/:id', getTodoById);

router.put('/:id', updateTodo);

module.exports = router;
