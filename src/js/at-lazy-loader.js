var Promise = require('es6-promise-polyfill').Promise

class LazyLoadingImages {
  constructor () {
    this.developmentMode = false

    this.images = []

    this.start = new Date().getTime()

    this.sortImages()

    this.loadImages(0)
  }

  sortImages () {
    let sortedImages = {}

    const viewportHeight = window.innerHeight

    const images = document.querySelectorAll('[data-at-lazy-loader-src]')

    for (var i = 0; i < images.length; i++) {
      const position = Math.floor(
        Math.abs(images[i].getBoundingClientRect().y / 1000)
      )

      sortedImages[position] = sortedImages[position] || []
      sortedImages[position].push(images[i])
    }

    this.images = Object.values(sortedImages)
  }

  loadImages (group) {
    if (this.images[group]) {
      let promises = []

      const groupImages = this.images[group]

      for (var i = 0; i < groupImages.length; i++) {
        promises.push(this.loadImage(groupImages[i]))
      }

      Promise.all(promises).then(() => {
        if (this.developmentMode) {
          console.log(
            'group ' + group + ' loaded ',
            (new Date().getTime() - this.start) / 1000
          )
        }

        this.loadImages(group + 1)
      })
    }
  }

  loadImage (image) {
    return new Promise((resolve, reject) => {
      image.setAttribute('src', image.getAttribute('data-at-lazy-loader-src'))

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
