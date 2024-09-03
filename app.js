import express from 'express';
import productsRouter from './src/routes/products.router.js';
import cartsRouter from './src/routes/carts.router.js';
import viewRouter from './src/routes/views.router.js'; // Asegúrate de importar el enrutador de vistas

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Define los enrutadores
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/', viewRouter); // Usa el enrutador de vistas para manejar la ruta raíz

const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});

export default app;
