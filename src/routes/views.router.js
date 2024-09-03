import { Router } from 'express';
import ProductManager from '../services/ProductManager.js'; // Ajusta la ruta

const router = Router();
const productsManager = new ProductManager();

// Ruta para renderizar la vista de inicio
router.get('/', async (req, res) => {
    const products = await productsManager.getAllProducts();
    res.render('home', { products });
});

// Ruta para la vista de productos en tiempo real
router.get('/realtimeproducts', (req, res) => {
    res.render('realTimeProducts');
});

export default router;
