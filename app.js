import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import expressHandlebars from "express-handlebars";
import http from "http";
import { Server } from "socket.io";
import ProductManager from "./src/services/ProductManager.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const productManager = new ProductManager();

const hbs = expressHandlebars.create();
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "src", "views"));

app.use(express.static(path.join(__dirname, "src", "public")));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

import viewsRouter from "./src/routes/views.router.js";
import productsRouter from "./src/routes/products.router.js";
import cartsRouter from "./src/routes/carts.router.js";

app.use("/", viewsRouter);
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

io.on("connection", (socket) => {
  console.log("Cliente conectado");

  socket.emit("updateProductList", productManager.getAllProducts());

  socket.on("addProduct", (product) => {
    const newProduct = productManager.addProduct(product);

    io.emit("updateProductList", productManager.getAllProducts());
  });
});
