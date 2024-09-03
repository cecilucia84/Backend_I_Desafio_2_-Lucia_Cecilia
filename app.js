import express from 'express';
import { Server as HttpServer } from 'http';
import { Server as SocketIO } from 'socket.io';
import path from 'path';
import { fileURLToPath } from 'url';
import messagesRouter from './src/routes/messages.router.js';

// Configurar el directorio actual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Crear la aplicación Express
const app = express();
const httpServer = HttpServer(app);
const io = new SocketIO(httpServer);

// Configurar Handlebars
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'src/views'));

// Servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Configurar el enrutador para las rutas de mensajes
app.use('/api/messages', messagesRouter);

// Manejar las conexiones de WebSocket
io.on('connection', (socket) => {
  console.log('Nuevo cliente conectado');

  socket.on('userConnected', (user) => {
    console.log(`Usuario conectado: ${user}`);
    socket.broadcast.emit('userConnected', user);
  });

  socket.on('message', (data) => {
    console.log(`Mensaje recibido: ${data.message} de ${data.user}`);
    io.emit('messageLogs', [data]); // Enviar el mensaje a todos los clientes
  });

  socket.on('closeChat', () => {
    console.log('Chat cerrado');
    io.emit('chatClosed'); // Notificar a todos los clientes que el chat ha sido cerrado
  });

  socket.on('disconnect', () => {
    console.log('Cliente desconectado');
  });
});

// Iniciar el servidor
const PORT = process.env.PORT || 8080;
httpServer.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

export { io }; // Exportar io para su uso en el enrutador
