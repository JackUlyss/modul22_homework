const btnTimezone = document.querySelector('.btn-timezone')

async function useRequest (latitude, longitude) {
    const url = 'https://api.ipgeolocation.io/timezone?apiKey=32bcd4a6e4b548968e7afcdb682ac679&lat='+latitude+'&long='+longitude+''
    return fetch(url)
    .then(response => response.json())
    .then(data => data)
    .catch(error => console.log(error))
}

function getCoordsTimezone (outputTimezone) {
    async function success (position) {
        const { coords } = position;
        const requestResult = await useRequest(coords.latitude, coords.longitude)
        const timezone = requestResult.timezone
        const date = requestResult.date_time_txt

        outputTimezone.textContent = 'Временная зона: '+requestResult.timezone+'. Дата: '+requestResult.date_time_txt+'.'
    }

    function error () {
        outputCoords.textContent += `Информация о местоположении недоступна.`
    }

    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(success, error);
    } else {
        outputCoords.textContent = "Geolocation не поддерживается вашим браузером";
    }
}

btnTimezone.addEventListener('click', async () => {
    const outputTimezone = document.querySelector('.output-timezone')

    getCoordsTimezone(outputTimezone)
})
