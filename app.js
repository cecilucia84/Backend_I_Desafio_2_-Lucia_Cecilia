import express from 'express';
import handlebars from 'express-handlebars';
import __dirname from './src/utils/utils.js';
import { Server } from 'socket.io';
import viewRouter from './src/routes/views.router.js';
import productsRouter from './src/routes/products.router.js';
import cartsRouter from './src/routes/carts.router.js';

const app = express();
const PORT = process.env.PORT || 9090;

// Configuración para recibir objetos JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuración de Handlebars
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set("view engine", "handlebars");

// Archivos estáticos
app.use(express.static(__dirname + "/public"));

// Rutas
app.use('/', viewRouter);
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

// Iniciar el servidor HTTP
const httpServer = app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
});

// Configuración del servidor WebSocket
const socketServer = new Server(httpServer);

const messages = [];
const products = []; // Para almacenar productos en memoria

socketServer.on('connection', socket => {
    console.log('Cliente conectado');
    socketServer.emit('messageLogs', messages);
    socketServer.emit('updateProductList', products);

    socket.on("message", data => {
        messages.push(data);
        socketServer.emit('messageLogs', messages);
    });

    socket.on('userConnected', data => {
        console.log(`Usuario conectado: ${data.user}`);
        socket.broadcast.emit('userConnected', data.user);
    });

    socket.on('addProduct', product => {
        products.push(product);
        socketServer.emit('updateProductList', products);
    });

    socket.on('closeChat', data => {
        if (data.close === "close") {
            socket.disconnect();
        }
    });
});
