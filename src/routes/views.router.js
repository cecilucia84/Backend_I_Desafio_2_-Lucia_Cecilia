import { Router } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import handlebars from 'express-handlebars';

const router = Router();

// Configuración de Handlebars
router.engine('handlebars', handlebars.engine());
router.set('view engine', 'handlebars');
router.set('views', path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'views'));

// Ruta para la vista principal
router.get('/', (req, res) => {
    res.render('home'); // Asegúrate de tener un archivo home.handlebars en la carpeta views
});

// Ruta para realTimeProducts
router.get('/realtimeproducts', (req, res) => {
    res.render('realTimeProducts'); // Asegúrate de tener un archivo realTimeProducts.handlebars en la carpeta views
});

export default router;
