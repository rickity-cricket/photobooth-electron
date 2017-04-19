const electron = require('electron')
const countdown = require('./countdown')
const video = require('./video')
const flash = require('./flash')

const { ipcRenderer: ipc, remote} = electron
//same as calling require from the main.js, electron communicates between renderer and main process for us
const images = remote.require('./images')

let openImg = electron.remote.getGlobal('openPhoto')


function formatImgTag(doc, bytes) {
  const div = doc.createElement('div')
  div.classList.add('photo')
  const close = doc.createElement('div')
  close.classList.add('photoClose')
  const img = new Image()
  img.classList.add('photoImg')
  img.src = bytes
  div.appendChild(img)
  div.appendChild(close)
  return div
}

window.addEventListener('DOMContentLoaded', _ => {
  const videoEl = document.getElementById('video')
  const canvasEl = document.getElementById('canvas')
  const recordEl = document.getElementById('record')
  const photosEl = document.querySelector('.photosContainer')
  const counterEl = document.getElementById('counter')
  const flashEl = document.getElementById('flash')

  const ctx = canvasEl.getContext('2d')

  video.init(navigator, videoEl)

  recordEl.addEventListener('click', _ => {
    countdown.start(counterEl, 3, _ =>{
      flash(flashEl)
      const bytes = video.captureBytes(videoEl, ctx, canvasEl)
      ipc.send('image-captured', bytes)
      photosEl.appendChild(formatImgTag(document, bytes))
    })
  })

  photosEl.addEventListener('click', evt => {
    const isRm = evt.target.classList.contains('photoClose')
    const selector = isRm ? '.photoClose' : '.photoImg'

    const photos = Array.from(document.querySelectorAll(selector))
    const index = photos.findIndex(el => el == evt.target)

    if (index > -1) {
      if (isRm)
        ipc.send('image-remove', index)
      else
        openImg(images.getFromCache(index))
    }
  })
})

ipc.on('image-removed', (evt, index) => {
  document.getElementById('photos').removeChild(Array.from(document.querySelectorAll('.photo'))[index])
})
