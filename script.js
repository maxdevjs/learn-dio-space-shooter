const ship = document.querySelector('.player-shooter')
const playArea = document.querySelector('#main-play-area')
const playAreaHeight = playArea.style.innerHeight
const menu = document.querySelector('.menu')
const startButton = document.querySelector('.start-button')

const aliensImg = ['./img/monster-1.png', './img/monster-2.png', './img/monster-3.png']

let gameInterval
let alienInterval

const flyShip = (event) => {
  event.preventDefault();
  if (event.key === 'ArrowUp') {
    moveUp()
  } else if (event.key === 'ArrowDown') {
    moveDown()
  } else if (event.key === ' ') {
    fireLaser()
  }
}

const moveUp = () => {
  let topPosition = getComputedStyle(ship).getPropertyValue('top')
  if (topPosition === "0px") {
    return
  } else {
    let position = parseInt(topPosition)
    position -= 50;
    ship.style.top = `${position}px`
  }
}

const moveDown = () => {
  let topPosition = getComputedStyle(ship).getPropertyValue('top')
  if (topPosition > "540px") {
    return
  } else {
    let position = parseInt(topPosition)
    position += 50;
    ship.style.top = `${position}px`
  }
}

const fireLaser = () => {
  const laser = createLaserElement()
  playArea.appendChild(laser)
  moveLaserElement(laser)
}

const createLaserElement = () => {
  const positionX = parseInt(getComputedStyle(ship).getPropertyValue('left'))
  const positionY = parseInt(getComputedStyle(ship).getPropertyValue('top'))

  const newLaser = document.createElement('img')
  newLaser.src = './img/shoot.png'
  newLaser.classList.add('laser')
  newLaser.style.left = `${positionX}px`
  newLaser.style.top = `${positionY - 25}px`
  return newLaser
}

const moveLaserElement = (laser) => {
  const laserInterval = setInterval(() => {
    const positionX = parseInt(laser.style.left)
    const aliens = document.querySelectorAll('.alien')

    aliens.forEach((alien) => {
      if (checkLaserCollision(laser, alien)) {
        alien.src = './img/explosion.png'
        alien.classList.remove('alien')
        alien.classList.add('dead-alien')
      }
    })
    // console.log(positionX);
    if (positionX === 340) {
      laser.remove()
    } else {
      laser.style.left = `${positionX + 8}px`
    }
  }, 20)
}

const createAliens = () => {
  const newAlienElement = document.createElement('img')
  const alienSprite = aliensImg[Math.floor(Math.random() * aliensImg.length)]

  newAlienElement.src = alienSprite
  newAlienElement.classList.add('alien')
  newAlienElement.classList.add('alien-transition')
  newAlienElement.style.left = '370px'
  newAlienElement.style.top = `${Math.floor(Math.random() * 330) + 30}px`

  playArea.appendChild(newAlienElement)

  moveAlien(newAlienElement)
}

const moveAlien = (alien) => {
  alienInterval = setInterval(() => {
    // const positionX = parseInt(alien.style.left)
    const positionX = parseInt(getComputedStyle(alien).getPropertyValue('left'))
    // console.log(positionX);
    if (positionX === -14) {//-134
      if (Array.from(alien.classList).includes('dead-alien')) {
        alien.remove()
      } else {
        gameOver()
      }
    } else {
      alien.style.left = `${positionX - 4}px`
    }
  }, 30)
}

const checkLaserCollision = (laser, alien) => {
  const laserTop = parseInt(laser.style.top)
  const laserLeft = parseInt(laser.style.left)
  const laserBottom = laserTop - 20

  const alienTop = parseInt(alien.style.top)
  const alienLeft = parseInt(alien.style.left)
  const alienBottom = alienTop - 30

  if (laserLeft != 340 && laserLeft + 40 >= alienLeft) {
    if (laserTop <= alienTop && laserTop >= alienBottom) {
      return true
    } else {
      return false
    }
  } else {
    return false
  }
}

const playGame = () => {
  // menu.remove()
  menu.style.display = 'none'

  gameInterval = setInterval(() => {
    createAliens()
  }, Math.floor(Math.random() * 5000)
  )
}

const gameOver = () => {
  menu.style.display = 'block'
  window.removeEventListener('keydown')
  clearInterval(gameInterval)
  clearInterval(alienInterval)
  const aliens = document.querySelectorAll('.alien')
  aliens.forEach(alien => alien.remove())
  const lasers = document.querySelectorAll('.alien')
  lasers.forEach(laser => laser.remove())
}

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // document.addEventListener('mousemove', parallax);
  document.addEventListener('keydown', flyShip);
  startButton.addEventListener('click', (event) => playGame())
});

const parallax = (e) => {
  // this.querySelectorAll('.layer').forEach(layer => {
    const speed = ship.getAttribute('data-speed');

    const x = (window.innerWidth - e.pageX * speed) / 100;
    const y = (window.innerHeight - e.pageY * speed) / 100;

    ship.style.transform = `translateX(${x}px) translateY(${y}px)`;
    //ship.style.transform = `translateX(${x}px) translateY(${y}px)`;
  // });
}