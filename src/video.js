const constraints = {
  audio: false,
  video: {
    mandatory: {
      minWidth: 100,
      minHeight: 100,
      maxWidth: 853,
      maxHeight: 480
    }
  }
}

function handleSuccess (videoEl, stream) {
  videoEl.srcObject = stream
}

function handleError(error) {
  console.log('Camera err!', error);
}

exports.init = (nav, videoEl) => {
  nav.getUserMedia = nav.webkitGetUserMedia
  nav.getUserMedia(constraints, stream => handleSuccess(videoEl, stream), handleError)
}

exports.captureBytes = (videoEl, ctx, canvasEl) => {
  ctx.drawImage(videoEl, 0, 0)
  return canvasEl.toDataURL('image/png')
}

exports.captureBytesFromLiveCanvas = canvas => {
  return canvas.toDataURL('image/png')
}
