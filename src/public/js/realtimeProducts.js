// Conecta al servidor WebSocket
const socket = io();

// Obtiene los elementos del DOM
const productList = document.getElementById('productList');
const productForm = document.getElementById('productForm');

// Verifica si los elementos HTML existen en el DOM antes de usarlos
if (productForm && productList) {
  // Maneja el evento de envío del formulario
  productForm.addEventListener('submit', event => {
    event.preventDefault();
    
    // Obtiene los valores de los campos del formulario
    const title = document.getElementById('title').value;
    const price = document.getElementById('price').value;

    // Verifica que los campos no estén vacíos
    if (title.trim() && price.trim()) {
      // Emite el evento 'addProduct' al servidor con los datos del producto
      socket.emit('addProduct', { title, price });
      
      // Limpia los campos del formulario después de enviar
      document.getElementById('title').value = '';
      document.getElementById('price').value = '';
    } else {
      // Muestra una alerta si los campos están vacíos
      Swal.fire({
        icon: "warning",
        title: "Alerta",
        text: "Por favor, ingrese todos los campos"
      });
    }
  });

  // Escucha el evento 'updateProductList' del servidor para actualizar la lista de productos
  socket.on('updateProductList', products => {
    // Limpia la lista actual de productos en el DOM
    productList.innerHTML = '';

    // Recorre la lista de productos y los agrega al DOM
    products.forEach(product => {
      const li = document.createElement('li');
      li.textContent = `${product.title} - ${product.price}`;
      productList.appendChild(li); // Añade cada producto como un elemento de lista
    });
  });
} else {
  // Muestra un mensaje de error en la consola si los elementos no existen
  console.error("Los elementos del formulario o la lista de productos no existen en el DOM.");
}
