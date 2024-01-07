const express = require('express');

const NotFound = require('../errors/notFound');
const {
  validateTask, validateId,
} = require('../middlewares/errorValidator');
const {
  getToDoes, createTask, delTaskById, updateTaskById,
} = require('../controllers/todos');


const router = express.Router();

router.get('/', getToDoes);
router.post('/task', validateTask, createTask);
router.delete('/task/:taskId', validateId, delTaskById);
router.patch('/task/:taskId', validateId, validateTask, updateTaskById);

router.all('*', (req, res, next) => {
  next(new NotFound('Страница не найдена'));
});

module.exports = router;
