const socket = io();
let user;
const chatBox = document.getElementById('chatBox');

Swal.fire({
    icon: "info",
    title: "Identificate, por favor",
    input: "text",
    text: "Ingrese userName para identificarse en el Chat!!",
    color: "#716add",
    inputValidator: (value) => {
        if (!value) {
            return "Necesitas ingresar tu username para continuar!";
        } else {
            socket.emit('userConnected', { user: value });
        }
    },
    allowOutsideClick: false
}).then(result => {
    user = result.value;
    const myName = document.getElementById("myName");
    myName.innerHTML = user;
});

chatBox.addEventListener('keyup', evt => {
    if (evt.key === "Enter") {
        if (chatBox.value.trim().length > 0) {
            socket.emit('message', { user: user, message: chatBox.value });
            chatBox.value = '';
        } else {
            Swal.fire({
                icon: "warning",
                title: "Alert",
                text: "Por favor ingrese mensaje"
            });
        }
    }
});

socket.on('messageLogs', data => {
    const messageLogs = document.getElementById('messageLogs');
    let logs = '';
    data.forEach(log => {
        logs += `<b>${log.user}</b> dice: ${log.message}<br/>`;
    });
    messageLogs.innerHTML = logs;
});

socket.on('userConnected', data => {
    let message = `Nuevo usuario conectado ${data}`;
    Swal.fire({
        position: "top-end",
        title: "Nuevo usuario entra al chat!!",
        text: message,
        toast: true,
        color: '#716add',
        showConfirmButton: false,
        timer: 1500
    });
});

const closeChatBox = document.getElementById('closeChatBox');
closeChatBox.addEventListener('click', evt => {
    alert("Gracias por usar este chat, Adios!!");
    socket.emit('closeChat', { close: 'close' });
    messageLogs.innerHTML = '';
});
