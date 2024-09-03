import { Router } from 'express';
import { io } from '../../app.js';

const router = Router();
const messages = [];

router.get('/chat', (req, res) => {
  res.render('messages'); // Renderiza la vista messages.handlebars
});

export default router;
