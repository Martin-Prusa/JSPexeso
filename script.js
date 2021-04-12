let cards = ['🚗', '🚦', '🚁', '🚃', '⛵️', '⛰', '⛺️', '🏠']
let pexesoContainer

const onLoadFunc = function onLoadFunction() {
  pexesoContainer = document.getElementById('pexeso-container')
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
    div.innerText = card
    pexesoContainer.appendChild(div)
  })
}

function getRandomNumber(max, min = 0) {
  return Math.floor(Math.random() * (max - min) + min)
}

window.onload = onLoadFunc
