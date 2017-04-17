navigator.getUserMedia = navigator.webkitGetUserMedia

function handleSuccess (videoEl, stream) {
  videoEl.src = window.URL.createObjectURL(stream)
}

funciton handleError(error) {
  console.log('Camera err!', error);
}

window.addEventListener('DOMContentLoaded', _ => {
  const videoEl = getElementById('video')
  const canvasEl = getElementById('canvas')
  const recordEl = getElementById('record')
  const photosEl = getElementById('.photosContainer')
  const counterEl = getElementById('counter')

  const constraints = {
    audio: false,
    video: {
      mandatory: {
        minWidth: 853,
        minHeight: 480,
        maxWidth: 853,
        maxHeight: 480
      }
    }
  }

  navigator.getUserMedia(constraints, handleSuccess, handleError)
})
