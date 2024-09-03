import { Router } from 'express';
import ProductManager from '../services/ProductManager.js';
import { io } from '../../app.js'; // Importa io para emitir eventos

const router = Router();
const productsManager = new ProductManager();

// Ruta para agregar un producto
router.post('/', async (req, res) => {
    try {
        const product = req.body;
        const newProduct = await productsManager.addProduct(product);
        io.emit('updateProducts', await productsManager.getAllProducts()); // Emitir evento
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ error: 'Error al agregar el producto' });
    }
});

// Ruta para eliminar un producto
router.delete('/:pid', async (req, res) => {
    try {
        const productId = parseInt(req.params.pid);
        const deletedProduct = await productsManager.deleteProduct(productId);
        io.emit('updateProducts', await productsManager.getAllProducts()); // Emitir evento
        res.json(deletedProduct);
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el producto' });
    }
});

export default router;
