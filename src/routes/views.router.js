import { Router } from 'express';

const router = Router();

// Ruta para la vista principal (index)
router.get('/', (req, res) => {
  res.render('index');
});

// Ruta para la vista de productos en tiempo real (realtimeproducts)
router.get('/realtimeproducts', (req, res) => {
  res.render('realtimeproducts');  // Asegúrate de tener un archivo 'realtimeproducts.handlebars'
});

export default router;
