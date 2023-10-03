const btnSend = document.querySelector('.btn-send');
const btnGeo = document.querySelector('.btn-geolocation');
const wsUrl = "wss://echo-ws-service.herokuapp.com/";

let websocket = new WebSocket (wsUrl);

websocket.onopen = function(e) {
    console.log('Cоединение установлено');
};
  
websocket.onmessage = function(event) {
    writeToScreen('server', event.data);
};
  
websocket.onclose = function(event) {
    if (event.wasClean) {
      console.log(`[close] Соединение закрыто чисто, код=${event.code} причина=${event.reason}`);
    } else {
      console.log('[close] Соединение прервано');
    }
};
  
websocket.onerror = function(error) {
    alert(`[error]`);
};

function writeToScreen(sender, message) {
    const output = document.querySelector('.output-container');

    let pre = document.createElement('div');
    let p = document.createElement('p');

    pre.classList.add(sender);
    pre.classList.add('output-container__item');
    pre.appendChild(p);

    p.classList.add('message');
    p.innerHTML = message;
    
    output.appendChild(pre);
}


btnSend.addEventListener('click', () => {
    const input = document.querySelector('.input');
    const message = input.value;
    writeToScreen('sender', message);
    websocket.send(message);
    console.log('click');
})

function getCoords() {
    function success (position) {
        const { coords } = position;
        writeToScreen('sender', `<a href="https://www.openstreetmap.org/#map=13/coords.latitude/coords.longitude">Гео-локация</a>`);
    }

    function error () {
    alert('Информация о местоположении недоступна');
    }

    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(success, error);
    } else {
        alert("Geolocation не поддерживается вашим браузером");
    }
}

btnGeo.addEventListener('click', getCoords)


