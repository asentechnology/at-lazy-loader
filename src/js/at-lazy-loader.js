var Promise = require('es6-promise-polyfill').Promise

class LazyLoadingImages {
  constructor () {
    this.images = {
      groupOne: [],
      groupTwo: [],
      groupThree: [],
      groupFour: []
    }

    this.sortImages()

    this.loadGroupOneImages().then(() => {
      this.loadGroupTwoImages().then(() => {
        this.loadGroupThreeImages().then(() => {
          this.loadGroupFourImages()
        })
      })
    })
  }

  sortImages () {
    const viewportHeight = window.innerHeight
    const images = document.getElementsByTagName('img')

    for (var i = 0; i < images.length; i++) {
      const position = images[i].getBoundingClientRect()

      switch (true) {
        case (position.bottom > 0 && position.bottom < viewportHeight) ||
          (position.top > 0 && position.top < viewportHeight):
          this.images.groupOne.push(images[i])
          break

        case (-viewportHeight < position.bottom &&
          position.bottom < viewportHeight * 2) ||
          (-viewportHeight < position.top && position.top < viewportHeight * 2):
          this.images.groupTwo.push(images[i])
          break

        case (-viewportHeight * 2 < position.bottom &&
          position.bottom < viewportHeight * 3) ||
          (-viewportHeight * 2 < position.top &&
            position.top < viewportHeight * 3):
          this.images.groupThree.push(images[i])
          break

        default:
          this.images.groupFour.push(images[i])
      }
    }
  }

  loadGroupOneImages () {
    let promises = []
    for (var i = 0; i < this.images.groupOne.length; i++) {
      promises.push(this.loadImage(this.images.groupOne[i]))
    }
    return Promise.all(promises)
  }

  loadGroupTwoImages () {
    let promises = []
    for (var i = 0; i < this.images.groupTwo.length; i++) {
      promises.push(this.loadImage(this.images.groupTwo[i]))
    }
    return Promise.all(promises)
  }

  loadGroupThreeImages () {
    let promises = []
    for (var i = 0; i < this.images.groupThree.length; i++) {
      promises.push(this.loadImage(this.images.groupThree[i]))
    }
    return Promise.all(promises)
  }

  loadGroupFourImages () {
    let promises = []
    for (var i = 0; i < this.images.groupFour.length; i++) {
      promises.push(this.loadImage(this.images.groupFour[i]))
    }
    return Promise.all(promises)
  }

  loadImage (image) {
    return new Promise((resolve, reject) => {
      image.setAttribute('src', image.getAttribute('data-at-lazy-load-src'))
      image.addEventListener('load', e => resolve(image))
    })
  }
}

window.addEventListener(
  'load',
  function () {
    new LazyLoadingImages()
  },
  false
)
