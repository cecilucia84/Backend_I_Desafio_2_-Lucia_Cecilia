const socket = io();

socket.emit('mensaje', "Hola soy el cliente!!");

socket.on("msg_02", data => {
    console.log(data);
});

socket.on("broadcast", data => {
    console.log(data);
});

socket.on("msg_todos", data => {
    console.log(data);
});
