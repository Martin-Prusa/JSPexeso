let cards = ['🚗', '🚦', '🚁', '🚃', '⛵️', '⛰', '⛺️', '🏠']
let pexesoContainer
let otocene = []
let zpet = false

const onLoadFunc = function onLoadFunction() {
  pexesoContainer = document.getElementById('pexeso-container')
  if (cards.length > 8) pexesoContainer.style.maxWidth = '800px'
  duplicateArray(cards)
  cards = shuffleArray(cards)
  addCards(cards)
}

function duplicateArray(array) {
  const length = array.length
  for (let i = 0; i < length; i++) {
    array.push(array[i])
  }
}

function shuffleArray(array) {
  let originalArray = array
  array = []
  const length = originalArray.length

  for (let i = 0; i < length; i++) {
    const random = getRandomNumber(originalArray.length)
    array.push(originalArray[random])
    originalArray.splice(random, 1)
  }

  return array
}

function addCards(array) {
  array.forEach((card) => {
    let div = document.createElement('div')
    div.addEventListener('click', () => {
      if (
        (otocene.length == 0 || otocene.length == 1) &&
        !otocene.includes(div)
      ) {
        zpet = false
        otocene.push(div)
        div.classList.add('otoceni')
        setTimeout(() => (div.innerText = card), 250)
      }
      if (otocene.length == 2 && !zpet) {
        zpet = true
        setTimeout(() => reset(), 2000)
      }
    })
    pexesoContainer.appendChild(div)
  })
}

function getRandomNumber(max, min = 0) {
  return Math.floor(Math.random() * (max - min) + min)
}

function reset() {
  otocene.forEach((otocena) => {
    otocena.classList.remove('otoceni')
    otocena.innerText = ''
  })
  otocene = []
}

window.onload = onLoadFunc
