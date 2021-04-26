let cards = ['🚗', '🚦', '🚁', '🚃', '⛵️', '⛰', '⛺️', '🏠']
let pexesoContainer
let otocene = []
let zpet = false
let n = []

const onLoadFunc = function onLoadFunction() {
  pexesoContainer = document.getElementById('pexeso-container')
  if (cards.length > 8) pexesoContainer.style.maxWidth = '800px'
  cards.push(...cards)
  cards = shuffleArray(cards)
  console.log(cards)
  addCards(cards)
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
        otocene.length <= 1 &&
        !otocene.includes(div) &&
        !n.includes(div) &&
        !zpet
      ) {
        otocene.push(div)
        div.classList.add('otoceni')
        setTimeout(() => (div.innerText = card), 250)
      }
      if (otocene.length == 2 && !zpet) {
        zpet = true
        let same
        setTimeout(() => {
          same = isSame()
          if (same) zpet = false
          else setTimeout(() => reset(), 2000)
        }, 250)
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
  zpet = false
}

function isSame() {
  if (otocene[0].innerText === otocene[1].innerText) {
    otocene.forEach((card) => {
      card.style.backgroundColor = 'green'
      n.push(card)
    })
    otocene = []
    return true
  }
  return false
}

window.onload = onLoadFunc
