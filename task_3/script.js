const websocket = new WebSocket("wss://echo-ws-service.herokuapp.com");

const messageInput = document.getElementById("message-input");
const sendButton = document.getElementById("send-button");
const geoButton = document.getElementById("geo-button");
const messages = document.getElementById("messages");
const status = document.getElementById("status");

const ignoredEchoMessages = new Set();

function addMessage(text, type) {
    const message = document.createElement("div");

    message.classList.add("chat__message", `chat__message--${type}`);
    message.textContent = text;

    messages.appendChild(message);
    messages.scrollTop = messages.scrollHeight;
}

function addGeoLink(url) {
    const message = document.createElement("div");
    const link = document.createElement("a");

    message.classList.add("chat__message", "chat__message--geo");

    link.href = url;
    link.target = "_blank";
    link.textContent = "Геолокация";

    message.appendChild(link);
    messages.appendChild(message);
    messages.scrollTop = messages.scrollHeight;
}

websocket.addEventListener("open", () => {
    status.textContent = "Соединение установлено";
});

websocket.addEventListener("message", (event) => {
    if (ignoredEchoMessages.has(event.data)) {
        ignoredEchoMessages.delete(event.data);
        return;
    }

    addMessage(event.data, "server");
});

websocket.addEventListener("close", () => {
    status.textContent = "Соединение закрыто";
});

websocket.addEventListener("error", () => {
    status.textContent = "Ошибка WebSocket-соединения";
});

sendButton.addEventListener("click", () => {
    const message = messageInput.value.trim();

    if (!message) {
        return;
    }

    if (websocket.readyState !== WebSocket.OPEN) {
        status.textContent = "Соединение с сервером ещё не установлено";
        return;
    }

    addMessage(message, "client");
    websocket.send(message);

    messageInput.value = "";
});

messageInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        sendButton.click();
    }
});

geoButton.addEventListener("click", () => {
    if (!("geolocation" in navigator)) {
        addMessage("Геолокация не поддерживается вашим браузером", "server");
        return;
    }

    navigator.geolocation.getCurrentPosition(
        (position) => {
            const { latitude, longitude } = position.coords;

            const mapUrl =
                `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;

            addGeoLink(mapUrl);

            if (websocket.readyState === WebSocket.OPEN) {
                ignoredEchoMessages.add(mapUrl);
                websocket.send(mapUrl);
            }
        },
        () => {
            addMessage("Не удалось получить геолокацию", "server");
        }
    );
});
