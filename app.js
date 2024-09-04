// Importa los módulos necesarios
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import expressHandlebars from 'express-handlebars';
import http from 'http';
import { Server } from 'socket.io';
import ProductManager from './src/services/ProductManager.js';  // Importa el ProductManager

// Obtén la ruta del archivo actual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Crea una instancia de la aplicación Express
const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Instancia del ProductManager
const productManager = new ProductManager();

// Configura Handlebars
const hbs = expressHandlebars.create();
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'src', 'views'));

// Configura middleware para servir archivos estáticos
app.use(express.static(path.join(__dirname, 'src', 'public')));

// Middleware para parsear datos JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Importa las rutas
import viewsRouter from './src/routes/views.router.js';
import productsRouter from './src/routes/products.router.js';
import cartsRouter from './src/routes/carts.router.js';

// Usa los routers
app.use('/', viewsRouter);
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

// Configura el puerto y arranca el servidor
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

// Maneja las conexiones de WebSocket
io.on('connection', (socket) => {
  console.log('Cliente conectado');

  // Emitir los productos actuales cuando un cliente se conecta
  socket.emit('updateProductList', productManager.getAllProducts());

  // Maneja el evento 'addProduct'
  socket.on('addProduct', (product) => {
    // Agregar el nuevo producto a la lista
    const newProduct = productManager.addProduct(product);
    
    // Emitir la lista actualizada de productos a todos los clientes
    io.emit('updateProductList', productManager.getAllProducts());
  });
});
