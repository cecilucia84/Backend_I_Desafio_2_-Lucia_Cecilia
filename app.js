// Importa los módulos necesarios
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import expressHandlebars from 'express-handlebars';
import http from 'http';
import { Server } from 'socket.io';

// Obtén la ruta del archivo actual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Crea una instancia de la aplicación Express
const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Configura Handlebars
const hbs = expressHandlebars.create();
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'src', 'views'));

// Configura middleware para servir archivos estáticos
app.use(express.static(path.join(__dirname, 'src', 'public')));

// Importa las rutas
import viewsRouter from './src/routes/views.router.js';

// Usa el router de vistas
app.use('/', viewsRouter);

// Configura el puerto y arranca el servidor
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

// Maneja las conexiones de WebSocket
io.on('connection', (socket) => {
  console.log('Cliente conectado');

  // Lógica para manejar eventos de WebSocket aquí
  socket.on('nuevoProducto', (producto) => {
    io.emit('productoActualizado', producto);
  });
});
