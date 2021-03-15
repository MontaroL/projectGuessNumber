const  btnAgain    = document.querySelector('.btn-again'),
       btnCheck    = document.querySelector('.btn-check')

let  highscore     = 0,
     scorePoints   = 100,
     hiddenNumber  = Math.round(Math.random() * 100)

const changeClass = function(element, property, value) {
  document.querySelector(element).classList[property](value)
}

const changeStyles = function (element, property, value) {
  document.querySelector(element).style[property] = value
}

const inputNumber = function(value) {
  document.querySelector('.input-number').value = value
}

const showImage = function (element, path) {
  document.querySelector(element).setAttribute('src', path)
}

const showMessage = function (element, message) {
  document.querySelector(element).textContent = message
}

const resetValues = function() {
  scorePoints = 100
  hiddenNumber = Math.round(Math.random() * 100)
}

const playAgain = function () {
  changeClass('body', 'remove', 'win')
  showMessage('.title', 'Guess My Number!')
  showMessage('.guessed-number', '?')
  changeStyles('.guessed-number', 'width', '15rem')
  inputNumber('')
  showImage('.reply__img', 'images/customer-review.svg')
  showMessage('.reply__message', 'Choose Your Number...')
  changeStyles('.reply__img_end', 'display', 'none')
  resetValues()
}

const checkNumber = function () {
  const guessNumber = +(document.querySelector('.input-number').value)

  if (!guessNumber) {
    showMessage('.reply__message', 'Please, choose a number!')
  }

  else if (0 > guessNumber || guessNumber > 100) {
    showImage('.reply__img', 'images/low-battery.svg')
    showMessage('.reply__message', 'Choose a number between 1 & 100!')
  }

  else if (guessNumber === hiddenNumber) {
    changeClass('html', 'add', 'win')
    changeClass('body', 'add', 'win')
    showMessage('.title', 'Congratulations!')
    showMessage('.guessed-number', hiddenNumber)
    changeStyles('.guessed-number', 'width', '25rem')
    showImage('.reply__img', 'images/winner.svg')
    showMessage('.reply__message', `Hooray! Number ${guessNumber} is correct!`)
    changeStyles('.reply__img_end', 'display', 'inline-block')

    if (scorePoints > highscore) {
      highscore = scorePoints
      showMessage('.highscore__number', `${highscore}`)
    }
  }

  else if (guessNumber !== hiddenNumber) {
    if (scorePoints > 1) {
      guessNumber > hiddenNumber ? showImage('.reply__img', 'images/full.svg')
          : showImage('.reply__img', 'images/low.svg')
      showMessage('.reply__message', guessNumber > hiddenNumber ?
          'Wow, your number is too high!' : 'Eh, your number is too low!')
      scorePoints--
      showMessage('.score__number', `${scorePoints}`)
    } else {
      showImage('.reply__img', 'images/lose.svg')
      showMessage('.reply__message', 'You lost, loser!')
      showMessage('.score__number', '0')
    }
  }
}

btnCheck.addEventListener('click', checkNumber)
btnAgain.addEventListener('click', playAgain)
