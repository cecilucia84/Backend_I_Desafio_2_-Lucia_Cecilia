const socket = io(); // Conectar al servidor WebSocket

// Manejar el envío de mensajes
document.getElementById('sendMessage').addEventListener('click', () => {
  const message = document.getElementById('message').value;
  const user = 'User'; // Aquí podrías obtener el usuario actual de alguna manera

  socket.emit('message', { user, message });
});

// Manejar la recepción de mensajes
socket.on('messageLogs', (data) => {
  console.log('Messages received:', data);
  // Aquí puedes actualizar el DOM con los mensajes recibidos
});
