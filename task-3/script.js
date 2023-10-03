const btnCoords = document.querySelector('.btn-coords')

async function getCoords(outputCoords) {
    function success (position) {
        const { coords } = position;
        outputCoords.textContent += `Широта – ${coords.latitude}, долгота – ${coords.longitude}.`
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

btnCoords.addEventListener ('click', () => {
    const outputCoords = document.querySelector('.output-coords')

    outputCoords.textContent = `
    Размеры экрана: ширина – ${window.screen.width}, длина – ${window.screen.height}. `

    getCoords(outputCoords);
})

