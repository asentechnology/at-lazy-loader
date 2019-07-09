var Promise = require('es6-promise-polyfill').Promise

class LazyLoadingImages {
  constructor () {
    this.images = []

    this.sortImages()
  }

  sortImages () {
    let sortedImages = {}

    const viewportHeight = window.innerHeight

    const images = document.getElementsByTagName('img')
    for (var i = 0; i < images.length; i++) {
      const position = Math.floor(
        Math.abs(images[i].getBoundingClientRect().y / 1000)
      )

      sortedImages[position] = sortedImages[position] || []
      sortedImages[position].push(images[i])
    }

    this.images = Object.values(sortedImages)
  }

  // loadGroupOneImages () {
  //   let promises = []
  //   for (var i = 0; i < this.images.groupOne.length; i++) {
  //     promises.push(this.loadImage(this.images.groupOne[i]))
  //   }
  //   return Promise.all(promises)
  // }

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
