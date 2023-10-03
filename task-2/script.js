const btnSvg = document.querySelector('.btn-svg')

btnSvg.addEventListener('click', () => {
    const svg = document.querySelector('.svg')
    const svgFill = document.querySelector('.svg-fill')
    svg.classList.toggle('visible')
    svgFill.classList.toggle('visible')
})