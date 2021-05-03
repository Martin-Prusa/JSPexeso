let cards,
  pexesoContainer,
  resetBtn,
  pexesoScreen,
  winScreen,
  interval,
  timeEl,
  n,
  time,
  zpet,
  otocene,
  timeElPlay

const onLoadFunc = function onLoadFunction() {
  cards = ['🚗', '🚦', '🚁', '🚃', '⛵️', '⛰', '⛺️', '🏠']
  n = []
  time = 0
  zpet = false
  otocene = []

  //get element
  pexesoContainer = document.getElementById('pexeso-container')
  resetBtn = document.getElementById('reset')
  pexesoScreen = document.querySelector('.p')
  winScreen = document.querySelector('.w')
  timeEl = winScreen.querySelector('h3 span')
  timeElPlay = document.querySelector('.time')

  //styles
  pexesoScreen.style.display = 'flex'
  winScreen.style.display = 'none'
  if (cards.length > 8) pexesoContainer.style.maxWidth = '800px'
  pexesoContainer.innerHTML = ''

  //generate cards
  cards.push(...cards)
  cards = shuffleArray(cards)
  console.log(cards)

  //add cards to dom
  addCards(cards)

  //other
  resetBtn.addEventListener('click', onLoadFunc)

  //time
  interval = setInterval(() => {
    time++
    timeElPlay.innerText = `${Math.floor(time / 60)}:${
      time % 60 < 10 ? '0' + (time % 60) : time % 60
    }`
  }, 1000)
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
    if (n.length === cards.length) win()
    return true
  }
  return false
}

function win() {
  clearInterval(interval)
  timeEl.innerText = `${Math.floor(time / 60)}:${
    time % 60 < 10 ? '0' + (time % 60) : time % 60
  }`
  pexesoScreen.style.display = 'none'
  winScreen.style.display = 'flex'
}

window.onload = onLoadFunc
